import { Schema, model } from "mongoose";

export interface ActivityDocument {
  userId: string;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned: number;
  recordedAt: Date;
}

const activitySchema = new Schema<ActivityDocument>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number },
  caloriesBurned: { type: Number, required: true },
  recordedAt: { type: Date, default: () => new Date() },
});

export const Activity = model<ActivityDocument>("Activity", activitySchema);
