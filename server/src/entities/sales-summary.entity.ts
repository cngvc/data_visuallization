import mongoose, { Document, Schema } from 'mongoose';

export interface ISalesSummary extends Document {
  transaction_id: number;
  fee_category_name: string;
  item_name: string;
  revenue_category_name: string;
  amount: number;
  amount_with_no_tax: number;
  tax_total: number;
  member_id: mongoose.Types.ObjectId | null;
  family_id?: mongoose.Types.ObjectId | null;
  start: Date;
  end: Date;
  court_labels: string;
  payment_type: string;
  transaction_type: string;
  transaction_date: Date;
  paid_date: Date;
  item_cost: number;
  instructor_names: string;
  membership_name: string;

  organization_id: mongoose.Types.ObjectId;
}

const SalesSummarySchema: Schema = new Schema(
  {
    transaction_id: { type: String },
    fee_category_name: { type: String },
    item_name: { type: String },
    revenue_category_name: { type: String },
    amount: { type: Number, default: 0 },
    amount_with_no_tax: { type: Number, default: 0 },
    tax_total: { type: Number, default: 0 },
    member_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      default: null
    },
    family_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Family',
      default: null
    },
    start: { type: Date },
    end: { type: Date },
    court_labels: { type: String },
    payment_type: { type: String },
    transaction_type: { type: String },
    transaction_date: { type: Date },
    paid_date: { type: Date },
    item_cost: { type: Number },
    instructor_names: { type: String },
    membership_name: { type: String },

    organization_id: { type: mongoose.Types.ObjectId, ref: 'Organization' }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export const SalesSummary = mongoose.model<ISalesSummary>('SalesSummary', SalesSummarySchema, 'sales_summary');

export default SalesSummary;
