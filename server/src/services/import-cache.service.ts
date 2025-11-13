import Court from '@/entities/court.entity';
import EventCategory from '@/entities/event-category.entity';
import Event from '@/entities/event.entity';
import Family from '@/entities/family.entity';
import Member from '@/entities/member.entity';
import MembershipType from '@/entities/membership-type.entity';
import ReservationType from '@/entities/reservation-type.entity';
import Reservation from '@/entities/reservation.entity';
import Transaction from '@/entities/transaction.entity';
import mongoose from 'mongoose';

export class ImportCacheService {
  transactionCache = new Map<string, mongoose.Types.ObjectId | null>();
  findTransaction = async (
    orgTransactionId: string | number | null,
    organizationId: mongoose.Types.ObjectId
  ): Promise<mongoose.Types.ObjectId | null> => {
    if (!orgTransactionId) return null;
    if (this.transactionCache.has(`${orgTransactionId}`)) {
      return this.transactionCache.get(`${orgTransactionId}`) || null;
    }
    const transaction = await Transaction.findOne({ transaction_id: Number(orgTransactionId), organization_id: organizationId });
    const transactionId = transaction ? (transaction._id as mongoose.Types.ObjectId) : null;
    this.transactionCache.set(`${orgTransactionId}`, transactionId);
    return transactionId;
  };

  memberCache = new Map<string, mongoose.Types.ObjectId | null>();
  findMember = async (
    orgMemberId: string | number | undefined,
    organizationId: mongoose.Types.ObjectId
  ): Promise<mongoose.Types.ObjectId | null> => {
    if (!orgMemberId) return null;
    if (this.memberCache.has(`${orgMemberId}`)) {
      return this.memberCache.get(`${orgMemberId}`) || null;
    }
    const member = await Member.findOne({ member_id: Number(orgMemberId), organization_id: organizationId });
    if (member) {
      this.memberCache.set(`${orgMemberId}`, member._id as mongoose.Types.ObjectId);
      return member._id as mongoose.Types.ObjectId;
    }
    return null;
  };

  familyCache = new Map<string, mongoose.Types.ObjectId | null>();
  findFamily = async (
    orgMemberFamilyId: string | number | undefined,
    organizationId: mongoose.Types.ObjectId
  ): Promise<mongoose.Types.ObjectId | null> => {
    if (!orgMemberFamilyId) return null;
    if (this.familyCache.has(`${orgMemberFamilyId}`)) {
      return this.familyCache.get(`${orgMemberFamilyId}`) || null;
    }
    const family = await Family.findOne({ family_id: Number(orgMemberFamilyId), organization_id: organizationId });
    if (family) {
      this.familyCache.set(`${orgMemberFamilyId}`, family._id as mongoose.Types.ObjectId);
      return family._id as mongoose.Types.ObjectId;
    }
    return null;
  };

  membershipTypeCache = new Map<string, mongoose.Types.ObjectId | null>();
  findMembershipType = async (
    id: string | number | null,
    organizationId: mongoose.Types.ObjectId
  ): Promise<mongoose.Types.ObjectId | null> => {
    if (!id) return null;
    if (this.membershipTypeCache.has(`${id}`)) {
      return this.membershipTypeCache.get(`${id}`) || null;
    }
    const membershipType = await MembershipType.findOne({ membership_type_id: Number(id), organization_id: organizationId });
    if (membershipType) {
      this.membershipTypeCache.set(`${id}`, membershipType._id as mongoose.Types.ObjectId);
      return membershipType._id as mongoose.Types.ObjectId;
    }
    return null;
  };

  eventCategoryCache = new Map<string, mongoose.Types.ObjectId | null>();
  findEventCategory = async (
    categoryId: string | number | null,
    organizationId: mongoose.Types.ObjectId
  ): Promise<mongoose.Types.ObjectId | null> => {
    if (!categoryId) return null;
    if (this.eventCategoryCache.has(`${categoryId}`)) {
      return this.eventCategoryCache.get(`${categoryId}`) || null;
    }
    const category = await EventCategory.findOne({ event_category_id: Number(categoryId), organization_id: organizationId });
    if (category) {
      this.eventCategoryCache.set(`${categoryId}`, category._id as mongoose.Types.ObjectId);
      return category._id as mongoose.Types.ObjectId;
    }
    return null;
  };

  reservationCache = new Map<string, mongoose.Types.ObjectId | null>();
  findReservation = async (
    reservationId: string | number | null,
    organizationId: mongoose.Types.ObjectId
  ): Promise<mongoose.Types.ObjectId | null> => {
    if (!reservationId) return null;
    if (this.reservationCache.has(`${reservationId}`)) {
      return this.reservationCache.get(`${reservationId}`) || null;
    }
    const reservation = await Reservation.findOne({ rental_reservation_id: Number(reservationId), organization_id: organizationId });
    if (reservation) {
      this.reservationCache.set(`${reservationId}`, reservation._id as mongoose.Types.ObjectId);
      return reservation._id as mongoose.Types.ObjectId;
    }
    return null;
  };
  courtCache = new Map<string, mongoose.Types.ObjectId | null>();
  findCourt = async (courtId: string | number | null, organizationId: mongoose.Types.ObjectId): Promise<mongoose.Types.ObjectId | null> => {
    if (!courtId) return null;
    if (this.courtCache.has(`${courtId}`)) {
      return this.courtCache.get(`${courtId}`) || null;
    }
    const court = await Court.findOne({ court_id: Number(courtId), organization_id: organizationId });
    if (court) {
      this.courtCache.set(`${courtId}`, court._id as mongoose.Types.ObjectId);
      return court._id as mongoose.Types.ObjectId;
    }
    return null;
  };
  courtLabelCache = new Map<string, mongoose.Types.ObjectId | null>();
  findCourtByLabel = async (
    courtLabel: string | null,
    organizationId: mongoose.Types.ObjectId
  ): Promise<mongoose.Types.ObjectId | null> => {
    if (!courtLabel) return null;
    if (this.courtLabelCache.has(`${courtLabel}`)) {
      return this.courtLabelCache.get(`${courtLabel}`) || null;
    }
    const court = await Court.findOne({ label: `${courtLabel}`, organization_id: organizationId });
    if (court) {
      this.courtLabelCache.set(`${courtLabel}`, court._id as mongoose.Types.ObjectId);
      return court._id as mongoose.Types.ObjectId;
    }
    return null;
  };

  reservationTypeCache = new Map<string, mongoose.Types.ObjectId | null>();
  findReservationType = async (
    typeId: string | number | null,
    organizationId: mongoose.Types.ObjectId
  ): Promise<mongoose.Types.ObjectId | null> => {
    if (!typeId) return null;
    if (this.reservationTypeCache.has(`${typeId}`)) {
      return this.reservationTypeCache.get(`${typeId}`) || null;
    }
    const reservationType = await ReservationType.findOne({ rental_reservation_type_id: Number(typeId), organization_id: organizationId });
    if (reservationType) {
      this.reservationTypeCache.set(`${typeId}`, reservationType._id as mongoose.Types.ObjectId);
      return reservationType._id as mongoose.Types.ObjectId;
    }
    return null;
  };

  eventCache = new Map<string, mongoose.Types.ObjectId | null>();
  findEvent = async (eventId: string | number | null, organizationId: mongoose.Types.ObjectId): Promise<mongoose.Types.ObjectId | null> => {
    if (!eventId) return null;
    if (this.eventCache.has(`${eventId}`)) {
      return this.eventCache.get(`${eventId}`) || null;
    }
    const event = await Event.findOne({ event_id: Number(eventId), organization_id: organizationId });
    if (event) {
      this.eventCache.set(`${eventId}`, event._id as mongoose.Types.ObjectId);
      return event._id as mongoose.Types.ObjectId;
    }
    return null;
  };
}

export const importCacheService = new ImportCacheService();
