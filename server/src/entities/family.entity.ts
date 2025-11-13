import mongoose, { Document, Schema } from 'mongoose';

export interface IFamily extends Document {
  name: string;
  number: string;
  created_at: Date;
  updated_at: Date;
  family_id?: string;

  organization_id: mongoose.Types.ObjectId;
}

const FamilySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    number: { type: String },
    family_id: { type: String },
    organization_id: { type: mongoose.Types.ObjectId, ref: 'Organization' }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const Family = mongoose.model<IFamily>('Family', FamilySchema);

export default Family;
