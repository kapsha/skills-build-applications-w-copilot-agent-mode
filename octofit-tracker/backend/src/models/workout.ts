import { Schema, model } from "mongoose";

export interface WorkoutDocument {
  title: string;
  focusArea: string;
  durationMinutes: number;
  difficulty: string;
  createdAt: Date;
}

const workoutSchema = new Schema<WorkoutDocument>({
  title: { type: String, required: true },
  focusArea: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
});

export const Workout = model<WorkoutDocument>("Workout", workoutSchema);
