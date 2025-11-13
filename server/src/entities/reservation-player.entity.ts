import { ITimeStamps } from '@/types/custom.type';
import mongoose, { Document, Schema } from 'mongoose';

export interface IReservationPlayer extends Document, ITimeStamps {
  id?: string;
  member_id?: mongoose.Types.ObjectId | null;
  price_to_pay?: number | null;
  paid_amount?: number | null;
  unsubscribe_from_marketing_emails?: boolean;
  unsubscribe_from_marketing_text_alerts?: boolean;

  organization_id: mongoose.Types.ObjectId;
}

const ReservationPlayerSchema: Schema = new Schema(
  {
    id: { type: String },
    member_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
    },
    price_to_pay: { type: Number },
    paid_amount: { type: Number },
    unsubscribe_from_marketing_emails: { type: Boolean },
    unsubscribe_from_marketing_text_alerts: { type: Boolean },
    organization_id: { type: mongoose.Types.ObjectId, ref: 'Organization' }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const ReservationPlayer = mongoose.model<IReservationPlayer>('ReservationPlayer', ReservationPlayerSchema);

export default ReservationPlayer;
