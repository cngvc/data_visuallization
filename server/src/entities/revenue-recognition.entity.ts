import mongoose, { Document, Schema } from 'mongoose';

export interface IRevenueRecognition extends Document {
  revenue_recognition_id: string;
  fee_category: string;
  subtotal: number;
  tax_total: number;
  total: number;
  payment_type: string;
  start_date_time: Date;
  end_date_time: Date;
  paid_date: Date;
  description: string;
  additional_dates: Date[];
  fee_id: string;
  payment_id: string;
  relation_id: string;
  transaction_type: string;
  package_info: any | null;
  created_at: Date;
  updated_at: Date;

  organization_id: mongoose.Types.ObjectId;
}

const RevenueRecognitionSchema: Schema = new Schema(
  {
    revenue_recognition_id: { type: String },
    fee_category: { type: String },
    subtotal: { type: Number },
    tax_total: { type: Number },
    total: { type: Number },
    payment_type: { type: String },
    start_date_time: { type: Date },
    end_date_time: { type: Date },
    paid_date: { type: Date },
    member_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', describe: 'Member ID' },
    description: { type: String },
    additional_dates: { type: [Date] },
    fee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', describe: 'Transaction ID' },
    payment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', describe: 'Transaction ID' },
    relation_id: { type: String },
    transaction_type: { type: String },
    package_info: { type: Schema.Types.Mixed },

    organization_id: { type: mongoose.Types.ObjectId, ref: 'Organization' }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const RevenueRecognition = mongoose.model<IRevenueRecognition>('RevenueRecognition', RevenueRecognitionSchema);

export default RevenueRecognition;
