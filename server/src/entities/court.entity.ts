import mongoose, { Document, Schema } from 'mongoose';

export interface ICourt extends Document {
  court_id?: number;
  label: string;
  type_name: string;
  order_index: number;

  organization_id: mongoose.Types.ObjectId;
}

const CourtSchema: Schema = new Schema(
  {
    court_id: { type: Number },
    label: { type: String },
    order_index: { type: Number },
    type_name: { type: String },
    organization_id: { type: mongoose.Types.ObjectId, ref: 'Organization' }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const Court = mongoose.model<ICourt>('Court', CourtSchema);

export default Court;
