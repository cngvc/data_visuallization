import { config } from '@/config';
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
import { convertService } from '@/services/convert.service';
import crypto from 'crypto';
import mongoose from 'mongoose';
import path from 'path';

export const entityModelJSONMap: Record<string, mongoose.Model<any>> = {
  ['courts']: Court,
  ['eventcategories']: EventCategory,
  ['membership_types']: MembershipType,
  ['reservationsreport']: EventRegistration,
  ['eventlist']: Event,
  ['families']: Family,
  ['members']: Member,
  ['playersreport']: PlayerReport,
  ['reservationtypes']: ReservationType,
  ['reservationlist']: Reservation,
  ['revrec']: RevenueRecognition,
  ['salessummary']: SalesSummary,
  ['trans']: Transaction
};

export const entityConvertJSONMap: Record<string, (record: any, organizationId: mongoose.Types.ObjectId) => Promise<any>> = {
  ['courts']: convertService.courtJSON,
  ['eventcategories']: convertService.eventCategoryJSON,
  ['membership_types']: convertService.membershipTypeJSON,
  ['reservationsreport']: convertService.eventRegistrationJSON,
  ['eventlist']: convertService.eventJSON,
  ['families']: convertService.familyJSON,
  ['members']: convertService.memberJSON,
  ['playersreport']: convertService.playerReportJSON,
  ['reservationtypes']: convertService.reservationTypeJSON,
  ['reservationlist']: convertService.reservationJSON,
  ['revrec']: convertService.revenueRecognitionJSON,
  ['salessummary']: convertService.salesSummaryJSON,
  ['trans']: convertService.transactionJSON
};

export const verifyJSONMap: Record<string, string> = {
  ['courts']: 'Court',
  ['eventcategories']: 'EventCategory',
  ['membership_types']: 'MembershipType',
  ['reservationsreport']: 'EventRegistration',
  ['eventlist']: 'Event',
  ['families']: 'Family',
  ['members']: 'Member',
  ['playersreport']: 'PlayerReport',
  ['reservationtypes']: 'ReservationType',
  ['reservationlist']: 'Reservation',
  ['revrec']: 'RevenueRecognition',
  ['salessummary']: 'SalesSummary',
  ['trans']: 'Transaction'
};

// --- CSV logics --- //

export const entityModelCSVMap: Record<string, mongoose.Model<any>> = {
  ['reservation_courts']: Court,
  ['eventcalendar_categories']: EventCategory,
  ['membershiptype']: MembershipType,
  ['eventregistrationreport_list']: EventRegistration,
  ['eventcalendar_eventlist']: Event,
  ['family']: Family,
  ['member_get_members_detail']: Member,
  ['reservationreport_whoisheretoday']: PlayerReport,
  ['reservation_reservationtypes']: ReservationType,
  ['reservationreport_list']: Reservation,
  ['revrec']: RevenueRecognition,
  ['sales_summary']: SalesSummary,
  ['transactions']: Transaction,

  ['reservation_players']: ReservationPlayer
};

export const entityConvertCSVMap: Record<string, (record: any, organizationId: mongoose.Types.ObjectId) => Promise<any>> = {
  ['reservation_courts']: convertService.courtCSV,
  ['eventcalendar_categories']: convertService.eventCategoryCSV,
  ['membershiptype']: convertService.membershipTypeCSV,
  ['eventregistrationreport_list']: convertService.eventRegistrationCSV,
  ['eventcalendar_eventlist']: convertService.eventCSV,
  ['family']: convertService.familyCSV,
  ['member_get_members_detail']: convertService.memberCSV,
  ['reservationreport_whoisheretoday']: convertService.playerReportCSV,
  ['reservation_reservationtypes']: convertService.reservationTypeCSV,
  ['reservationreport_list']: convertService.reservationCSV,
  ['revrec']: convertService.revenueRecognitionCSV,
  ['sales_summary']: convertService.salesSummaryCSV,
  ['transactions']: convertService.transactionCSV,

  ['reservation_players']: convertService.reservationPlayerCSV
};

export const verifyCSVMap: Record<string, string> = {
  ['reservation_courts']: 'Court',
  ['eventcalendar_categories']: 'EventCategory',
  ['membershiptype']: 'MembershipType',
  ['eventregistrationreport_list']: 'EventRegistration',
  ['eventcalendar_eventlist']: 'Event',
  ['family']: 'Family',
  ['member_get_members_detail']: 'Member',
  ['reservationreport_whoisheretoday']: 'PlayerReport',
  ['reservation_reservationtypes']: 'ReservationType',
  ['reservationreport_list']: 'Reservation',
  ['revrec']: 'RevenueRecognition',
  ['sales_summary']: 'SalesSummary',
  ['transactions']: 'Transaction',

  ['reservation_players']: 'ReservationPlayer'
};

export function calculateChecksum(buffer: Buffer): string {
  return crypto.createHash('md5').update(buffer).digest('hex');
}

export const dataDir = config.NODE_ENV === 'development' ? path.join(__dirname, '..', '..', '..', 'data') : '/app/data';
