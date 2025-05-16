import { Schema, model, Document, Types } from 'mongoose';

interface ITask extends Document {
  title: string;
  status: 'pending'|'in-progress'|'done';
  userId: Types.ObjectId;
  completedAt?: Date;
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  status: { type: String, enum: ['pending','in-progress','done'], default: 'pending' },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  completedAt: Date
});
// prevent duplicate titles per user
taskSchema.index({ title: 1, userId: 1 }, { unique: true });

export default model<ITask>('Task', taskSchema);
