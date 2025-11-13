import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  event_id?: number;
  category_id?: mongoose.Types.ObjectId | null;
  reservation_id?: mongoose.Types.ObjectId | null;
  name: string;
  start_date: Date;
  end_date: Date;
  background_color: string;
  is_registered: boolean;
  sso_url: string;
  image_url: string;
  max_registrants: number;
  registered_count: number;
  created_at: Date;
  updated_at: Date;

  organization_id: mongoose.Types.ObjectId;
}

const EventSchema: Schema = new Schema(
  {
    event_id: { type: Number },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EventCategory'
    },
    reservation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reservation'
    },
    name: { type: String },
    start_date: { type: Date },
    end_date: { type: Date },
    background_color: { type: String },
    is_registered: { type: Boolean },
    sso_url: { type: String },
    image_url: { type: String },
    max_registrants: { type: Number },
    registered_count: { type: Number },

    organization_id: { type: mongoose.Types.ObjectId, ref: 'Organization' }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const Event = mongoose.model<IEvent>('Event', EventSchema);

export default Event;
