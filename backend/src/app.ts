import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import statsRoutes from "./routes/stats";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stats", statsRoutes);

app.get("/", (req, res) => res.json({ message: "Chat backend running" }));

app.use(errorHandler);

export default app;
