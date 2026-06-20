import { Schema, model } from "mongoose";

export interface UserDocument {
  name: string;
  email: string;
  role: string;
  teamId?: string;
  joinedAt: Date;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  teamId: { type: String },
  joinedAt: { type: Date, default: () => new Date() },
});

export const User = model<UserDocument>("User", userSchema);
