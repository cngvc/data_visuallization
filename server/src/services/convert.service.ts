import Court from '@/entities/court.entity';
import EventCategory from '@/entities/event-category.entity';
import EventRegistration from '@/entities/event-registration.entity';
import Event from '@/entities/event.entity';
import Family from '@/entities/family.entity';
import Member from '@/entities/member.entity';
import MembershipType from '@/entities/membership-type.entity';
import PlayerReport from '@/entities/player-report.entity';
import ReservationPlayer from '@/entities/reservation-player.entity';
import ReservationType from '@/entities/reservation-type.entity';
import Reservation from '@/entities/reservation.entity';
import RevenueRecognition from '@/entities/revenue-recognition.entity';
import SalesSummary from '@/entities/sales-summary.entity';
import Transaction from '@/entities/transaction.entity';
import {
  ICourtCSV,
  IEventCategoryCSV,
  IEventCSV,
  IEventRegistrationCSV,
  IFamilyCSV,
  IMemberCSV,
  IMembershipTypeCSV,
  IPlayerReportCSV,
  IReservationCSV,
  IReservationPlayerCSV,
  IReservationTypeCSV,
  IRevenueRecognitionCSV,
  ISalesSummaryCSV,
  ITransactionCSV
} from '@/interfaces/csv.interface';

import {
  ICourtJSON,
  IEventCategoryJSON,
  IEventJSON,
  IEventRegistrationJSON,
  IFamilyJSON,
  IMemberJSON,
  IMembershipTypeJSON,
  IPlayerReportJSON,
  IReservationJSON,
  IReservationTypeJSON,
  IRevenueRecognitionJSON,
  ISalesSummaryJSON,
  ITransactionJSON
} from '@/interfaces/json.interface';
import { importCacheService } from '@/services/import-cache.service';
import { formatDate } from '@/utils/validator.util';
import mongoose from 'mongoose';

class ConvertService {
  familyJSON = async (record: IFamilyJSON, organizationId: mongoose.Types.ObjectId) => {
    const existingFamily = await Family.findOne({ family_id: record.OrganizationMemberFamilyId, organization_id: organizationId });
    if (existingFamily) {
      return null;
    }
    return {
      name: record.FamilyName,
      number: record.FamilyNumber,
      family_id: record.OrganizationMemberFamilyId,

      organization_id: organizationId
    };
  };

  memberJSON = async (record: IMemberJSON, organizationId: mongoose.Types.ObjectId) => {
    const existingMember = await Member.findOne({ member_id: record.OrganizationMemberId, organization_id: organizationId });
    if (existingMember) {
      return null;
    }
    let familyId = await importCacheService.findFamily(record.OrganizationMemberFamilyId, organizationId);
    if (!familyId && record.OrganizationMemberFamilyId) {
      const newFamily = await Family.create({
        family_id: record.OrganizationMemberFamilyId,
        name: 'REDACTED',

        organization_id: organizationId
      });
      familyId = newFamily._id as mongoose.Types.ObjectId;
    }
    let membershipTypeId = await importCacheService.findMembershipType(record.MembershipTypeId, organizationId);
    if (!membershipTypeId && record.MembershipTypeId) {
      const newMembershipType = await MembershipType.create({
        membership_type_id: record.MembershipTypeId,
        name: record.MembershipTypeName || 'REDACTED',

        organization_id: organizationId
      });
      membershipTypeId = newMembershipType._id as mongoose.Types.ObjectId;
    }
    return {
      member_id: record.OrganizationMemberId,
      family_id: familyId,
      first_name: record.FirstName || 'REDACTED',
      last_name: record.LastName || 'REDACTED',
      gender: record.Gender || 'REDACTED',
      email: record.Email || 'REDACTED',
      phone: record.Phone || '',
      date_of_birth: formatDate(record.DateOfBirth),
      address: record.Address,
      city: record.City,
      state: record.State,
      zip_code: record.ZipCode,
      membership_assignment_type: record.MembershipAssignmentType,
      membership_status: record.MembershipStatus,
      family_role: record.FamilyRole,
      allow_child_login: record.AllowChildLogin || false,
      membership_start_date: formatDate(record.MembershipStartDate),
      membership_end_date: formatDate(record.MembershipEndDate),
      membership_type_id: membershipTypeId,
      profile_image_url: record.ProfileImageUrl || null,
      user_defined_fields: record.UserDefinedFields || null,
      ratings: record.Ratings,
      external_id: record.ExternalId,

      organization_id: organizationId
    };
  };

  membershipTypeJSON = async (record: IMembershipTypeJSON, organizationId: mongoose.Types.ObjectId) => {
    const existingType = await MembershipType.findOne({ membership_type_id: record.Id, organization_id: organizationId });
    if (existingType) {
      return null;
    }
    return {
      membership_type_id: record.Id,
      name: record.Name,
      order_index: record.OrderIndex,
      description: record.Description || '',
      short_code: record.ShortCode || '',
      is_active: !!record.IsActive,
      is_payment_required: !!record.IsPaymentRequired,
      purchase_start_date: formatDate(record.PurchaseStartDate),
      purchase_end_date: formatDate(record.PurchaseEndDate),
      is_restrict_by_age: !!record.IsRestrictByAge,
      allow_min_age: record.AllowMinAge || null,
      allow_max_age: record.AllowMaxAge || null,
      days_past_due_to_suspend: record.DaysPastDueToSuspend || null,
      days_past_due_to_cancel: record.DaysPastDueToCancel || null,
      initiation_price: record.InitiationPrice || null,
      monthly_price: record.MonthlyPrice || null,
      quarterly_price: record.QuarterlyPrice || null,
      annual_price: record.AnnualPrice || null,
      lifetime_price: record.LifetimePrice || null,
      custom_price: record.CustomPrice || null,
      custom_frequency_value: record.CustomFrequencyValue || null,
      cost_type_additional_features: record.CostTypeAdditionalFeatures || null,

      organization_id: organizationId
    };
  };

  courtJSON = async (record: ICourtJSON, organizationId: mongoose.Types.ObjectId) => {
    const existingCourt = await Court.findOne({ court_id: record.Id, organization_id: organizationId });
    if (existingCourt) {
      return null;
    }
    return {
      court_id: record.Id,
      order_index: record.OrderIndex,
      label: record.Label || 'REDACTED',
      type_name: record.TypeName || 'REDACTED',

      organization_id: organizationId
    };
  };

  revenueRecognitionJSON = async (record: IRevenueRecognitionJSON, organizationId: mongoose.Types.ObjectId) => {
    const revenueRecognitionId = `${record.OrganizationMemberId}_${record.RelationId}`;
    const existingRecord = await RevenueRecognition.findOne({
      revenue_recognition_id: revenueRecognitionId,
      organization_id: organizationId
    });
    if (existingRecord) {
      return null;
    }

    const feeId = await importCacheService.findTransaction(record.FeeId, organizationId);
    const paymentId = await importCacheService.findTransaction(record.PaymentId, organizationId);
    const relationId = await importCacheService.findTransaction(record.RelationId, organizationId);
    let memberId = await importCacheService.findMember(`${record.OrganizationMemberId}`, organizationId);
    if (!memberId && record.OrganizationMemberId) {
      const newMember = await Member.create({
        member_id: record.OrganizationMemberId,
        first_name: record.MemberFirstName || 'REDACTED',
        last_name: record.MemberLastName || 'REDACTED',
        email: 'REDACTED',

        organization_id: organizationId
      });
      memberId = newMember._id as mongoose.Types.ObjectId;
    }

    return {
      revenue_recognition_id: revenueRecognitionId,
      fee_category: record.FeeCategory,
      subtotal: record.Subtotal,
      tax_total: record.TaxTotal,
      total: record.Total,
      payment_type: record.PaymentType,
      start_date_time: formatDate(record.StartDateTime),
      end_date_time: formatDate(record.EndDateTime),
      paid_date: formatDate(record.PaidDate),
      member_id: memberId,
      description: record.Description,
      additional_dates: record.AdditionalDates ? record.AdditionalDates.map((date) => formatDate(date)).filter(Boolean) : [],
      fee_id: feeId,
      payment_id: paymentId,
      relation_id: relationId,
      transaction_type: record.TransactionType,
      package_info: record.PackageInfo || null,

      organization_id: organizationId
    };
  };

  eventJSON = async (record: IEventJSON, organizationId: mongoose.Types.ObjectId) => {
    const existingEvent = await Event.findOne({
      event_id: record.EventId,
      start_date: record.StartDateTime,
      end_date: record.EndDateTime,
      organization_id: organizationId
    });
    if (existingEvent) {
      return null;
    }
    let categoryId = await importCacheService.findEventCategory(record.EventCategoryId, organizationId);
    if (!categoryId && record.EventCategoryId) {
      const newCategory = await EventCategory.create({
        event_category_id: record.EventCategoryId,
        name: record.EventCategoryName || 'REDACTED',

        organization_id: organizationId
      });
      categoryId = newCategory._id as mongoose.Types.ObjectId;
    }
    const reservationId = await importCacheService.findReservation(record.ReservationId, organizationId);
    return {
      event_id: record.EventId,
      category_id: categoryId,
      reservation_id: reservationId,
      name: record.EventName,
      start_date: formatDate(record.StartDateTime),
      end_date: formatDate(record.EndDateTime),
      background_color: record.BackgroundColor || '#FFFFFF',
      is_registered: record.IsRegistered || false,
      sso_url: record.SsoUrl || '',
      image_url: record.ImageUrl || '',
      max_registrants: record.MaxRegistrants || 0,
      registered_count: record.RegisteredCount || 0,

      organization_id: organizationId
    };
  };

  reservationTypeJSON = async (record: IReservationTypeJSON, organizationId: mongoose.Types.ObjectId) => {
    const existingType = await ReservationType.findOne({ rental_reservation_type_id: record.Id, organization_id: organizationId });
    if (existingType) {
      return null;
    }
    return {
      rental_reservation_type_id: record.Id,
      name: record.Name,
      description: record.Description || '',
      background_color: record.BackgroundColor || '#FFFFFF',
      text_color: record.TextColor || '#000000',
      order_index: record.OrderIndex,

      organization_id: organizationId
    };
  };

  eventCategoryJSON = async (record: IEventCategoryJSON, organizationId: mongoose.Types.ObjectId) => {
    const existingCategory = await EventCategory.findOne({ event_category_id: record.Id, organization_id: organizationId });
    if (existingCategory) {
      return null;
    }
    return {
      event_category_id: record.Id,
      name: record.Name,
      background_color: record.BackgroundColor || '#FFFFFF',
      text_color: record.TextColor || '#000000',
      is_public: !!record.IsPublic,

      organization_id: organizationId
    };
  };

  reservationJSON = async (record: IReservationJSON, organizationId: mongoose.Types.ObjectId) => {
    const existingReservation = await Reservation.findOne({ rental_reservation_id: record.Id, organization_id: organizationId });
    if (existingReservation) {
      return null;
    }
    let courtIds: mongoose.Types.ObjectId[] = [];
    const courts = record.Courts?.split(',') || [];
    for (const court of courts) {
      const _court = court.trim();
      let courtId = await importCacheService.findCourtByLabel(_court, organizationId);
      if (!courtId && _court) {
        const newCourt = await Court.create({
          label: _court,
          type_name: 'REDACTED',

          organization_id: organizationId
        });
        courtId = newCourt._id as mongoose.Types.ObjectId;
      }
      courtIds.push(courtId!);
    }
    let reservationTypeId = await importCacheService.findReservationType(record.ReservationTypeId, organizationId);
    if (!reservationTypeId && record.ReservationTypeId) {
      const newReservationType = await ReservationType.create({
        rental_reservation_type_id: record.ReservationTypeId,
        name: record.ReservationTypeName || 'REDACTED',

        organization_id: organizationId
      });
      reservationTypeId = newReservationType._id as mongoose.Types.ObjectId;
    }

    const playerIds: mongoose.Types.ObjectId[] = [];
    if (record.Players) {
      for (const player of record.Players) {
        let memberId = await importCacheService.findMember(player.OrganizationMemberId, organizationId);
        if (!memberId && player.OrganizationMemberId) {
          const newMember = await Member.create({
            member_id: player.OrganizationMemberId,
            first_name: player.FirstName || 'REDACTED',
            last_name: player.LastName || 'REDACTED',
            email: player.Email || 'REDACTED',
            phone: player.Phone || 'REDACTED',

            organization_id: organizationId
          });
          memberId = newMember._id as mongoose.Types.ObjectId;
        }
        const newPlayer = await ReservationPlayer.create({
          member_id: memberId,
          price_to_pay: player.PriceToPay,
          paid_amount: player.PaidAmount,
          unsubscribe_from_marketing_emails: player.UnsubscribeFromMarketingEmails,
          unsubscribe_from_marketing_text_alerts: player.UnsubscribeFromMarketingTextAlerts,

          organization_id: organizationId
        });
        playerIds.push(newPlayer._id as mongoose.Types.ObjectId);
      }
    }
    return {
      rental_reservation_id: record.Id,
      court_ids: courtIds,
      reservation_type_id: reservationTypeId,
      instructors: record.Instructors || '',
      is_lesson: !!record.IsLesson,
      start_time: formatDate(record.StartTime),
      end_time: formatDate(record.EndTime),
      status: record.CancelledOn ? 'Cancelled' : 'Active',
      cancelled_on: formatDate(record.CancelledOn),
      player_ids: playerIds,
      created_at: formatDate(record.CreatedOnUtc),
      updated_at: formatDate(record.UpdatedOnUtc),
      user_defined_fields: record.UserDefinedFields || null,

      organization_id: organizationId
    };
  };

  playerReportJSON = async (record: IPlayerReportJSON, organizationId: mongoose.Types.ObjectId) => {
    const report_id = `${record.ReservationMemberId || 0}_${record.ReservationId || 0}`;
    const existingReport = await PlayerReport.findOne({ report_id, organization_id: organizationId });
    if (existingReport) {
      return null;
    }
    let court_ids: mongoose.Types.ObjectId[] = [];
    for (const court of record.CourtData) {
      let courtId = await importCacheService.findCourt(court.CourtId, organizationId);
      if (!courtId && court.CourtId) {
        const newCourt = await Court.create({
          id: court.CourtId,
          label: court.CourtName || 'REDACTED',
          type_name: court.CourtTypeName || 'REDACTED',

          organization_id: organizationId
        });
        courtId = newCourt._id as mongoose.Types.ObjectId;
      }
      court_ids.push(courtId!);
    }
    let memberId = await importCacheService.findMember(record.OrganizationMemberId, organizationId);
    if (!memberId && record.OrganizationMemberId) {
      const newMember = await Member.create({
        member_id: record.OrganizationMemberId,
        first_name: record.MemberFirstName || 'REDACTED',
        last_name: record.MemberLastName || 'REDACTED',
        email: record.MemberEmail || 'REDACTED',

        organization_id: organizationId
      });
      memberId = newMember._id as mongoose.Types.ObjectId;
    }
    const reservationId = await importCacheService.findReservation(record.ReservationId, organizationId);
    return {
      report_id: report_id,
      member_id: memberId,
      start_date_time: formatDate(record.StartDateTime),
      end_date_time: formatDate(record.EndDateTime),
      created_on_utc: formatDate(record.CreatedOnUtc),
      is_cancelled: record.IsCancelled,
      is_approved: record.IsApproved,
      cancelled_on_utc: formatDate(record.CancelledOnUtc),
      reservation_member_id: record.ReservationMemberId,
      court_ids: court_ids,
      booking_type: record.BookingType,
      event_name: record.EventName,
      type_name: record.TypeName,
      reservation_id: reservationId,

      organization_id: organizationId
    };
  };

  salesSummaryJSON = async (record: ISalesSummaryJSON, organizationId: mongoose.Types.ObjectId) => {
    const existingCategory = await SalesSummary.findOne({
      organization_transaction_id: record.TransactionId,
      organization_id: organizationId
    });
    if (existingCategory) {
      return null;
    }
    let memberId = await importCacheService.findMember(record.OrgMemberId, organizationId);
    if (!memberId && record.OrgMemberId) {
      const newMember = await Member.create({
        member_id: record.OrgMemberId,
        first_name: record.MemberFullName || 'REDACTED',
        last_name: record.MemberFullName || 'REDACTED',
        email: 'REDACTED',

        organization_id: organizationId
      });
      memberId = newMember._id as mongoose.Types.ObjectId;
    }
    let familyId = await importCacheService.findFamily(record.OrgMemberFamilyId, organizationId);
    if (!familyId && record.OrgMemberFamilyId) {
      const newFamily = await Family.create({
        family_id: record.OrgMemberFamilyId,
        name: record.FamilyName || 'REDACTED',

        organization_id: organizationId
      });
      familyId = newFamily._id as mongoose.Types.ObjectId;
    }
    return {
      transaction_id: record.TransactionId,
      transaction_date: formatDate(record.TransactionDate),
      paid_date: record.PaidDate ? formatDate(record.PaidDate) : null,
      item_cost: record.ItemCost,
      fee_category_name: record.FeeCategoryName,
      item_name: record.ItemName,
      revenue_category_name: record.RevenueCategoryName,
      amount: record.Amount,
      amount_with_no_tax: record.AmountWithNoTax,
      tax_total: record.TaxTotal,
      member_id: memberId,
      family_id: familyId,
      start: formatDate(record.Start),
      end: formatDate(record.End),
      court_labels: record.CourtLabels,
      payment_type: record.PaymentType,
      transaction_type: record.TransactionType || 'Unknown',
      instructor_names: record.InstructorNames || 'Unknown',
      membership_name: record.MembershipName || 'Unknown',

      organization_id: organizationId
    };
  };

  transactionJSON = async (record: ITransactionJSON, organizationId: mongoose.Types.ObjectId) => {
    const existingTransaction = await Transaction.findOne({ transaction_id: record.TransactionId, organization_id: organizationId });
    if (existingTransaction) {
      return null;
    }
    let memberId = await importCacheService.findMember(record.OrganizationMemberId, organizationId);
    if (!memberId && record.OrganizationMemberId) {
      const newMember = await Member.create({
        member_id: record.OrganizationMemberId,
        first_name: record.OrganizationFirstName || 'REDACTED',
        last_name: record.OrganizationLastName || 'REDACTED',
        email: record.OrganizationMemberEmail || 'REDACTED',

        organization_id: organizationId
      });
      memberId = newMember._id as mongoose.Types.ObjectId;
    }
    return {
      transaction_id: record.TransactionId,
      member_id: memberId,
      transaction_date: formatDate(record.TransactionDate),
      paid_date: formatDate(record.PaidOn),
      is_paid: !!record.PaidOn,
      subtotal: record.Subtotal,
      tax_total: record.TaxTotal,
      total: record.Total,
      unpaid_amount: record.UnpaidAmount,
      category: record.Category,
      reservation_start: formatDate(record.ReservationStart),
      reservation_end: formatDate(record.ReservationEnd),
      account_creation_date: formatDate(record.AccountCreationDate),
      payment_type: record.PaymentType || 'Unknown',
      transaction_type: record.TransactionType || 'Unknown',
      instructors: record.Instructors || 'Unknown',

      organization_id: organizationId
    };
  };

  eventRegistrationJSON = async (record: IEventRegistrationJSON, organizationId: mongoose.Types.ObjectId) => {
    const existingRegistration = await EventRegistration.findOne({ event_date_id: record.EventDateId, organization_id: organizationId });
    if (existingRegistration) {
      return null;
    }
    let eventId = await importCacheService.findEvent(record.EventId, organizationId);
    if (!eventId && record.EventId) {
      const newEvent = await Event.create({
        event_id: record.EventId,
        name: record.EventName || 'REDACTED',

        organization_id: organizationId
      });
      eventId = newEvent._id as mongoose.Types.ObjectId;
    }
    let eventCategoryId = await importCacheService.findEventCategory(record.EventCategoryId, organizationId);
    if (!eventCategoryId && record.EventCategoryId) {
      const newCategory = await EventCategory.create({
        event_category_id: record.EventCategoryId,
        name: record.EventCategoryName || 'REDACTED',

        organization_id: organizationId
      });
      eventCategoryId = newCategory._id as mongoose.Types.ObjectId;
    }
    let memberId = await importCacheService.findMember(record.OrganizationMemberId, organizationId);
    if (!memberId && record.OrganizationMemberId) {
      const newMember = await Member.create({
        member_id: record.OrganizationMemberId,
        first_name: record.FirstName || 'REDACTED',
        last_name: record.LastName || 'REDACTED',
        email: record.Email || 'REDACTED',
        phone: record.Phone || 'REDACTED',

        organization_id: organizationId
      });
      memberId = newMember._id as mongoose.Types.ObjectId;
    }
    return {
      event_id: eventId,
      event_category_id: eventCategoryId,
      member_id: memberId,
      event_name: record.EventName,
      event_date_id: record.EventDateId,
      start_time: formatDate(record.StartTime),
      end_time: formatDate(record.EndTime),
      price_to_pay: record.PriceToPay,
      paid_amount: record.PaidAmount,
      unsubscribe_from_marketing_emails: record.UnsubscribeFromMarketingEmails,
      unsubscribe_from_marketing_text_alerts: record.UnsubscribeFromMarketingTextAlerts,
      signed_up_on_utc: formatDate(record.SignedUpOnUtc),
      cancelled_on_utc: formatDate(record.CancelledOnUtc),

      organization_id: organizationId
    };
  };

  salesSummaryCSV = async (record: ISalesSummaryCSV, organizationId: mongoose.Types.ObjectId) => {
    const existingCategory = await SalesSummary.findOne({
      organization_transaction_id: record.TransactionId,
      organization_id: organizationId
    });
    if (existingCategory) {
      return null;
    }
    let memberId = await importCacheService.findMember(record.OrgMemberId, organizationId);
    if (!memberId && record.OrgMemberId) {
      const newMember = await Member.create({
        member_id: record.OrgMemberId,
        first_name: 'REDACTED',
        last_name: 'REDACTED',
        email: 'REDACTED',

        organization_id: organizationId
      });
      memberId = newMember._id as mongoose.Types.ObjectId;
    }
    let familyId = await importCacheService.findFamily(record.OrgMemberFamilyId, organizationId);
    if (!familyId && record.OrgMemberFamilyId) {
      const newFamily = await Family.create({
        family_id: record.OrgMemberFamilyId,
        name: 'REDACTED',

        organization_id: organizationId
      });
      familyId = newFamily._id as mongoose.Types.ObjectId;
    }
    return {
      transaction_id: record.TransactionId,
      transaction_date: formatDate(record.TransactionDate),
      paid_date: record.PaidDate ? formatDate(record.PaidDate) : null,
      item_cost: record.ItemCost,
      fee_category_name: record.FeeCategoryName,
      item_name: record.ItemName,
      revenue_category_name: record.RevenueCategoryName,
      amount: record.Amount,
      amount_with_no_tax: record.AmountWithNoTax,
      tax_total: record.TaxTotal,
      member_id: memberId,
      family_id: familyId,
      start: formatDate(record.Start),
      end: formatDate(record.End),
      court_labels: record.CourtLabels,
      payment_type: record.PaymentType,
      transaction_type: record.TransactionType || 'Unknown',
      instructor_names: 'Unknown',
      membership_name: record.MembershipName || 'Unknown',

      organization_id: organizationId
    };
  };

  transactionCSV = async (record: ITransactionCSV, organizationId: mongoose.Types.ObjectId) => {
    const existingTransaction = await Transaction.findOne({ transaction_id: record.TransactionId, organization_id: organizationId });
    if (existingTransaction) {
      return null;
    }
    let memberId = await importCacheService.findMember(record.OrganizationMemberId, organizationId);
    if (!memberId && record.OrganizationMemberId) {
      const newMember = await Member.create({
        member_id: record.OrganizationMemberId,
        first_name: record.OrganizationFirstName || 'REDACTED',
        last_name: record.OrganizationLastName || 'REDACTED',
        email: record.OrganizationMemberEmail || 'REDACTED',
        phone: record.OrganizationMemberPhone || 'REDACTED',
        organization_id: organizationId,
        created_at: formatDate(record.AccountCreationDate)
      });
      memberId = newMember._id as mongoose.Types.ObjectId;
    }
    return {
      transaction_id: record.TransactionId,
      member_id: memberId,
      transaction_date: formatDate(record.TransactionDate),
      paid_date: formatDate(record.PainOn),
      is_paid: !!record.PainOn,
      subtotal: record.Subtotal,
      tax_total: record.TaxTotal,
      total: record.Total,
      unpaid_amount: record.UnpaidAmount,
      category: record.Category,
      reservation_start: formatDate(record.ReservationStart),
      reservation_end: formatDate(record.ReservationEnd),
      account_creation_date: formatDate(record.AccountCreationDate),
      payment_type: record.PaymentType || 'Unknown',
      transaction_type: record.TransactionType || 'Unknown',
      instructors: record.Instructors || 'Unknown',

      organization_id: organizationId
    };
  };

  membershipTypeCSV = async (record: IMembershipTypeCSV, organizationId: mongoose.Types.ObjectId) => {
    const existingType = await MembershipType.findOne({ membership_type_id: record.Id, organization_id: organizationId });
    if (existingType) {
      return null;
    }
    return {
      membership_type_id: record.Id,
      name: record.Name,
      order_index: record.OrderIndex,
      description: record.Description || '',
      short_code: record.ShortCode || '',
      is_active: record.IsActive === 'True',
      is_payment_required: record.IsPaymentRequired === 'True',
      purchase_start_date: formatDate(record.MembershipPurchaseStartDate),
      purchase_end_date: formatDate(record.MembershipPurchaseEndDate),
      is_restrict_by_age: record.IsRestrictByAge === 'True',
      allow_min_age: record.AllowMinAge || null,
      allow_max_age: record.AllowMaxAge || null,
      days_past_due_to_suspend: record.XDaysPastDueToSuspendAccount || null,
      days_past_due_to_cancel: record.XDaysPastDueToAutoCancelMembership || null,
      initiation_price: record.InitiationPrice || null,
      monthly_price: record.MonthlyMembershipPrice || null,
      quarterly_price: record.QuarterMembershipPrice || null,
      annual_price: record.AnnualMembershipPrice || null,
      lifetime_price: record.LifetimeMembershipPrice || null,
      custom_price: record.CustomMembershipPrice || null,
      custom_frequency_value: record.CustomFrequencyUnitValue || null,
      cost_type_additional_features: record.CostTypeAdditionalFeatureJson || null,

      organization_id: organizationId
    };
  };

  courtCSV = async (record: ICourtCSV, organizationId: mongoose.Types.ObjectId) => {
    const existingCourt = await Court.findOne({ court_id: record.Id, organization_id: organizationId });
    if (existingCourt) {
      return null;
    }
    return {
      court_id: record.Id,
      order_index: record.OrderIndex,
      label: record.Label || 'REDACTED',
      type_name: record.TypeName || 'REDACTED',

      organization_id: organizationId
    };
  };

  reservationTypeCSV = async (record: IReservationTypeCSV, organizationId: mongoose.Types.ObjectId) => {
    const existingType = await ReservationType.findOne({ rental_reservation_type_id: record.Id, organization_id: organizationId });
    if (existingType) {
      return null;
    }
    return {
      rental_reservation_type_id: record.Id,
      name: record.Name,
      background_color: record.BackgroundColor || '#FFFFFF',
      text_color: record.TextColor || '#000000',
      order_index: record.OrderIndex,

      organization_id: organizationId
    };
  };

  eventCategoryCSV = async (record: IEventCategoryCSV, organizationId: mongoose.Types.ObjectId) => {
    const existingCategory = await EventCategory.findOne({ event_category_id: record.Id, organization_id: organizationId });
    if (existingCategory) {
      return null;
    }
    return {
      event_category_id: record.Id,
      name: record.Name,
      background_color: record.BackgroundColor || '#FFFFFF',
      text_color: record.TextColor || '#000000',
      is_public: record.IsPublic === 'True',

      organization_id: organizationId
    };
  };

  familyCSV = async (record: IFamilyCSV, organizationId: mongoose.Types.ObjectId) => {
    const existingFamily = await Family.findOne({ family_id: record.OrganizationMemberFamilyId, organization_id: organizationId });
    if (existingFamily) {
      return null;
    }
    return {
      family_id: record.OrganizationMemberFamilyId,
      name: record.FamilyName,
      family_number: record.FamilyNumber,

      organization_id: organizationId
    };
  };

  memberCSV = async (record: IMemberCSV, organizationId: mongoose.Types.ObjectId) => {
    const existingMember = await Member.findOne({ member_id: record.OrganizationMemberId, organization_id: organizationId });
    if (existingMember) {
      return null;
    }
    let familyId = await importCacheService.findFamily(record.OrganizationMemberFamilyId, organizationId);
    if (!familyId && record.OrganizationMemberFamilyId) {
      const newFamily = await Family.create({
        family_id: record.OrganizationMemberFamilyId,
        name: 'REDACTED',

        organization_id: organizationId
      });
      familyId = newFamily._id as mongoose.Types.ObjectId;
    }
    let membershipTypeId = await importCacheService.findMembershipType(record.MembershipTypeId, organizationId);
    if (!membershipTypeId && record.MembershipTypeId) {
      const newMembershipType = await MembershipType.create({
        membership_type_id: record.MembershipTypeId,
        name: record.MembershipTypeName || 'REDACTED',

        organization_id: organizationId
      });
      membershipTypeId = newMembershipType._id as mongoose.Types.ObjectId;
    }
    return {
      member_id: record.OrganizationMemberId,
      family_id: familyId,
      first_name: record.FirstName || 'REDACTED',
      last_name: record.LastName || 'REDACTED',
      gender: record.Gender || 'REDACTED',
      email: record.Email || 'REDACTED',
      phone: record.PhoneNumber || '',
      date_of_birth: formatDate(record.DateOfBirth),
      address: record.Address,
      city: record.City,
      state: record.State,
      zip_code: record.ZipCode,
      membership_assignment_type: record.MembershipAssignmentType,
      membership_status: record.MembershipStatus,
      family_role: record.FamilyRole,
      allow_child_login: record.AllowChildToLoginAndUseBookingPrivileges === 'True',
      membership_start_date: formatDate(record.MembershipStartDate),
      membership_end_date: formatDate(record.MembershipEndDate),
      membership_type_id: membershipTypeId,
      profile_image_url: record.ProfileImageUrl || null,
      user_defined_fields: record.UserDefinedFields || null,
      ratings: record.Ratings,
      external_id: record.ExternalId,

      organization_id: organizationId
    };
  };

  eventCSV = async (record: IEventCSV, organizationId: mongoose.Types.ObjectId) => {
    const existingEvent = await Event.findOne({
      event_id: record.EventId,
      start_date: record.StartDateTime,
      end_date: record.EndDateTime,
      organization_id: organizationId
    });
    if (existingEvent) {
      return null;
    }
    let categoryId = await importCacheService.findEventCategory(record.EventCategoryId, organizationId);
    if (!categoryId && record.EventCategoryId) {
      const newCategory = await EventCategory.create({
        event_category_id: record.EventCategoryId,
        name: record.EventCategoryName || 'REDACTED',

        organization_id: organizationId
      });
      categoryId = newCategory._id as mongoose.Types.ObjectId;
    }
    const reservationId = await importCacheService.findReservation(record.ReservationId, organizationId);
    return {
      event_id: record.EventId,
      category_id: categoryId,
      reservation_id: reservationId,
      name: record.EventName,
      start_date: formatDate(record.StartDateTime),
      end_date: formatDate(record.EndDateTime),
      background_color: record.BackgroundColor || '#FFFFFF',
      is_registered: record.IsRegistered === 'True',
      sso_url: record.SsoUrl || '',
      image_url: record.ImageUrl || '',
      max_registrants: record.MaxRegistrants || 0,
      registered_count: record.RegisteredCount || 0,

      organization_id: organizationId
    };
  };

  eventRegistrationCSV = async (record: IEventRegistrationCSV, organizationId: mongoose.Types.ObjectId) => {
    const existingRegistration = await EventRegistration.findOne({ event_date_id: record.EventDateId, organization_id: organizationId });
    if (existingRegistration) {
      return null;
    }
    let eventId = await importCacheService.findEvent(record.EventId, organizationId);
    if (!eventId && record.EventId) {
      const newEvent = await Event.create({
        event_id: record.EventId,
        name: record.EventName || 'REDACTED',

        organization_id: organizationId
      });
      eventId = newEvent._id as mongoose.Types.ObjectId;
    }
    let eventCategoryId = await importCacheService.findEventCategory(record.EventCategoryId, organizationId);
    if (!eventCategoryId && record.EventCategoryId) {
      const newCategory = await EventCategory.create({
        event_category_id: record.EventCategoryId,
        name: record.EventCategoryName || 'REDACTED',

        organization_id: organizationId
      });
      eventCategoryId = newCategory._id as mongoose.Types.ObjectId;
    }
    let memberId = await importCacheService.findMember(record.OrganizationMemberId, organizationId);
    if (!memberId && record.OrganizationMemberId) {
      const newMember = await Member.create({
        member_id: record.OrganizationMemberId,
        first_name: record.FirstName || 'REDACTED',
        last_name: record.LastName || 'REDACTED',
        email: record.Email || 'REDACTED',
        phone: record.Phone || 'REDACTED',

        organization_id: organizationId
      });
      memberId = newMember._id as mongoose.Types.ObjectId;
    }
    return {
      event_id: eventId,
      event_category_id: eventCategoryId,
      member_id: memberId,
      event_name: record.EventName,
      event_date_id: record.EventDateId,
      start_time: formatDate(record.StartTime),
      end_time: formatDate(record.EndTime),
      price_to_pay: record.PriceToPay,
      paid_amount: record.PaidAmount,
      unsubscribe_from_marketing_emails: record.UnsubscribeFromMarketingEmails === 'True',
      unsubscribe_from_marketing_text_alerts: record.UnsubscribeFromMarketingTextAlerts === 'True',
      signed_up_on_utc: formatDate(record.SignedUpOnUtc),
      cancelled_on_utc: formatDate(record.CancelledOnUtc),

      organization_id: organizationId
    };
  };

  playerReportCSV = async (record: IPlayerReportCSV, organizationId: mongoose.Types.ObjectId) => {
    const report_id = `${record.ReservationMemberId || 0}_${record.ReservationId || 0}`;
    const existingReport = await PlayerReport.findOne({ report_id, organization_id: organizationId });
    if (existingReport) {
      return null;
    }
    let court_ids: mongoose.Types.ObjectId[] = [];
    for (const court of record.CourtData) {
      let courtId = await importCacheService.findCourt(court.CourtId, organizationId);
      if (!courtId && court.CourtId) {
        const newCourt = await Court.create({
          id: court.CourtId,
          label: court.CourtName || 'REDACTED',
          type_name: court.CourtTypeName || 'REDACTED',

          organization_id: organizationId
        });
        courtId = newCourt._id as mongoose.Types.ObjectId;
      }
      court_ids.push(courtId!);
    }
    let memberId = await importCacheService.findMember(record.OrganizationMemberId, organizationId);
    if (!memberId && record.OrganizationMemberId) {
      const newMember = await Member.create({
        member_id: record.OrganizationMemberId,
        first_name: record.MemberFirstName || 'REDACTED',
        last_name: record.MemberLastName || 'REDACTED',
        email: record.MemberEmail || 'REDACTED',

        organization_id: organizationId
      });
      memberId = newMember._id as mongoose.Types.ObjectId;
    }
    const reservationId = await importCacheService.findReservation(record.ReservationId, organizationId);
    return {
      report_id: report_id,
      member_id: memberId,
      start_date_time: formatDate(record.StartDateTime),
      end_date_time: formatDate(record.EndDateTime),
      created_on_utc: formatDate(record.CreatedOnUtc),
      is_cancelled: record.IsCancelled === 'True',
      is_approved: record.IsApproved === 'True',
      cancelled_on_utc: formatDate(record.CancelledOnUtc),
      reservation_member_id: record.ReservationMemberId,
      court_ids: court_ids,
      booking_type: record.BookingType,
      event_name: record.EventName,
      type_name: record.TypeName,
      reservation_id: reservationId,

      organization_id: organizationId
    };
  };

  reservationCSV = async (record: IReservationCSV, organizationId: mongoose.Types.ObjectId) => {
    const existingReservation = await Reservation.findOne({ rental_reservation_id: record.Id, organization_id: organizationId });
    if (existingReservation) {
      return null;
    }
    let courtIds: mongoose.Types.ObjectId[] = [];
    const courts = record.Courts?.split(',') || [];
    for (const court of courts) {
      const _court = court.trim();
      let courtId = await importCacheService.findCourtByLabel(_court, organizationId);
      if (!courtId && _court) {
        const newCourt = await Court.create({
          label: _court,
          type_name: 'REDACTED',

          organization_id: organizationId
        });
        courtId = newCourt._id as mongoose.Types.ObjectId;
      }
      courtIds.push(courtId!);
    }
    let reservationTypeId = await importCacheService.findReservationType(record.ReservationTypeId, organizationId);
    if (!reservationTypeId && record.ReservationTypeId) {
      const newReservationType = await ReservationType.create({
        rental_reservation_type_id: record.ReservationTypeId,
        name: record.ReservationTypeName || 'REDACTED',

        organization_id: organizationId
      });
      reservationTypeId = newReservationType._id as mongoose.Types.ObjectId;
    }

    const playerIds: mongoose.Types.ObjectId[] = [];
    if (record.Players) {
      for (const player of record.Players) {
        let memberId = await importCacheService.findMember(player.OrganizationMemberId, organizationId);
        if (!memberId && player.OrganizationMemberId) {
          const newMember = await Member.create({
            member_id: player.OrganizationMemberId,
            first_name: player.FirstName || 'REDACTED',
            last_name: player.LastName || 'REDACTED',
            email: player.Email || 'REDACTED',
            phone: player.Phone || 'REDACTED',

            organization_id: organizationId
          });
          memberId = newMember._id as mongoose.Types.ObjectId;
        }
        const newPlayer = await ReservationPlayer.create({
          member_id: memberId,
          price_to_pay: player.PriceToPay,
          paid_amount: player.PaidAmount,
          unsubscribe_from_marketing_emails: player.UnsubscribeFromMarketingEmails === 'True',
          unsubscribe_from_marketing_text_alerts: player.UnsubscribeFromMarketingTextAlerts === 'True',

          organization_id: organizationId
        });
        playerIds.push(newPlayer._id as mongoose.Types.ObjectId);
      }
    }
    return {
      rental_reservation_id: record.Id,
      court_ids: courtIds,
      reservation_type_id: reservationTypeId,
      instructors: record.Instructors || '',
      is_lesson: record.IsLesson === 'True',
      start_time: formatDate(record.StartTime),
      end_time: formatDate(record.EndTime),
      status: record.CancelledOn ? 'Cancelled' : 'Active',
      cancelled_on: formatDate(record.CancelledOn),
      player_ids: playerIds,
      created_at: formatDate(record.CreatedOnUtc),
      updated_at: formatDate(record.UpdatedOnUtc),
      user_defined_fields: record.UserDefinedFields || null,

      organization_id: organizationId
    };
  };

  revenueRecognitionCSV = async (record: IRevenueRecognitionCSV, organizationId: mongoose.Types.ObjectId) => {
    const revenueRecognitionId = `${record.OrganizationMemberId}_${record.RelationId}`;
    const existingRecord = await RevenueRecognition.findOne({
      revenue_recognition_id: revenueRecognitionId,
      organization_id: organizationId
    });
    if (existingRecord) {
      return null;
    }
    const feeId = await importCacheService.findTransaction(record.FeeId, organizationId);
    const paymentId = await importCacheService.findTransaction(record.PaymentId, organizationId);
    const relationId = await importCacheService.findTransaction(record.RelationId, organizationId);
    let memberId = await importCacheService.findMember(`${record.OrganizationMemberId}`, organizationId);
    if (!memberId && record.OrganizationMemberId) {
      const newMember = await Member.create({
        member_id: record.OrganizationMemberId,
        first_name: record.MemberFirstName || 'REDACTED',
        last_name: record.MemberLastName || 'REDACTED',
        email: 'REDACTED',

        organization_id: organizationId
      });
      memberId = newMember._id as mongoose.Types.ObjectId;
    }
    return {
      revenue_recognition_id: revenueRecognitionId,
      fee_category: record.FeeCategory,
      subtotal: record.Subtotal,
      tax_total: record.TaxTotal,
      total: record.Total,
      payment_type: record.PaymentType,
      start_date_time: formatDate(record.StartDateTime),
      end_date_time: formatDate(record.EndDateTime),
      paid_date: formatDate(record.PaidDate),
      member_id: memberId,
      description: record.Description,
      additional_dates: record.AdditionalDates ? record.AdditionalDates.map((date) => formatDate(date)).filter(Boolean) : [],
      fee_id: feeId,
      payment_id: paymentId,
      relation_id: relationId,
      transaction_type: record.TransactionType,
      package_info: record.PackageInfo || null,

      organization_id: organizationId
    };
  };

  reservationPlayerCSV = async (record: IReservationPlayerCSV, organizationId: mongoose.Types.ObjectId) => {
    const existingRecord = await ReservationPlayer.findOne({
      reservation_player_id: record.Id,
      organization_id: organizationId
    });
    if (existingRecord) {
      return null;
    }
    let memberId = await importCacheService.findMember(record.OrganizationMemberId, organizationId);
    if (!memberId && record.OrganizationMemberId) {
      const newMember = await Member.create({
        member_id: record.OrganizationMemberId,
        first_name: record.FirstName || 'REDACTED',
        last_name: record.LastName || 'REDACTED',
        email: record.Email || 'REDACTED',
        phone: record.Phone || 'REDACTED',

        organization_id: organizationId
      });
      memberId = newMember._id as mongoose.Types.ObjectId;
    }
    return {
      id: record.Id,

      member_id: memberId,
      price_to_pay: record.PriceToPay,
      paid_amount: record.PaidAmount,
      unsubscribe_from_marketing_emails: record.UnsubscribeFromMarketingEmails === 'True',
      unsubscribe_from_marketing_text_alerts: record.UnsubscribeFromMarketingTextAlerts === 'True',

      organization_id: organizationId
    };
  };
}

export const convertService = new ConvertService();
