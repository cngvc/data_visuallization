import mongoose, { Document, Schema } from 'mongoose';

export interface IEventCategory extends Document {
  event_category_id?: number;
  name: string;
  background_color: string;
  text_color: string;
  is_public: boolean;

  organization_id: mongoose.Types.ObjectId;
}

const EventCategorySchema: Schema = new Schema(
  {
    event_category_id: { type: Number },
    name: { type: String, required: true },
    background_color: { type: String },
    text_color: { type: String },
    is_public: { type: Boolean, default: true },

    organization_id: { type: mongoose.Types.ObjectId, ref: 'Organization' }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const EventCategory = mongoose.model<IEventCategory>('EventCategory', EventCategorySchema);

export default EventCategory;
