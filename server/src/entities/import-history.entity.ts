import mongoose, { Document, Schema } from 'mongoose';

export interface IImportHistory extends Document {
  filename: string;
  collection_name: string;
  record_count: number;
  import_date: Date;
  checksum?: string;
  status: 'success' | 'failed' | 'duplicate';
  error_message?: string;
  metadata?: Record<string, any>;

  organization_id: mongoose.Types.ObjectId;
  uploader_id: mongoose.Types.ObjectId;
}

const ImportHistorySchema: Schema = new Schema(
  {
    filename: { type: String, required: true, index: true },
    collection_name: { type: String, required: true, index: true },
    record_count: { type: Number, default: 0 },
    import_date: { type: Date, default: Date.now },
    checksum: { type: String, index: true },
    status: {
      type: String,
      required: true,
      enum: ['success', 'failed', 'duplicate'],
      default: 'success'
    },
    error_message: { type: String },
    metadata: { type: Schema.Types.Mixed },
    organization_id: { type: mongoose.Types.ObjectId, ref: 'Organization' },
    uploader_id: { type: mongoose.Types.ObjectId, ref: 'Auth' }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

export const ImportHistory = mongoose.model<IImportHistory>('ImportHistory', ImportHistorySchema, 'import_history');

export default ImportHistory;
