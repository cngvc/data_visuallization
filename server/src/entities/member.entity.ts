import mongoose, { Document, Schema } from 'mongoose';

export interface IMember extends Document {
  reservation_id?: number;
  member_id?: number;
  family_id?: mongoose.Types.ObjectId | null;
  first_name: string;
  last_name: string;
  gender?: string;
  email: string;
  phone: string;
  date_of_birth: Date;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  membership_type_id?: string;
  membership_assignment_type?: string;
  membership_status?: string;
  family_role?: string;
  allow_child_login?: boolean;
  membership_start_date?: Date;
  membership_end_date?: Date | null;
  profile_image_url?: string | null;
  user_defined_fields?: any;
  ratings?: any;
  external_id?: string;

  organization_id: mongoose.Types.ObjectId;
}

const MemberSchema: Schema = new Schema(
  {
    reservation_id: { type: Number },
    member_id: { type: Number },
    family_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Family',
      default: null
    },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    date_of_birth: { type: Date },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zip_code: { type: String },
    membership_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MembershipType', default: null },
    membership_assignment_type: { type: String },
    membership_status: { type: String },
    family_role: { type: String },
    allow_child_login: { type: Boolean, default: false },
    membership_start_date: { type: Date },
    membership_end_date: { type: Date },
    profile_image_url: { type: String },
    user_defined_fields: { type: Schema.Types.Mixed },
    ratings: { type: Schema.Types.Mixed },
    external_id: { type: String },

    organization_id: { type: mongoose.Types.ObjectId, ref: 'Organization' }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const Member = mongoose.model<IMember>('Member', MemberSchema);

export default Member;
