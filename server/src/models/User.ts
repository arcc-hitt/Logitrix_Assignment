import { Schema, model } from 'mongoose';

interface IUser { name: string; email: string; }

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

export default model<IUser>('User', userSchema);
