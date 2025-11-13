import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  member_id: mongoose.Types.ObjectId | null;
  transaction_type: string;
  payment_type: string;
  reservation_id: mongoose.Types.ObjectId | null;
  event_id: mongoose.Types.ObjectId | null;
  transaction_date: Date;
  is_paid: boolean;
  transaction_id?: number;
  subtotal?: number;
  tax_total?: number;
  total?: number;
  unpaid_amount?: number;
  paid_on?: Date;
  category?: string;
  reservation_start?: Date;
  reservation_end?: Date;
  account_creation_date?: Date;
  instructors?: string;

  organization_id: mongoose.Types.ObjectId;
}

const TransactionSchema: Schema = new Schema(
  {
    member_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      default: null
    },
    transaction_type: {
      type: String,
      default: 'Unknown'
    },
    payment_type: {
      type: String,
      default: 'Unknown'
    },
    reservation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reservation',
      default: null
    },
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      default: null
    },
    transaction_date: { type: Date, default: Date.now },
    is_paid: { type: Boolean, default: false },

    transaction_id: { type: String, index: true },
    subtotal: { type: Number, default: 0 },
    tax_total: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    unpaid_amount: { type: Number, default: 0 },
    paid_on: { type: Date },
    category: { type: String },
    reservation_start: { type: Date },
    reservation_end: { type: Date },
    account_creation_date: { type: Date },
    instructors: { type: String },

    organization_id: { type: mongoose.Types.ObjectId, ref: 'Organization' }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
