import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routes/users";
import teamsRouter from "./routes/teams";
import activitiesRouter from "./routes/activities";
import leaderboardRouter from "./routes/leaderboard";
import workoutsRouter from "./routes/workouts";
import { connectDatabase } from "./db";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/workouts", workoutsRouter);

const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const host = "0.0.0.0";

async function startServer() {
  await connectDatabase();

  app.listen(port, host, () => {
    console.log(`OctoFit Tracker API running on http://${host}:${port}`);
    if (codespaceName) {
      console.log(`Codespace API URL: https://${codespaceName}-8000.githubpreview.dev`);
    }
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
