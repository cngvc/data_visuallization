import mongoose, { Document, Schema } from 'mongoose';

export enum DeviceType {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  BROWSER = 'browser',
  DESKTOP = 'desktop',
  BOT = 'bot',
  UNKNOWN = 'unknown'
}

export interface IKeyToken extends Document {
  authId: mongoose.Types.ObjectId;
  publicKey: string;
  privateKey: string;
  refreshToken?: string;
  deviceName?: string;
  deviceType: DeviceType;
  os?: string;
  browser?: string;
  ipAddress?: string;
  lastUsedAt: Date;
  createdAt: Date;
}

const KeyTokenSchema: Schema = new Schema(
  {
    authId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auth',
      required: true
    },
    publicKey: { type: String, required: true },
    privateKey: { type: String, required: true },
    refreshToken: { type: String },
    deviceName: { type: String },
    deviceType: {
      type: String,
      enum: Object.values(DeviceType),
      default: DeviceType.UNKNOWN
    },
    os: { type: String, default: 'unknown' },
    browser: { type: String, default: 'unknown' },
    ipAddress: { type: String },
    lastUsedAt: { type: Date, default: Date.now }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: false }
  }
);

const KeyToken = mongoose.model<IKeyToken>('KeyToken', KeyTokenSchema);

export default KeyToken;
