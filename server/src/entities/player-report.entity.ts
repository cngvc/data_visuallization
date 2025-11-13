import mongoose, { Document, Schema } from 'mongoose';
import { ICourt } from './court.entity';

export interface IPlayerReport extends Document {
  report_id: string;
  member_id: mongoose.Types.ObjectId;
  start_date_time: Date;
  end_date_time: Date;
  created_on_utc: Date;
  is_cancelled: boolean;
  is_approved: boolean;
  cancelled_on_utc: Date | null;
  reservation_member_id: number;
  court_ids: mongoose.Types.ObjectId[] | ICourt[];
  booking_type: string;
  reservation_id: mongoose.Types.ObjectId;

  organization_id: mongoose.Types.ObjectId;
}

const PlayerReportSchema: Schema = new Schema(
  {
    report_id: { type: String, description: 'Member report ID: ReservationMemberId_ReservationId' },
    member_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: true
    },
    start_date_time: { type: Date },
    end_date_time: { type: Date },
    created_on_utc: { type: Date },
    cancelled_on_utc: { type: Date, default: null },
    is_cancelled: { type: Boolean, default: false },
    is_approved: { type: Boolean, default: true },
    reservation_member_id: { type: Number },
    court_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Court'
      }
    ],
    booking_type: { type: String },
    reservation_id: { type: Schema.Types.ObjectId, ref: 'Reservation' },
    organization_id: { type: mongoose.Types.ObjectId, ref: 'Organization' }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const PlayerReport = mongoose.model<IPlayerReport>('PlayerReport', PlayerReportSchema);

export default PlayerReport;
