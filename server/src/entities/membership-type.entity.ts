import mongoose, { Document, Schema } from 'mongoose';

export interface IMembershipType extends Document {
  membership_type_id?: number;
  name: string;
  order_index: number;
  description: string;
  short_code: string;
  is_active: boolean;
  is_payment_required: boolean;
  purchase_start_date: Date | null;
  purchase_end_date: Date | null;
  is_restrict_by_age?: boolean;
  allow_min_age: number | null;
  allow_max_age: number | null;
  days_past_due_to_suspend?: number | null;
  days_past_due_to_cancel?: number | null;
  initiation_price: number | null;
  monthly_price: number | null;
  quarterly_price: number | null;
  annual_price: number | null;
  lifetime_price: number | null;
  custom_price: number | null;
  custom_frequency_value: string | null;
  cost_type_additional_features?: any;
  created_at: Date;
  updated_at: Date;

  organization_id: mongoose.Types.ObjectId;
}

const MembershipTypeSchema: Schema = new Schema(
  {
    membership_type_id: { type: Number },
    name: { type: String, required: true },
    order_index: { type: Number },
    description: { type: String },
    short_code: { type: String },
    is_active: { type: Boolean, default: true },
    is_payment_required: { type: Boolean, default: true },
    purchase_start_date: { type: Date },
    purchase_end_date: { type: Date },
    is_restrict_by_age: { type: Boolean, default: false },
    allow_min_age: { type: Number },
    allow_max_age: { type: Number },
    days_past_due_to_suspend: { type: Number },
    days_past_due_to_cancel: { type: Number },
    initiation_price: { type: Number },
    monthly_price: { type: Number },
    quarterly_price: { type: Number },
    annual_price: { type: Number },
    lifetime_price: { type: Number },
    custom_price: { type: Number },
    custom_frequency_value: { type: String },
    cost_type_additional_features: { type: Schema.Types.Mixed },

    organization_id: { type: mongoose.Types.ObjectId, ref: 'Organization' }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const MembershipType = mongoose.model<IMembershipType>('MembershipType', MembershipTypeSchema);

export default MembershipType;
