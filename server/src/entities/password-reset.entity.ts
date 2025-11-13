import mongoose, { Document, Schema } from 'mongoose';

export interface IPasswordReset extends Document {
  authId: mongoose.Types.ObjectId;
  token: string;
  createdAt: Date;
  expiresAt: Date;
  isUsed: boolean;
}

const PasswordResetSchema: Schema = new Schema(
  {
    authId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auth',
      required: true
    },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    isUsed: { type: Boolean, default: false }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: false }
  }
);

const PasswordReset = mongoose.model<IPasswordReset>('PasswordReset', PasswordResetSchema);

export default PasswordReset;
