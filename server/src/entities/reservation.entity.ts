import mongoose, { Document, Schema } from 'mongoose';
import { ICourt } from './court.entity';
import { IReservationPlayer } from './reservation-player.entity';

export interface IReservation extends Document {
  rental_reservation_id?: number;
  court_ids: mongoose.Types.ObjectId[] | ICourt[];
  reservation_type_id?: mongoose.Types.ObjectId | null;
  instructors?: string;
  is_lesson?: boolean;
  start_time: Date;
  end_time: Date;
  status?: string;
  cancelled_on?: Date | null;
  player_ids?: mongoose.Types.ObjectId[] | IReservationPlayer[];
  user_defined_fields: any;

  organization_id: mongoose.Types.ObjectId;
}

const ReservationSchema: Schema = new Schema(
  {
    rental_reservation_id: { type: Number },
    court_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Court'
      }
    ],
    reservation_type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ReservationType'
    },
    instructors: { type: String },
    is_lesson: { type: Boolean, default: false },
    start_time: { type: Date },
    end_time: { type: Date },
    status: {
      type: String,
      enum: ['Active', 'Cancelled', 'Completed'],
      default: 'Active'
    },
    cancelled_on: { type: Date },
    player_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ReservationPlayer'
      }
    ],
    user_defined_fields: { type: Schema.Types.Mixed },
    organization_id: { type: mongoose.Types.ObjectId, ref: 'Organization' }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const Reservation = mongoose.model<IReservation>('Reservation', ReservationSchema);

export default Reservation;
