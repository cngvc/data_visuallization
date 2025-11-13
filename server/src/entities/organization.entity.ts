import mongoose, { Document, Schema } from 'mongoose';
import slug from 'slug';

export interface IOrganization extends Document {
  name: string;
  description?: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
}

const OrganizationSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    slug: { type: String }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

OrganizationSchema.index({ slug: 1 }, { unique: true });

OrganizationSchema.pre<IOrganization>('save', async function (next) {
  if (!this.slug) {
    let _slug = slug(this.get('name') as string, { lower: true });
    let counter = 1;
    while (await Organization.findOne({ slug: _slug })) {
      _slug = `${_slug}-${counter}`;
      counter++;
    }
    this.slug = _slug;
  }
  next();
});

const Organization = mongoose.model<IOrganization>('Organization', OrganizationSchema);

export default Organization;
