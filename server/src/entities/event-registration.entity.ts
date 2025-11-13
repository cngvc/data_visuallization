import mongoose, { Document, Schema } from 'mongoose';

export interface IEventRegistration extends Document {
  event_id?: mongoose.Types.ObjectId | null;
  event_name: string;
  event_category_id?: mongoose.Types.ObjectId | null;
  event_date_id?: number;
  start_time?: Date | null;
  end_time?: Date | null;
  member_id?: mongoose.Types.ObjectId | null;
  price_to_pay: number;
  paid_amount: number;
  unsubscribe_from_marketing_emails?: boolean;
  unsubscribe_from_marketing_text_alerts?: boolean;
  signed_up_on_utc?: Date | null;
  cancelled_on_utc?: Date | null;

  updated_at?: Date | string;
  created_at?: Date | string;

  organization_id: { type: mongoose.Types.ObjectId; ref: 'Organization' };
}

const EventRegistrationSchema: Schema = new Schema(
  {
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    event_name: { type: String },
    event_category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'EventCategory' },
    event_date_id: { type: Number },
    start_time: { type: Date },
    end_time: { type: Date },
    member_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
    price_to_pay: { type: Number },
    paid_amount: { type: Number },
    unsubscribe_from_marketing_emails: { type: Boolean },
    unsubscribe_from_marketing_text_alerts: { type: Boolean },
    signed_up_on_utc: { type: Date },
    cancelled_on_utc: { type: Date },

    organization_id: { type: mongoose.Types.ObjectId, ref: 'Organization' }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const EventRegistration = mongoose.model<IEventRegistration>('EventRegistration', EventRegistrationSchema);

export default EventRegistration;
