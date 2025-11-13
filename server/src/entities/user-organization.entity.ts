import mongoose, { Document, Schema } from 'mongoose';
import { UserRoleEnum } from './auth.entity';

export interface IUserOrganization extends Document {
  user_id: mongoose.Types.ObjectId;
  organization_id: mongoose.Types.ObjectId;
  role: UserRoleEnum;
  created_at: Date;
  updated_at: Date;
}

const UserOrganizationSchema: Schema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'Auth',
      required: true
    },
    organization_id: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true
    },
    role: {
      type: String,
      enum: Object.values(UserRoleEnum),
      default: UserRoleEnum.USER,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

UserOrganizationSchema.index({ user_id: 1, organization_id: 1 }, { unique: true });
const UserOrganization = mongoose.model<IUserOrganization>('UserOrganization', UserOrganizationSchema);
export default UserOrganization;
