import * as argon2 from 'argon2';
import mongoose, { Document, Schema } from 'mongoose';

export enum UserRoleEnum {
  SUPER_ADMIN = 'super_admin',
  ORG_ADMIN = 'org_admin',
  USER = 'user'
}
export type UserRole = UserRoleEnum.SUPER_ADMIN | UserRoleEnum.USER | UserRoleEnum.ORG_ADMIN;

export interface IAuth extends Document {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
  is_verified: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  current_organization_id?: mongoose.Types.ObjectId;
}

const AuthSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRoleEnum),
      default: UserRoleEnum.USER
    },
    is_verified: {
      type: Boolean,
      default: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    current_organization_id: {
      type: Schema.Types.ObjectId,
      ref: 'Organization'
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
  }
);

AuthSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const password = this.get('password');
    if (typeof password === 'string') {
      this.set('password', await argon2.hash(password));
    }
    next();
  } catch (error) {
    next(error as Error);
  }
});

const Auth = mongoose.model<IAuth>('Auth', AuthSchema);

export default Auth;
