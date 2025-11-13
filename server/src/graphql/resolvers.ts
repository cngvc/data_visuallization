import Auth, { IAuth, UserRoleEnum } from '@/entities/auth.entity';
import Court, { ICourt } from '@/entities/court.entity';
import EventCategory, { IEventCategory } from '@/entities/event-category.entity';
import EventRegistration, { IEventRegistration } from '@/entities/event-registration.entity';
import Event, { IEvent } from '@/entities/event.entity';
import Family, { IFamily } from '@/entities/family.entity';
import ImportHistory, { IImportHistory } from '@/entities/import-history.entity';
import Member, { IMember } from '@/entities/member.entity';
import MembershipType, { IMembershipType } from '@/entities/membership-type.entity';
import { IOrganization, default as Organization, default as OrganizationModel } from '@/entities/organization.entity';
import PlayerReport, { IPlayerReport } from '@/entities/player-report.entity';
import ReservationPlayer, { IReservationPlayer } from '@/entities/reservation-player.entity';
import ReservationType, { IReservationType } from '@/entities/reservation-type.entity';
import Reservation, { IReservation } from '@/entities/reservation.entity';
import RevenueRecognition, { IRevenueRecognition } from '@/entities/revenue-recognition.entity';
import SalesSummary, { ISalesSummary } from '@/entities/sales-summary.entity';
import Transaction, { ITransaction } from '@/entities/transaction.entity';
import UserOrganization from '@/entities/user-organization.entity';
import { BadRequestError, NotFoundError } from '@/interfaces/responses/error-handler';
import { authService } from '@/services/auth.service';
import { emailService } from '@/services/email.service';
import { keyTokenService } from '@/services/key-token.service';
import { passwordResetService } from '@/services/password-reset.service';
import { roleInOrganization, withAuth } from '@/utils/resolver-guards';
import * as argon2 from 'argon2';
import { format, isValid, parseISO } from 'date-fns';
import { GraphQLScalarType, Kind } from 'graphql';
import mongoose, { RootFilterQuery } from 'mongoose';

interface IBaseFilter {
  search?: string;
  start_date?: string;
  end_date?: string;
}

interface IChartFilter {
  start_date?: string;
  end_date?: string;
  type: 'date' | 'month' | 'year';
  status: 'Active' | 'Cancelled';
}

interface IChartResponse {
  labels: string[];
  datasets: number[];
  title: string;
}

export const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type using date-fns',
    serialize(value) {
      try {
        return isValid(value) ? format(Number(value), 'yyyy-MM-dd HH:mm:ss') : null;
      } catch (error) {
        return null;
      }
    },
    parseValue(value) {
      if (typeof value === 'string') {
        const date = parseISO(value);
        return isValid(date) ? date : null;
      }
      if (typeof value === 'number') {
        const date = new Date(value);
        return isValid(date) ? date : null;
      }
      return null;
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        const date = parseISO(ast.value);
        return isValid(date) ? date : null;
      }
      if (ast.kind === Kind.INT) {
        const date = new Date(parseInt(ast.value, 10));
        return isValid(date) ? date : null;
      }
      return null;
    }
  }),
  JSON: new GraphQLScalarType({
    name: 'JSON',
    description: 'JSON scalar type',
    serialize(value) {
      return value;
    },
    parseValue(value) {
      return value;
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        try {
          return JSON.parse(ast.value);
        } catch (e) {
          return null;
        }
      }
      return null;
    }
  }),
  Query: {
    me_organizations: withAuth(async (_: any, __: any, context: { user: IAuth }) => {
      const data = await UserOrganization.find({ user_id: context.user._id })
        .sort({ updated_at: -1 })
        .populate(['user_id', 'organization_id']);
      return {
        data
      };
    }),

    me: withAuth(async (_: any, __: any, context: { user: IAuth }) => {
      if (!context.user) {
        throw new BadRequestError('User not authenticated');
      }
      const user = await authService.getUserById(context.user._id as mongoose.Types.ObjectId);
      if (!user) {
        throw new NotFoundError('User not found');
      }
      let role_in_current_organization = null;
      if (user.current_organization_id?._id) {
        const userOrganization = await UserOrganization.findOne({ user_id: user._id, organization_id: user.current_organization_id._id });
        role_in_current_organization = userOrganization?.role;
      }
      return {
        data: {
          _id: user._id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          current_organization_id: user.current_organization_id,
          role_in_current_organization
        }
      };
    }),
    families: withAuth(
      async (_: any, args: { page?: number; limit?: number; filters?: Partial<IFamily & IBaseFilter> }, context: { user: IAuth }) => {
        if (!context.user?.current_organization_id?._id) {
          throw new BadRequestError('User not authenticated or organization not found');
        }
        const page = args.page || 1;
        let limit = args.limit || 10;
        const skip = (page - 1) * limit;
        const total = await Family.countDocuments();
        const filter: RootFilterQuery<IFamily> = { organization_id: context.user.current_organization_id };
        const searchRegex = { $regex: args.filters?.search, $options: 'i' };
        if (args.filters?.search) {
          filter.$or = [{ name: searchRegex }, { number: searchRegex }];
        }
        const query = Family.find(filter).sort({ updated_at: -1, created_at: -1 });
        if (args.limit !== -1) {
          query.skip(skip).limit(limit);
        } else {
          limit = total;
        }
        const data = await query;
        return {
          data,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        };
      }
    ),

    members: withAuth(
      async (
        _: any,
        args: {
          page?: number;
          limit?: number;
          filters?: Partial<IMember & IBaseFilter> & {
            membership_status?: string[];
            state?: string[];
            membership_date_range?: { start?: string; end?: string };
          };
        },
        context: { user: IAuth }
      ) => {
        if (!context.user?.current_organization_id?._id) {
          throw new BadRequestError('User not authenticated or organization not found');
        }

        const page = args.page || 1;
        let limit = args.limit || 10;
        const skip = (page - 1) * limit;
        const filters = args.filters || {};

        const filter: RootFilterQuery<IMember> = { organization_id: context.user.current_organization_id._id };

        if (filters.membership_status && filters.membership_status.length > 0) {
          filter.membership_status = { $in: filters.membership_status };
        }
        if (filters.membership_type_id) {
          filter.membership_type_id = filters.membership_type_id;
        }
        if (filters.membership_date_range) {
          const dateFilter: any = {};
          if (filters.membership_date_range.start) {
            dateFilter.$gte = new Date(filters.membership_date_range.start);
          }
          if (filters.membership_date_range.end) {
            dateFilter.$lte = new Date(filters.membership_date_range.end);
          }
          if (Object.keys(dateFilter).length > 0) {
            filter.membership_start_date = dateFilter;
          }
        }

        if (filters.search) {
          const searchRegex = { $regex: filters.search, $options: 'i' };
          filter.$or = [
            { first_name: searchRegex },
            { last_name: searchRegex },
            { email: searchRegex },
            { phone: searchRegex },
            { address: searchRegex },
            { city: searchRegex },
            { state: searchRegex },
            { zip_code: searchRegex }
          ];
        }

        const total = await Member.countDocuments(filter);
        const query = Member.find(filter).sort({ updated_at: -1, created_at: -1 });
        if (args.limit !== -1) {
          query.skip(skip).limit(limit);
        } else {
          limit = total;
        }
        const data = await query.populate(['family_id', 'membership_type_id']);
        return {
          data,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        };
      }
    ),

    events: withAuth(
      async (_: any, args: { page?: number; limit?: number; filters?: Partial<IEvent & IBaseFilter> }, context: { user: IAuth }) => {
        if (!context.user?.current_organization_id?._id) {
          throw new BadRequestError('User not authenticated or organization not found');
        }
        const page = args.page || 1;
        const limit = args.limit || 10;
        const skip = (page - 1) * limit;
        const filters = args.filters || {};
        const filter: RootFilterQuery<IEvent> = { organization_id: context.user.current_organization_id };
        if (filters.category_id) {
          filter.category_id = filters.category_id;
        }
        if (filters.search) {
          filter.$or = [
            { name: { $regex: filters.search, $options: 'i' } },
            { description: { $regex: filters.search, $options: 'i' } },
            { location: { $regex: filters.search, $options: 'i' } }
          ];
        } else if (filters.name) {
          filter.name = { $regex: filters.name, $options: 'i' };
        }

        if (filters.start_date && filters.end_date) {
          filter.start_date = {
            $gte: new Date(filters.start_date),
            $lte: new Date(filters.end_date)
          };
        } else if (filters.start_date) {
          filter.start_date = { $gte: new Date(filters.start_date) };
        } else if (filters.end_date) {
          filter.start_date = { $lte: new Date(filters.end_date) };
        }
        if (filters.is_registered !== undefined) {
          filter.is_registered = filters.is_registered;
        }
        const total = await Event.countDocuments(filter);
        const data = await Event.find(filter)
          .sort({ updated_at: -1, created_at: -1 })
          .skip(skip)
          .limit(limit)
          .populate(['category_id', 'reservation_id.court_id', 'reservation_id.reservation_type_id']);
        return {
          data,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        };
      }
    ),

    reservations: withAuth(
      async (
        _: any,
        args: {
          page?: number;
          limit?: number;
          filters?: Partial<IReservation & IBaseFilter> & { member_id?: string; is_lesson?: boolean };
        },
        context: { user: IAuth }
      ) => {
        if (!context.user?.current_organization_id) {
          throw new BadRequestError('User not authenticated or organization not found');
        }
        const page = args.page || 1;
        const limit = args.limit || 10;
        const skip = (page - 1) * limit;
        const filters = args.filters || {};
        const filter: RootFilterQuery<IReservation> = { organization_id: context.user.current_organization_id };

        if (filters.search) {
          const memberIds = await Member.find({
            $or: [{ first_name: { $regex: filters.search, $options: 'i' } }, { last_name: { $regex: filters.search, $options: 'i' } }]
          }).distinct('_id');

          const playerIds = await ReservationPlayer.find({
            member_id: { $in: memberIds }
          }).distinct('_id');

          filter.$or = [{ player_ids: { $in: playerIds } }, { instructors: { $regex: filters.search, $options: 'i' } }];
        }

        if (filters.member_id) {
          const playerIds = await ReservationPlayer.find({
            member_id: filters.member_id
          }).distinct('_id');

          filter.player_ids = { $in: playerIds };
        }

        if (filters.court_ids && filters.court_ids.length > 0) {
          filter.court_ids = { $in: filters.court_ids };
        }

        if (filters.reservation_type_id) {
          filter.reservation_type_id = filters.reservation_type_id;
        }

        if (filters.status) {
          filter.status = filters.status;
        }

        if (filters.is_lesson !== undefined) {
          filter.is_lesson = filters.is_lesson;
        }

        if (filters.start_date && filters.end_date) {
          filter.start_time = {
            $gte: new Date(filters.start_date),
            $lte: new Date(filters.end_date)
          };
        } else if (filters.start_date) {
          filter.start_time = { $gte: new Date(filters.start_date) };
        } else if (filters.end_date) {
          filter.end_time = { $lte: new Date(filters.end_date) };
        }

        const total = await Reservation.countDocuments(filter);
        const data = await Reservation.find(filter)
          .sort({ updated_at: -1, created_at: -1 })
          .skip(skip)
          .limit(limit)
          .populate([
            'court_ids',
            'reservation_type_id',
            {
              path: 'player_ids',
              populate: [
                {
                  path: 'member_id'
                }
              ]
            }
          ]);
        return {
          data,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        };
      }
    ),

    import_history: withAuth(
      async (
        _: any,
        args: { page?: number; limit?: number; filters?: Partial<IImportHistory & IBaseFilter> },
        context: { user: IAuth }
      ) => {
        if (!context.user?.current_organization_id) {
          throw new BadRequestError('User not authenticated or organization not found');
        }
        const page = args.page || 1;
        const limit = args.limit || 10;
        const skip = (page - 1) * limit;
        const filters = args.filters || {};
        const filter: RootFilterQuery<IImportHistory> = { organization_id: context.user.current_organization_id };
        if (filters.status) {
          filter.status = filters.status;
        }
        if (filters.collection_name) {
          filter.collection_name = filters.collection_name;
        }
        const total = await ImportHistory.countDocuments(filter);
        const data = await ImportHistory.find(filter).sort({ updated_at: -1, created_at: -1 }).skip(skip).limit(limit);
        return {
          data,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        };
      }
    ),

    transactions: withAuth(
      async (
        _: any,
        args: {
          page?: number;
          limit?: number;
          filters?: Partial<ITransaction & IBaseFilter>;
        },
        context: { user: IAuth }
      ) => {
        if (!context.user?.current_organization_id) {
          throw new BadRequestError('User not authenticated or organization not found');
        }
        const page = args.page || 1;
        const limit = args.limit || 10;
        const skip = (page - 1) * limit;
        const filters = args.filters || {};

        const filter: RootFilterQuery<ITransaction> = { organization_id: context.user.current_organization_id };

        if (filters.search) {
          filter.$or = [
            { category: { $regex: filters.search, $options: 'i' } },
            { payment_type: { $regex: filters.search, $options: 'i' } },
            { transaction_type: { $regex: filters.search, $options: 'i' } },
            { notes: { $regex: filters.search, $options: 'i' } }
          ];
        }

        if (filters.start_date && filters.end_date) {
          filter.transaction_date = {
            $gte: new Date(filters.start_date),
            $lte: new Date(filters.end_date)
          };
        } else if (filters.start_date) {
          filter.transaction_date = { $gte: new Date(filters.start_date) };
        } else if (filters.end_date) {
          filter.transaction_date = { $lte: new Date(filters.end_date) };
        }

        const total = await Transaction.countDocuments(filter);
        const data = await Transaction.find(filter)
          .sort({ updated_at: -1, created_at: -1 })
          .skip(skip)
          .limit(limit)
          .populate(['member_id']);

        return {
          data,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        };
      }
    ),

    sales_summary: withAuth(
      async (_: any, args: { page?: number; limit?: number; filters?: Partial<ISalesSummary & IBaseFilter> }, context: { user: IAuth }) => {
        if (!context.user?.current_organization_id) {
          throw new BadRequestError('User not authenticated or organization not found');
        }
        const page = args.page || 1;
        const limit = args.limit || 10;
        const skip = (page - 1) * limit;
        const filters = args.filters || {};

        const filter: RootFilterQuery<ISalesSummary> = { organization_id: context.user.current_organization_id };

        if (filters.start_date && filters.end_date) {
          filter.transaction_date = {
            $gte: new Date(filters.start_date),
            $lte: new Date(filters.end_date)
          };
        } else if (filters.start_date) {
          filter.transaction_date = { $gte: new Date(filters.start_date) };
        } else if (filters.end_date) {
          filter.transaction_date = { $lte: new Date(filters.end_date) };
        }
        if (filters.search) {
          filter.$or = [
            { fee_category_name: { $regex: filters.search, $options: 'i' } },
            { item_name: { $regex: filters.search, $options: 'i' } },
            { revenue_category_name: { $regex: filters.search, $options: 'i' } }
          ];
        }
        const total = await SalesSummary.countDocuments(filter);
        const data = await SalesSummary.find(filter)
          .sort({ updated_at: -1, created_at: -1 })
          .skip(skip)
          .limit(limit)
          .populate(['member_id', 'family_id']);

        return {
          data,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        };
      }
    ),

    reservation_types: withAuth(
      async (
        _: any,
        args: { page?: number; limit?: number; filters?: Partial<IReservationType & IBaseFilter> },
        context: { user: IAuth }
      ) => {
        if (!context.user?.current_organization_id) {
          throw new BadRequestError('User not authenticated or organization not found');
        }
        const page = args.page || 1;
        let limit = args.limit || 10;
        const skip = (page - 1) * limit;
        const filters = args.filters || {};
        const filter: RootFilterQuery<IReservationType> = { organization_id: context.user.current_organization_id };
        if (filters.search) {
          const searchRegex = { $regex: filters.search, $options: 'i' };
          filter.$or = [{ name: searchRegex }, { background_color: searchRegex }, { text_color: searchRegex }];
        }
        const total = await ReservationType.countDocuments(filter);
        const query = ReservationType.find(filter).sort({ order_index: 1, updated_at: -1 });
        if (args.limit !== -1) {
          query.skip(skip).limit(limit);
        } else {
          limit = total;
        }
        const data = await query;
        return {
          data,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        };
      }
    ),

    event_categories: withAuth(
      async (
        _: any,
        args: { page?: number; limit?: number; filters?: Partial<IEventCategory & IBaseFilter> },
        context: { user: IAuth }
      ) => {
        if (!context.user?.current_organization_id) {
          throw new BadRequestError('User not authenticated or organization not found');
        }
        const page = args.page || 1;
        let limit = args.limit || 10;
        const skip = (page - 1) * limit;
        const filters = args.filters || {};
        const filter: RootFilterQuery<IEventCategory> = { organization_id: context.user.current_organization_id };
        if (filters.search) {
          const searchRegex = new RegExp(filters.search, 'i');
          filter.$or = [{ name: searchRegex }, { background_color: searchRegex }, { text_color: searchRegex }];
        }
        if (filters.is_public !== undefined) {
          filter.is_public = filters.is_public;
        }
        const total = await EventCategory.countDocuments(filter);
        const query = EventCategory.find(filter).sort({ updated_at: -1, created_at: -1 });
        if (args.limit !== -1) {
          query.skip(skip).limit(limit);
        } else {
          limit = total;
        }
        const data = await query;
        return {
          data,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        };
      }
    ),

    courts: withAuth(
      async (_: any, args: { page?: number; limit?: number; filters?: Partial<ICourt & IBaseFilter> }, context: { user: IAuth }) => {
        if (!context.user?.current_organization_id) {
          throw new BadRequestError('User not authenticated or organization not found');
        }
        const page = args.page || 1;
        let limit = args.limit || 10;
        const skip = (page - 1) * limit;
        const filters = args.filters || {};

        const total = await Court.countDocuments();
        const filter: RootFilterQuery<ICourt> = { organization_id: context.user.current_organization_id };
        if (filters.search) {
          const searchRegex = new RegExp(filters.search, 'i');
          filter.$or = [{ label: searchRegex }, { type_name: searchRegex }];
        }
        const query = Court.find(filter).sort({ order_index: 1 });
        if (args.limit !== -1) {
          query.skip(skip).limit(limit);
        } else {
          limit = total;
        }
        const data = await query;
        return {
          data,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        };
      }
    ),

    membership_types: withAuth(
      async (
        _: any,
        args: { page?: number; limit?: number; filters?: Partial<IMembershipType & IBaseFilter> },
        context: { user: IAuth }
      ) => {
        if (!context.user?.current_organization_id) {
          throw new BadRequestError('User not authenticated or organization not found');
        }
        const page = args.page || 1;
        let limit = args.limit || 10;
        const skip = (page - 1) * limit;
        const total = await MembershipType.countDocuments();

        const filters = args.filters || {};
        const filter: RootFilterQuery<IMembershipType> = { organization_id: context.user.current_organization_id };
        if (filters.search) {
          const searchRegex = new RegExp(filters.search, 'i');
          filter.$or = [{ name: searchRegex }, { short_code: searchRegex }];
        }
        const query = MembershipType.find(filter).sort({ order_index: 1, updated_at: -1 });
        if (args.limit !== -1) {
          query.skip(skip).limit(limit);
        } else {
          limit = total;
        }
        const data = await query;
        return {
          data,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        };
      }
    ),

    player_reports: withAuth(
      async (
        _: any,
        args: {
          page?: number;
          limit?: number;
          filters?: Partial<IPlayerReport & IBaseFilter>;
        },
        context: { user: IAuth }
      ) => {
        if (!context.user?.current_organization_id) {
          throw new BadRequestError('User not authenticated or organization not found');
        }
        const page = args.page || 1;
        const limit = args.limit || 10;
        const skip = (page - 1) * limit;
        const filter: RootFilterQuery<IPlayerReport> = { organization_id: context.user.current_organization_id };
        if (args.filters) {
          if (args.filters.search) {
            const memberIds = await Member.find({
              $or: [
                { first_name: { $regex: args.filters.search, $options: 'i' } },
                { last_name: { $regex: args.filters.search, $options: 'i' } }
              ]
            }).distinct('_id');
            filter.member_id = { $in: memberIds };
          }

          if (args.filters.member_id) {
            filter.member_id = args.filters.member_id;
          }

          if (args.filters.booking_type) {
            filter.booking_type = args.filters.booking_type;
          }

          if (args.filters.is_approved !== undefined) {
            filter.is_approved = args.filters.is_approved;
          }

          if (args.filters.court_ids) {
            filter.court_ids = { $in: args.filters.court_ids };
          }

          if (args.filters.start_date || args.filters.end_date) {
            filter.$and = [];

            if (args.filters.start_date) {
              filter.$and.push({
                start_date_time: { $gte: new Date(args.filters.start_date) }
              });
            }

            if (args.filters.end_date) {
              filter.$and.push({
                end_date_time: { $lte: new Date(args.filters.end_date) }
              });
            }
          }
        }
        const total = await PlayerReport.countDocuments(filter);
        const data = await PlayerReport.find(filter)
          .sort({ updated_at: -1, created_at: -1 })
          .skip(skip)
          .limit(limit)
          .populate(['member_id', 'reservation_id', 'court_ids']);

        return {
          data,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        };
      }
    ),

    revenue_recognition: withAuth(
      async (
        _: any,
        args: { page?: number; limit?: number; filters?: Partial<IRevenueRecognition & IBaseFilter> },
        context: { user: IAuth }
      ) => {
        if (!context.user?.current_organization_id) {
          throw new BadRequestError('User not authenticated or organization not found');
        }
        const page = args.page || 1;
        const limit = args.limit || 10;
        const skip = (page - 1) * limit;
        const filters = args.filters || {};
        const filter: RootFilterQuery<IRevenueRecognition> = { organization_id: context.user.current_organization_id };

        if (filters.search) {
          const searchRegex = new RegExp(filters.search, 'i');
          filter.$or = [
            { description: searchRegex },
            { payment_type: searchRegex },
            { transaction_type: searchRegex },
            { notes: searchRegex }
          ];
        }

        if (filters.payment_type) {
          filter.payment_type = filters.payment_type;
        }
        if (filters.transaction_type) {
          filter.transaction_type = filters.transaction_type;
        }
        if (filters.start_date && filters.end_date) {
          filter.start_date_time = {
            $gte: new Date(filters.start_date),
            $lte: new Date(filters.end_date)
          };
        } else if (filters.start_date) {
          filter.start_date_time = { $gte: new Date(filters.start_date) };
        } else if (filters.end_date) {
          filter.start_date_time = { $lte: new Date(filters.end_date) };
        }
        const total = await RevenueRecognition.countDocuments(filter);
        const data = await RevenueRecognition.find(filter)
          .sort({ updated_at: -1, created_at: -1 })
          .skip(skip)
          .limit(limit)
          .populate(['member_id', 'fee_id', 'payment_id']);

        return {
          data,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        };
      }
    ),

    reservation_players: withAuth(
      async (
        _: any,
        args: {
          page?: number;
          limit?: number;
          filters?: Partial<IReservationPlayer & IBaseFilter>;
        },
        context: { user: IAuth }
      ) => {
        if (!context.user?.current_organization_id) {
          throw new BadRequestError('User not authenticated or organization not found');
        }
        const page = args.page || 1;
        const limit = args.limit || 10;
        const skip = (page - 1) * limit;
        const filters = args.filters || {};
        const filter: RootFilterQuery<IReservationPlayer> = { organization_id: context.user.current_organization_id };
        const total = await ReservationPlayer.countDocuments(filter);
        const data = await ReservationPlayer.find(filter)
          .sort({ updated_at: -1, created_at: -1 })
          .skip(skip)
          .limit(limit)
          .populate(['reservation_id', 'player_id']);
        return {
          data,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        };
      }
    ),

    event_registrations: withAuth(
      async (
        _: any,
        args: {
          page?: number;
          limit?: number;
          filters?: Partial<IEventRegistration & IBaseFilter & { status?: string }>;
        },
        context: { user: IAuth }
      ) => {
        if (!context.user?.current_organization_id) {
          throw new BadRequestError('User not authenticated or organization not found');
        }
        const page = args.page || 1;
        const limit = args.limit || 10;
        const skip = (page - 1) * limit;
        const filters = args.filters || {};

        const filter: RootFilterQuery<IEventRegistration> = { organization_id: context.user.current_organization_id };

        if (filters.search) {
          const search = { $regex: filters.search, $options: 'i' };
          const memberIds = await Member.find({
            $or: [{ first_name: search }, { last_name: search }, { email: search }]
          }).distinct('_id');

          const eventIds = await Event.find({
            $or: [{ name: search }, { description: search }, { location: search }]
          }).distinct('_id');

          filter.$or = [{ member_id: { $in: memberIds } }, { event_id: { $in: eventIds } }];
        }
        if (filters.status) {
          if (filters.status === 'Active') {
            filter.cancelled_on_utc = null;
          } else if (filters.status === 'Cancelled') {
            filter.cancelled_on_utc = { $ne: null };
          }
        }
        if (filters.start_date && filters.end_date) {
          filter.created_at = {
            $gte: new Date(filters.start_date),
            $lte: new Date(filters.end_date)
          };
        } else if (filters.start_date) {
          filter.created_at = { $gte: new Date(filters.start_date) };
        } else if (filters.end_date) {
          filter.created_at = { $lte: new Date(filters.end_date) };
        }

        const total = await EventRegistration.countDocuments(filter);
        const data = await EventRegistration.find(filter)
          .sort({ updated_at: -1, created_at: -1 })
          .skip(skip)
          .limit(limit)
          .populate(['member_id', 'event_id', 'event_category_id']);
        return {
          data,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        };
      }
    ),

    organization: withAuth(async (_: any, args: { organization_id: string }, context: { user: IAuth }) => {
      if (!context.user?.current_organization_id) {
        throw new BadRequestError('User not authenticated or organization not found');
      }
      await roleInOrganization(context.user._id as mongoose.Types.ObjectId, new mongoose.Types.ObjectId(args.organization_id));
      const organization = await Organization.findById(new mongoose.Types.ObjectId(args.organization_id));
      const userOrganizations = await UserOrganization.find({
        organization_id: new mongoose.Types.ObjectId(args.organization_id)
      }).populate(['user_id', 'organization_id']);
      return {
        data: {
          organization,
          userOrganizations
        }
      };
    })
  },
  Mutation: {
    create_event: withAuth(async (_: any, { input }: { input: Partial<IEvent> }, context: { user: IAuth }) => {
      if (!context.user?.current_organization_id) {
        throw new BadRequestError('User not authenticated or organization not found');
      }
      if (input.start_date) {
        input.start_date = new Date(input.start_date);
      }
      if (input.end_date) {
        input.end_date = new Date(input.end_date);
      }
      input.organization_id = context.user.current_organization_id;
      const newEvent = new Event(input);
      await newEvent.save();
      return {
        success: true,
        message: 'Event created successfully'
      };
    }),

    update_event: withAuth(async (_: any, { id, input }: { id: string; input: Partial<IEvent> }, context: { user: IAuth }) => {
      const event = await Event.findById(id);
      if (!event) {
        throw new NotFoundError('Event not found');
      }
      await roleInOrganization(context.user._id as mongoose.Types.ObjectId, event.organization_id, UserRoleEnum.ORG_ADMIN);
      if (input.start_date) {
        input.start_date = new Date(input.start_date);
      }
      if (input.end_date) {
        input.end_date = new Date(input.end_date);
      }
      const updatedEvent = await Event.findByIdAndUpdate(id, { $set: input }, { new: true, runValidators: true });
      if (!updatedEvent) {
        throw new NotFoundError('Event not found');
      }
      return {
        success: true,
        message: 'Event updated successfully'
      };
    }),

    delete_event: withAuth(async (_: any, { id }: { id: string }, context: { user: IAuth }) => {
      const event = await Event.findById(id);
      if (!event) {
        throw new NotFoundError('Event not found');
      }
      await roleInOrganization(context.user._id as mongoose.Types.ObjectId, event.organization_id, UserRoleEnum.ORG_ADMIN);
      await Event.findByIdAndDelete(id);
      return {
        success: true,
        message: 'Event deleted successfully'
      };
    }),

    create_membership_type: withAuth(async (_: any, { input }: { input: Partial<IMembershipType> }, context: { user: IAuth }) => {
      if (!context.user?.current_organization_id) {
        throw new BadRequestError('User not authenticated or organization not found');
      }
      input.organization_id = context.user.current_organization_id;
      const newMembershipType = new MembershipType(input);
      await newMembershipType.save();
      return {
        success: true,
        message: 'Membership type created successfully'
      };
    }),

    update_membership_type: withAuth(
      async (_: any, { id, input }: { id: string; input: Partial<IMembershipType> }, context: { user: IAuth }) => {
        const membershipType = await MembershipType.findById(id);
        if (!membershipType) {
          throw new NotFoundError('Membership type not found');
        }
        await roleInOrganization(context.user._id as mongoose.Types.ObjectId, membershipType.organization_id, UserRoleEnum.ORG_ADMIN);
        const updatedMembershipType = await MembershipType.findByIdAndUpdate(id, { $set: input }, { new: true, runValidators: true });
        if (!updatedMembershipType) {
          throw new NotFoundError('Membership type not found');
        }

        return {
          success: true,
          message: 'Membership type updated successfully'
        };
      }
    ),

    delete_membership_type: withAuth(async (_: any, { id }: { id: string }, context: { user: IAuth }) => {
      const membershipType = await MembershipType.findById(id);
      if (!membershipType) {
        throw new NotFoundError('Membership type not found');
      }
      await roleInOrganization(context.user._id as mongoose.Types.ObjectId, membershipType.organization_id, UserRoleEnum.ORG_ADMIN);
      await MembershipType.findByIdAndDelete(id);
      return {
        success: true,
        message: 'Membership type deleted successfully'
      };
    }),

    create_court: withAuth(async (_: any, { input }: { input: Partial<ICourt> }, context: { user: IAuth }) => {
      if (!context.user?.current_organization_id) {
        throw new BadRequestError('User not authenticated or organization not found');
      }
      input.organization_id = context.user.current_organization_id;
      const newCourt = new Court(input);
      await newCourt.save();
      return {
        success: true,
        message: 'Court created successfully'
      };
    }),

    update_court: withAuth(async (_: any, { id, input }: { id: string; input: Partial<ICourt> }, context: { user: IAuth }) => {
      const court = await Court.findById(id);
      if (!court) {
        throw new NotFoundError('Court not found');
      }
      await roleInOrganization(context.user._id as mongoose.Types.ObjectId, court.organization_id, UserRoleEnum.ORG_ADMIN);
      const updatedCourt = await Court.findByIdAndUpdate(id, { $set: input }, { new: true, runValidators: true });
      if (!updatedCourt) {
        throw new NotFoundError('Court not found');
      }
      return {
        success: true,
        message: 'Court updated successfully'
      };
    }),

    delete_court: withAuth(async (_: any, { id }: { id: string }, context: { user: IAuth }) => {
      const court = await Court.findById(id);
      if (!court) {
        throw new NotFoundError('Court not found');
      }
      await roleInOrganization(context.user._id as mongoose.Types.ObjectId, court.organization_id, UserRoleEnum.ORG_ADMIN);
      await Court.findByIdAndDelete(id);
      return {
        success: true,
        message: 'Court deleted successfully'
      };
    }),

    create_reservation_type: withAuth(async (_: any, { input }: { input: Partial<IReservationType> }, context: { user: IAuth }) => {
      if (!context.user?.current_organization_id) {
        throw new BadRequestError('User not authenticated or organization not found');
      }
      input.organization_id = context.user.current_organization_id;
      const newReservationType = new ReservationType(input);
      await newReservationType.save();
      return {
        success: true,
        message: 'Reservation type created successfully'
      };
    }),

    update_reservation_type: withAuth(
      async (_: any, { id, input }: { id: string; input: Partial<IReservationType> }, context: { user: IAuth }) => {
        const reservationType = await ReservationType.findById(id);
        if (!reservationType) {
          throw new NotFoundError('Reservation type not found');
        }
        await roleInOrganization(context.user._id as mongoose.Types.ObjectId, reservationType.organization_id, UserRoleEnum.ORG_ADMIN);
        const updatedReservationType = await ReservationType.findByIdAndUpdate(id, { $set: input }, { new: true, runValidators: true });
        if (!updatedReservationType) {
          throw new NotFoundError('Reservation type not found');
        }

        return {
          success: true,
          message: 'Reservation type updated successfully',
          reservation_type: updatedReservationType
        };
      }
    ),

    delete_reservation_type: withAuth(async (_: any, { id }: { id: string }, context: { user: IAuth }) => {
      const reservationType = await ReservationType.findById(id);
      if (!reservationType) {
        throw new NotFoundError('Reservation type not found');
      }
      await roleInOrganization(context.user._id as mongoose.Types.ObjectId, reservationType.organization_id, UserRoleEnum.ORG_ADMIN);
      await ReservationType.findByIdAndDelete(id);
      return {
        success: true,
        message: 'Reservation type deleted successfully'
      };
    }),

    create_family: withAuth(async (_: any, { input }: { input: Partial<IFamily> }, context: { user: IAuth }) => {
      if (!context.user?.current_organization_id) {
        throw new BadRequestError('User not authenticated or organization not found');
      }
      input.organization_id = context.user.current_organization_id;
      const newFamily = new Family(input);
      await newFamily.save();
      return {
        success: true,
        message: 'Family created successfully'
      };
    }),

    update_family: withAuth(async (_: any, { id, input }: { id: string; input: Partial<IFamily> }, context: { user: IAuth }) => {
      const family = await Family.findById(id);
      if (!family) {
        throw new NotFoundError('Family not found');
      }
      await roleInOrganization(context.user._id as mongoose.Types.ObjectId, family.organization_id, UserRoleEnum.ORG_ADMIN);
      const updatedFamily = await Family.findByIdAndUpdate(id, { $set: input }, { new: true, runValidators: true });
      if (!updatedFamily) {
        throw new NotFoundError('Family not found');
      }
      return {
        success: true,
        message: 'Family updated successfully'
      };
    }),

    delete_family: withAuth(async (_: any, { id }: { id: string }, context: { user: IAuth }) => {
      const family = await Family.findById(id);
      if (!family) {
        throw new NotFoundError('Family not found');
      }
      await roleInOrganization(context.user._id as mongoose.Types.ObjectId, family.organization_id, UserRoleEnum.ORG_ADMIN);
      await Family.findByIdAndDelete(id);
      return {
        success: true,
        message: 'Family deleted successfully'
      };
    }),

    create_member: withAuth(async (_: any, { input }: { input: Partial<IMember> }, context: { user: IAuth }) => {
      if (input.date_of_birth) {
        input.date_of_birth = new Date(input.date_of_birth);
      }
      const newMember = new Member(input);
      await newMember.save();
      return {
        success: true,
        message: 'Member created successfully'
      };
    }),

    update_member: withAuth(async (_: any, { id, input }: { id: string; input: Partial<IMember> }, context: { user: IAuth }) => {
      const member = await Member.findById(id);
      if (!member) {
        throw new NotFoundError('Member not found');
      }
      await roleInOrganization(context.user._id as mongoose.Types.ObjectId, member.organization_id, UserRoleEnum.ORG_ADMIN);
      if (input.date_of_birth) {
        input.date_of_birth = new Date(input.date_of_birth);
      }
      if (input.membership_start_date) {
        input.membership_start_date = new Date(input.membership_start_date);
      }
      if (input.membership_end_date) {
        input.membership_end_date = new Date(input.membership_end_date);
      }
      const updatedMember = await Member.findByIdAndUpdate(id, { $set: input }, { new: true, runValidators: true });
      if (!updatedMember) {
        throw new NotFoundError('Member not found');
      }
      return {
        success: true,
        message: 'Member updated successfully'
      };
    }),

    delete_member: withAuth(async (_: any, { id }: { id: string }, context: { user: IAuth }) => {
      const member = await Member.findById(id);
      if (!member) {
        throw new NotFoundError('Member not found');
      }
      await roleInOrganization(context.user._id as mongoose.Types.ObjectId, member.organization_id, UserRoleEnum.ORG_ADMIN);
      await Member.findByIdAndDelete(id);
      return {
        success: true,
        message: 'Member deleted successfully'
      };
    }),

    create_member_report: withAuth(async (_: any, { input }: { input: Partial<IPlayerReport> }, context: { user: IAuth }) => {
      if (!context.user?.current_organization_id) {
        throw new BadRequestError('User not authenticated or organization not found');
      }
      input.organization_id = context.user.current_organization_id;
      if (input.start_date_time) {
        input.start_date_time = new Date(input.start_date_time);
      }
      if (input.end_date_time) {
        input.end_date_time = new Date(input.end_date_time);
      }
      if (input.cancelled_on_utc) {
        input.cancelled_on_utc = new Date(input.cancelled_on_utc);
      }

      const newPlayerReport = new PlayerReport(input);
      await newPlayerReport.save();

      return {
        success: true,
        message: 'Member report created successfully'
      };
    }),

    update_member_report: withAuth(
      async (_: any, { id, input }: { id: string; input: Partial<IPlayerReport> }, context: { user: IAuth }) => {
        const playerReport = await PlayerReport.findById(id);
        if (!playerReport) {
          throw new NotFoundError('Member report not found');
        }
        await roleInOrganization(context.user._id as mongoose.Types.ObjectId, playerReport.organization_id, UserRoleEnum.ORG_ADMIN);
        if (input.start_date_time) {
          input.start_date_time = new Date(input.start_date_time);
        }
        if (input.end_date_time) {
          input.end_date_time = new Date(input.end_date_time);
        }
        if (input.cancelled_on_utc) {
          input.cancelled_on_utc = new Date(input.cancelled_on_utc);
        }

        const updatedPlayerReport = await PlayerReport.findByIdAndUpdate(id, { $set: input }, { new: true, runValidators: true });

        if (!updatedPlayerReport) {
          throw new NotFoundError('Member report not found');
        }

        return {
          success: true,
          message: 'Member report updated successfully'
        };
      }
    ),

    delete_member_report: withAuth(async (_: any, { id }: { id: string }, context: { user: IAuth }) => {
      const playerReport = await PlayerReport.findById(id);
      if (!playerReport) {
        throw new NotFoundError('Member report not found');
      }
      await roleInOrganization(context.user._id as mongoose.Types.ObjectId, playerReport.organization_id, UserRoleEnum.ORG_ADMIN);
      await PlayerReport.findByIdAndDelete(id);
      return {
        success: true,
        message: 'Member report deleted successfully'
      };
    }),

    create_reservation: withAuth(async (_: any, { input }: { input: Partial<IReservation> }, context: { user: IAuth }) => {
      if (!context.user?.current_organization_id) {
        throw new BadRequestError('User not authenticated or organization not found');
      }
      input.organization_id = context.user.current_organization_id;
      if (input.start_time) {
        input.start_time = new Date(input.start_time);
      }
      if (input.end_time) {
        input.end_time = new Date(input.end_time);
      }
      if (input.cancelled_on) {
        input.cancelled_on = new Date(input.cancelled_on);
      }

      const newReservation = new Reservation(input);
      await newReservation.save();

      return {
        success: true,
        message: 'Reservation created successfully'
      };
    }),

    update_reservation: withAuth(async (_: any, { id, input }: { id: string; input: Partial<IReservation> }, context: { user: IAuth }) => {
      const reservation = await Reservation.findById(id);
      if (!reservation) {
        throw new NotFoundError('Reservation not found');
      }
      await roleInOrganization(context.user._id as mongoose.Types.ObjectId, reservation.organization_id, UserRoleEnum.ORG_ADMIN);
      if (input.start_time) {
        input.start_time = new Date(input.start_time);
      }
      if (input.end_time) {
        input.end_time = new Date(input.end_time);
      }
      if (input.cancelled_on) {
        input.cancelled_on = new Date(input.cancelled_on);
      }
      const updatedReservation = await Reservation.findByIdAndUpdate(id, { $set: input }, { new: true, runValidators: true });
      if (!updatedReservation) {
        throw new NotFoundError('Reservation not found');
      }
      return {
        success: true,
        message: 'Reservation updated successfully'
      };
    }),

    delete_reservation: withAuth(async (_: any, { id }: { id: string }, context: { user: IAuth }) => {
      const reservation = await Reservation.findById(id);
      if (!reservation) {
        throw new NotFoundError('Reservation not found');
      }
      await roleInOrganization(context.user._id as mongoose.Types.ObjectId, reservation.organization_id, UserRoleEnum.ORG_ADMIN);
      await Reservation.findByIdAndDelete(id);
      return {
        success: true,
        message: 'Reservation deleted successfully'
      };
    }),

    create_sales_summary: withAuth(async (_: any, { input }: { input: Partial<ISalesSummary> }, context: { user: IAuth }) => {
      if (!context.user?.current_organization_id) {
        throw new BadRequestError('User not authenticated or organization not found');
      }
      input.organization_id = context.user.current_organization_id;
      if (input.start) {
        input.start = new Date(input.start);
      }
      if (input.end) {
        input.end = new Date(input.end);
      }
      if (input.transaction_date) {
        input.transaction_date = new Date(input.transaction_date);
      }
      if (input.paid_date) {
        input.paid_date = new Date(input.paid_date);
      }

      const newSalesSummary = new SalesSummary(input);
      await newSalesSummary.save();

      return {
        success: true,
        message: 'Sales summary created successfully'
      };
    }),

    update_sales_summary: withAuth(
      async (_: any, { id, input }: { id: string; input: Partial<ISalesSummary> }, context: { user: IAuth }) => {
        const salesSummary = await SalesSummary.findById(id);
        if (!salesSummary) {
          throw new NotFoundError('Sales summary not found');
        }
        await roleInOrganization(context.user._id as mongoose.Types.ObjectId, salesSummary.organization_id, UserRoleEnum.ORG_ADMIN);
        if (input.start) {
          input.start = new Date(input.start);
        }
        if (input.end) {
          input.end = new Date(input.end);
        }
        if (input.transaction_date) {
          input.transaction_date = new Date(input.transaction_date);
        }
        if (input.paid_date) {
          input.paid_date = new Date(input.paid_date);
        }
        const updatedSalesSummary = await SalesSummary.findByIdAndUpdate(id, { $set: input }, { new: true, runValidators: true });
        if (!updatedSalesSummary) {
          throw new NotFoundError('Sales summary not found');
        }
        return {
          success: true,
          message: 'Sales summary updated successfully'
        };
      }
    ),

    delete_sales_summary: withAuth(async (_: any, { id }: { id: string }, context: { user: IAuth }) => {
      const salesSummary = await SalesSummary.findById(id);
      if (!salesSummary) {
        throw new NotFoundError('Sales summary not found');
      }
      await roleInOrganization(context.user._id as mongoose.Types.ObjectId, salesSummary.organization_id, UserRoleEnum.ORG_ADMIN);
      await SalesSummary.findByIdAndDelete(id);
      return {
        success: true,
        message: 'Sales summary deleted successfully'
      };
    }),

    create_transaction: withAuth(async (_: any, { input }: { input: Partial<ITransaction> }, context: { user: IAuth }) => {
      if (!context.user?.current_organization_id) {
        throw new BadRequestError('User not authenticated or organization not found');
      }
      input.organization_id = context.user.current_organization_id;
      if (input.transaction_date) {
        input.transaction_date = new Date(input.transaction_date);
      }
      if (input.paid_on) {
        input.paid_on = new Date(input.paid_on);
      }
      if (input.reservation_start) {
        input.reservation_start = new Date(input.reservation_start);
      }
      if (input.reservation_end) {
        input.reservation_end = new Date(input.reservation_end);
      }
      if (input.account_creation_date) {
        input.account_creation_date = new Date(input.account_creation_date);
      }

      const newTransaction = new Transaction(input);
      await newTransaction.save();

      return {
        success: true,
        message: 'Transaction created successfully'
      };
    }),

    update_transaction: withAuth(async (_: any, { id, input }: { id: string; input: Partial<ITransaction> }, context: { user: IAuth }) => {
      const transaction = await Transaction.findById(id);
      if (!transaction) {
        throw new NotFoundError('Transaction not found');
      }
      await roleInOrganization(context.user._id as mongoose.Types.ObjectId, transaction.organization_id, UserRoleEnum.ORG_ADMIN);
      if (input.transaction_date) {
        input.transaction_date = new Date(input.transaction_date);
      }
      if (input.paid_on) {
        input.paid_on = new Date(input.paid_on);
      }
      if (input.reservation_start) {
        input.reservation_start = new Date(input.reservation_start);
      }
      if (input.reservation_end) {
        input.reservation_end = new Date(input.reservation_end);
      }
      if (input.account_creation_date) {
        input.account_creation_date = new Date(input.account_creation_date);
      }
      const updatedTransaction = await Transaction.findByIdAndUpdate(id, { $set: input }, { new: true, runValidators: true });
      if (!updatedTransaction) {
        throw new NotFoundError('Transaction not found');
      }
      return {
        success: true,
        message: 'Transaction updated successfully'
      };
    }),

    delete_transaction: withAuth(async (_: any, { id }: { id: string }, context: { user: IAuth }) => {
      const transaction = await Transaction.findById(id);
      if (!transaction) {
        throw new NotFoundError('Transaction not found');
      }
      await roleInOrganization(context.user._id as mongoose.Types.ObjectId, transaction.organization_id, UserRoleEnum.ORG_ADMIN);
      await Transaction.findByIdAndDelete(id);
      return {
        success: true,
        message: 'Transaction deleted successfully'
      };
    }),

    create_revenue_recognition: withAuth(async (_: any, { input }: { input: Partial<IRevenueRecognition> }, context: { user: IAuth }) => {
      if (!context.user?.current_organization_id) {
        throw new BadRequestError('User not authenticated or organization not found');
      }
      input.organization_id = context.user.current_organization_id;
      if (input.start_date_time) {
        input.start_date_time = new Date(input.start_date_time);
      }
      if (input.end_date_time) {
        input.end_date_time = new Date(input.end_date_time);
      }
      if (input.paid_date) {
        input.paid_date = new Date(input.paid_date);
      }
      if (input.additional_dates && Array.isArray(input.additional_dates)) {
        input.additional_dates = input.additional_dates.map((date) => (typeof date === 'string' ? new Date(date) : date));
      }

      const revenueRecognition = new RevenueRecognition(input);
      await revenueRecognition.save();

      return {
        success: true,
        message: 'Revenue recognition created successfully',
        id: revenueRecognition._id
      };
    }),

    update_revenue_recognition: withAuth(
      async (_: any, { id, input }: { id: string; input: Partial<IRevenueRecognition> }, context: { user: IAuth }) => {
        const revenueRecognition = await RevenueRecognition.findById(id);
        if (!revenueRecognition) {
          throw new NotFoundError('Revenue recognition not found');
        }
        await roleInOrganization(context.user._id as mongoose.Types.ObjectId, revenueRecognition.organization_id, UserRoleEnum.ORG_ADMIN);
        if (input.start_date_time) {
          input.start_date_time = new Date(input.start_date_time);
        }
        if (input.end_date_time) {
          input.end_date_time = new Date(input.end_date_time);
        }
        if (input.paid_date) {
          input.paid_date = new Date(input.paid_date);
        }
        if (input.additional_dates && Array.isArray(input.additional_dates)) {
          input.additional_dates = input.additional_dates.map((date) => (typeof date === 'string' ? new Date(date) : date));
        }
        await RevenueRecognition.findByIdAndUpdate(id, { $set: input });
        return {
          success: true,
          message: 'Revenue recognition updated successfully',
          id
        };
      }
    ),

    delete_revenue_recognition: withAuth(async (_: any, { id }: { id: string }, context: { user: IAuth }) => {
      const revenueRecognition = await RevenueRecognition.findById(id);
      if (!revenueRecognition) {
        throw new NotFoundError('Revenue recognition not found');
      }
      await roleInOrganization(context.user._id as mongoose.Types.ObjectId, revenueRecognition.organization_id, UserRoleEnum.ORG_ADMIN);
      await RevenueRecognition.findByIdAndDelete(id);
      return {
        success: true,
        message: 'Revenue recognition deleted successfully'
      };
    }),

    create_event_category: withAuth(async (_: any, { input }: { input: Partial<IEventCategory> }, context: { user: IAuth }) => {
      if (!context.user?.current_organization_id) {
        throw new BadRequestError('User not authenticated or organization not found');
      }
      input.organization_id = context.user.current_organization_id;
      const newEventCategory = new EventCategory(input);
      await newEventCategory.save();
      return {
        success: true,
        message: 'Event category created successfully'
      };
    }),

    update_event_category: withAuth(
      async (_: any, { id, input }: { id: string; input: Partial<IEventCategory> }, context: { user: IAuth }) => {
        const eventCategory = await EventCategory.findById(id);
        if (!eventCategory) {
          throw new NotFoundError('Event category not found');
        }
        await roleInOrganization(context.user._id as mongoose.Types.ObjectId, eventCategory.organization_id, UserRoleEnum.ORG_ADMIN);
        await EventCategory.findByIdAndUpdate(id, { $set: input }, { new: true, runValidators: true });
        return {
          success: true,
          message: 'Event category updated successfully'
        };
      }
    ),

    delete_event_category: withAuth(async (_: any, { id }: { id: string }, context: { user: IAuth }) => {
      const eventCategory = await EventCategory.findById(id);
      if (!eventCategory) {
        throw new NotFoundError('Event category not found');
      }
      await roleInOrganization(context.user._id as mongoose.Types.ObjectId, eventCategory.organization_id, UserRoleEnum.ORG_ADMIN);
      await EventCategory.findByIdAndDelete(id);
      return {
        success: true,
        message: 'Event category deleted successfully'
      };
    }),

    delete_event_registration: withAuth(async (_: any, { id }: { id: string }, context: { user: IAuth }) => {
      const eventRegistration = await ReservationPlayer.findById(id);
      if (!eventRegistration) {
        throw new NotFoundError('Event registration not found');
      }
      await roleInOrganization(context.user._id as mongoose.Types.ObjectId, eventRegistration.organization_id, UserRoleEnum.ORG_ADMIN);
      await ReservationPlayer.findByIdAndDelete(id);
      return {
        success: true,
        message: 'Event registration deleted successfully'
      };
    }),

    signup: async (
      _: any,
      { input }: { input: { email: string; password: string; first_name: string; last_name: string; organization_name: string } },
      context: any
    ) => {
      const userAgent = context.userAgent;
      const ipAddress = context.userIp;
      const { email, password, first_name, last_name, organization_name } = input;
      const existingUser = await Auth.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        throw new BadRequestError('User already exists');
      }
      const organization = new OrganizationModel({
        name: organization_name,
        email: email.toLowerCase()
      });
      const newOrganization = await organization.save();
      const auth: Partial<IAuth> = {
        email: email.toLowerCase(),
        first_name,
        last_name,
        password,
        role: UserRoleEnum.ORG_ADMIN,
        current_organization_id: newOrganization._id as mongoose.Types.ObjectId
      };
      const result = await authService.createAuthUser(auth);
      const user = await authService.getUserById(result._id as mongoose.Types.ObjectId);
      if (!user) {
        throw new NotFoundError('User not found');
      }
      const tokens = await keyTokenService.generateTokens({ user: user as IAuth, userAgent, ipAddress });
      if (!tokens) {
        throw new BadRequestError('Error when signing token');
      }
      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: {
          _id: user._id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          current_organization_id: user.current_organization_id
        }
      };
    },

    login: async (_: any, { input }: { input: { email: string; password: string } }, context: any) => {
      const userAgent = context.userAgent;
      const ipAddress = context.userIp;
      const { email, password } = input;
      const existingUser = await authService.getUserByEmail(email.toLowerCase());
      if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
      }
      const passwordsMatch: boolean = await argon2.verify(`${existingUser.password}`, password);
      if (!passwordsMatch) {
        throw new BadRequestError('Invalid credentials');
      }
      await keyTokenService.deleteKeyToken({
        authId: existingUser._id,
        deviceName: userAgent?.deviceName,
        deviceType: userAgent?.deviceType,
        os: userAgent?.os,
        browser: userAgent?.browser,
        ipAddress
      });
      const tokens = await keyTokenService.generateTokens({
        user: existingUser,
        userAgent,
        ipAddress
      });
      if (!tokens) {
        throw new BadRequestError('Error when signing token');
      }
      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: {
          _id: existingUser._id,
          email: existingUser.email,
          first_name: existingUser.first_name,
          last_name: existingUser.last_name,
          role: existingUser.role,
          current_organization_id: existingUser.current_organization_id
        }
      };
    },

    logout: async (_: any, { input }: { input: { refreshToken: string } }, context: any) => {
      const userAgent = context.userAgent;
      const ipAddress = context.userIp;
      const { refreshToken } = input;
      if (!refreshToken) {
        throw new BadRequestError('Refresh token is required');
      }
      const keyToken = await keyTokenService.findKeyToken({ refreshToken });
      if (!keyToken) {
        throw new NotFoundError('Invalid refresh token');
      }
      await keyTokenService.deleteKeyToken({
        authId: keyToken.authId,
        deviceName: userAgent?.deviceName,
        deviceType: userAgent?.deviceType,
        os: userAgent?.os,
        browser: userAgent?.browser,
        ipAddress
      });
      return {
        success: true,
        message: 'Logout successful'
      };
    },

    forgot_password: async (_: any, { input }: { input: { email: string } }) => {
      const { email } = input;
      const user = await authService.getUserByEmail(email.toLowerCase());
      if (!user) {
        return {
          success: true,
          message: 'If your email exists in our system, you will receive a password reset link'
        };
      }
      const resetToken = await passwordResetService.generateToken((user._id as mongoose.Types.ObjectId).toString());
      await emailService.sendPasswordResetEmail(email, resetToken.token);
      return {
        success: true,
        message: 'If your email exists in our system, you will receive a password reset link'
      };
    },

    reset_password: async (_: any, { input }: { input: { token: string; password: string; confirmPassword: string } }) => {
      const { token, password, confirmPassword } = input;
      if (password !== confirmPassword) {
        return {
          success: false,
          message: 'Passwords do not match'
        };
      }
      const resetToken = await passwordResetService.validateToken(token);
      if (!resetToken) {
        return {
          success: false,
          message: 'Invalid or expired token'
        };
      }
      const authId = resetToken.authId as mongoose.Types.ObjectId;
      await authService.updatePassword(authId.toString(), password);
      await keyTokenService.deleteKeyToken({
        authId: authId
      });
      await passwordResetService.markTokenAsUsed(token);
      return {
        success: true,
        message: 'Password has been reset successfully'
      };
    },

    refresh_token: async (_: any, { input }: { input: { refreshToken: string } }, context: any) => {
      const userAgent = context.userAgent;
      const ipAddress = context.userIp;
      const { refreshToken } = input;
      const existingToken = await keyTokenService.findKeyToken({ refreshToken });
      if (!existingToken) throw new BadRequestError('Invalid refresh token', 'rotateRefreshToken');
      const { authId } = existingToken;
      const user = await authService.getAuthUser({ _id: new mongoose.Types.ObjectId(authId) });
      if (!user) {
        throw new BadRequestError('User not found', 'rotateRefreshToken');
      }
      await keyTokenService.deleteKeyToken({ refreshToken });
      const tokens = await keyTokenService.generateTokens({ user, userAgent, ipAddress });
      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      };
    },

    add_organization_user: withAuth(
      async (
        _: any,
        { input }: { input: { email: string; first_name: string; last_name: string; organization_id: string; role: UserRoleEnum } },
        context: { user: IAuth }
      ) => {
        await roleInOrganization(
          context.user._id as mongoose.Types.ObjectId,
          new mongoose.Types.ObjectId(input.organization_id),
          UserRoleEnum.ORG_ADMIN
        );
        const organizationExists = await OrganizationModel.findById(input.organization_id);
        if (!organizationExists) {
          throw new NotFoundError('Organization not found');
        }
        const normalizedEmail = input.email.toLowerCase().trim();
        let user = await Auth.findOne({ email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') } });
        let generatedPassword = '';

        if (!user) {
          generatedPassword = Math.random().toString(36).slice(-10);
          const hashedPassword = await argon2.hash(generatedPassword);
          user = new Auth({
            email: normalizedEmail,
            first_name: input.first_name,
            last_name: input.last_name,
            password: hashedPassword,
            role: input.role,
            is_verified: false
          });
          await user.save();
          const userOrg = new UserOrganization({
            user_id: user._id,
            organization_id: input.organization_id,
            role: input.role
          });
          await userOrg.save();

          emailService.sendWelcomeEmail({
            to: user.email,
            name: user.first_name || 'there',
            email: user.email,
            password: generatedPassword,
            organizationName: organizationExists.name
          });
        }
        return {
          success: true,
          message: 'User added to organization successfully'
        };
      }
    ),

    update_organization_user: withAuth(
      async (
        _: any,
        { id, input }: { id: string; input: { user_id: string; organization_id: string; role: UserRoleEnum } },
        context: { user: IAuth }
      ) => {
        await roleInOrganization(
          context.user._id as mongoose.Types.ObjectId,
          new mongoose.Types.ObjectId(input.organization_id),
          UserRoleEnum.ORG_ADMIN
        );
        const userOrg = await UserOrganization.findById(id);
        if (!userOrg) {
          throw new NotFoundError('User-organization relationship not found');
        }
        userOrg.role = input.role;
        await userOrg.save();
        return {
          success: true,
          message: 'User role in organization updated successfully'
        };
      }
    ),

    remove_organization_user: withAuth(
      async (_: any, { input }: { input: { user_id: string; organization_id: string } }, context: { user: IAuth }) => {
        await roleInOrganization(
          context.user._id as mongoose.Types.ObjectId,
          new mongoose.Types.ObjectId(input.organization_id),
          UserRoleEnum.ORG_ADMIN
        );
        const userOrg = await UserOrganization.findOneAndDelete({ user_id: input.user_id, organization_id: input.organization_id });
        if (!userOrg) {
          throw new NotFoundError('User-organization relationship not found');
        }
        return {
          success: true,
          message: 'User removed from organization successfully'
        };
      }
    ),

    update_organization: withAuth(
      async (
        _: any,
        {
          id,
          input
        }: {
          id: string;
          input: {
            name?: string;
            description?: string;
          };
        },
        context: { user: IAuth }
      ) => {
        if (!context.user) {
          throw new BadRequestError('User not authenticated');
        }
        await roleInOrganization(context.user._id as mongoose.Types.ObjectId, new mongoose.Types.ObjectId(id), UserRoleEnum.ORG_ADMIN);
        const organization = await OrganizationModel.findById(new mongoose.Types.ObjectId(id));
        if (!organization) {
          throw new NotFoundError('Organization not found');
        }
        const updateData: Partial<IOrganization> = {};
        if (input.name) updateData.name = input.name;
        if (input.description) updateData.description = input.description;
        const updatedOrganization = await organization.updateOne(updateData);
        if (!updatedOrganization) {
          throw new BadRequestError('Failed to update organization');
        }
        return {
          success: true,
          message: 'Organization updated successfully'
        };
      }
    ),

    update_me: withAuth(
      async (
        _: any,
        {
          input
        }: { input: { first_name?: string; last_name?: string; password?: string; email?: string; current_organization_id?: string } },
        context: { user: IAuth }
      ) => {
        if (!context.user) {
          throw new BadRequestError('User not authenticated');
        }
        const updateData: Partial<IAuth> = {};
        if (input.first_name) updateData.first_name = input.first_name;
        if (input.last_name) updateData.last_name = input.last_name;
        if (input.email) {
          const emailLowercase = input.email.toLowerCase();
          if (emailLowercase !== context.user.email?.toLowerCase()) {
            const existingUser = await Auth.findOne({ email: emailLowercase, _id: { $ne: context.user._id } });
            if (existingUser) {
              throw new BadRequestError('Email already in use by another account');
            }
          }
          updateData.email = emailLowercase;
        }
        if (input.current_organization_id) {
          const existingUserOrg = await UserOrganization.findOne({
            user_id: context.user._id,
            organization_id: input.current_organization_id
          });
          if (!existingUserOrg) {
            throw new BadRequestError('Organization does not belong to this user');
          }
          updateData.current_organization_id = new mongoose.Types.ObjectId(input.current_organization_id);
        }

        if (Object.keys(updateData).length > 0) {
          const updatedUser = await authService.updateUser(context.user._id as mongoose.Types.ObjectId, updateData);
          if (!updatedUser) {
            throw new BadRequestError('Failed to update user');
          }
        }

        return {
          success: true,
          message: 'User updated successfully'
        };
      }
    ),

    change_password_me: withAuth(
      async (_: any, { input }: { input: { current_password: string; new_password: string } }, context: { user: IAuth }) => {
        if (!context.user) {
          throw new BadRequestError('User not authenticated');
        }
        const user = await Auth.findById(context.user._id);
        if (!user) {
          throw new NotFoundError('User not found');
        }
        const isPasswordValid = await argon2.verify(user.password, input.current_password);
        if (!isPasswordValid) {
          throw new BadRequestError('Current password is incorrect');
        }
        user.password = input.new_password;
        await user.save();
        return {
          success: true,
          message: 'Password changed successfully'
        };
      }
    )
  }
};
