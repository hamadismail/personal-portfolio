import compression from "compression";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { authRouter } from "./modules/auth/auth.routes";
import { userRouter } from "./modules/user/user.routes";
import { blogRouter } from "./modules/blogs/blogs.routes";
import { projectRouter } from "./modules/projects/projects.routes";

dotenv.config();

const app = express();

// Middleware
app.use(compression()); // Compresses response bodies for faster delivery
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies from incoming requests

app.use(
  cors({
    origin: "https://hamad.vercel.app",
    credentials: true,
  })
);



app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/projects", projectRouter);

// Default route for testing
app.get("/", (req, res) => {
  res.send("API is running");
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
