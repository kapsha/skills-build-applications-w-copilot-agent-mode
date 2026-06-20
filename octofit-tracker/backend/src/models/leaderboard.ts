import { Schema, model } from "mongoose";

export interface LeaderboardEntryDocument {
  userId: string;
  userName: string;
  score: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntryDocument>({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() },
});

export const LeaderboardEntry = model<LeaderboardEntryDocument>("LeaderboardEntry", leaderboardEntrySchema);
