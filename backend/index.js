import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.route.js";
import resumeRoute from "./routes/resume.route.js";
import dotenv from "dotenv";
dotenv.config();

import { verifyToken } from "./config/verifyToken.js";

connectDB();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

app.get("/test/api", verifyToken, (req, res) => {
  res.json("API IS WORKING!");
});

app.use("/api/auth", authRoute);
app.use("/api/resume", resumeRoute);

app.use((err, req, res, next) => {
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message,
  });
});
