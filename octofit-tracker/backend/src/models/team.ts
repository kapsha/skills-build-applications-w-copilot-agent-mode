import { Schema, model } from "mongoose";

export interface TeamDocument {
  name: string;
  sport: string;
  members: string[];
  createdAt: Date;
}

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  members: { type: [String], default: [] },
  createdAt: { type: Date, default: () => new Date() },
});

export const Team = model<TeamDocument>("Team", teamSchema);
