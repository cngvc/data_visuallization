import mongoose, { Document, Schema } from 'mongoose';

export interface IReservationType extends Document {
  rental_reservation_type_id?: string;
  name: string;
  background_color: string;
  text_color: string;
  order_index: number;

  organization_id: mongoose.Types.ObjectId;
}

const ReservationTypeSchema: Schema = new Schema(
  {
    rental_reservation_type_id: { type: String },
    name: { type: String },
    background_color: { type: String },
    text_color: { type: String },
    order_index: { type: Number },

    organization_id: { type: mongoose.Types.ObjectId, ref: 'Organization' }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const ReservationType = mongoose.model<IReservationType>('ReservationType', ReservationTypeSchema);

export default ReservationType;
