import "dotenv/config";
import { connectDatabase } from "../db.ts";
import { User } from "../models/user.ts";
import { Team } from "../models/team.ts";
import { Activity } from "../models/activity.ts";
import { Workout } from "../models/workout.ts";
import { LeaderboardEntry } from "../models/leaderboard.ts";

async function seed() {
  console.log("Seed the octofit_db database with test data");

  await connectDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
  ]);

  const teams = await Team.create([
    { name: "Velocity Vipers", sport: "Running", members: [], createdAt: new Date("2026-06-01") },
    { name: "Core Crushers", sport: "CrossFit", members: [], createdAt: new Date("2026-05-20") },
  ]);

  const users = await User.create([
    { name: "Ava Morgan", email: "ava.morgan@example.com", role: "athlete", teamId: teams[0].id, joinedAt: new Date("2026-05-10") },
    { name: "Leo Patel", email: "leo.patel@example.com", role: "coach", teamId: teams[0].id, joinedAt: new Date("2026-04-15") },
    { name: "Nina Brooks", email: "nina.brooks@example.com", role: "athlete", teamId: teams[1].id, joinedAt: new Date("2026-05-03") },
  ]);

  teams[0].members = [users[0].id, users[1].id];
  teams[1].members = [users[2].id];
  await Promise.all(teams.map((team) => team.save()));

  await Activity.create([
    { userId: users[0].id, type: "Trail Run", durationMinutes: 52, distanceKm: 9.2, caloriesBurned: 820, recordedAt: new Date("2026-06-18T08:15:00Z") },
    { userId: users[0].id, type: "Recovery Ride", durationMinutes: 40, distanceKm: 18.3, caloriesBurned: 410, recordedAt: new Date("2026-06-19T07:30:00Z") },
    { userId: users[2].id, type: "HIIT Session", durationMinutes: 35, caloriesBurned: 500, recordedAt: new Date("2026-06-18T17:00:00Z") },
  ]);

  await Workout.create([
    { title: "Strength Builder", focusArea: "Full Body", durationMinutes: 45, difficulty: "Intermediate", createdAt: new Date("2026-06-05") },
    { title: "Cardio Surge", focusArea: "Endurance", durationMinutes: 30, difficulty: "Beginner", createdAt: new Date("2026-06-10") },
  ]);

  await LeaderboardEntry.create([
    { userId: users[0].id, userName: users[0].name, score: 1520, rank: 1, updatedAt: new Date("2026-06-19T20:00:00Z") },
    { userId: users[2].id, userName: users[2].name, score: 1345, rank: 2, updatedAt: new Date("2026-06-19T20:00:00Z") },
  ]);

  console.log("Seed data inserted successfully.");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Failed to seed database:", error);
  process.exit(1);
});
