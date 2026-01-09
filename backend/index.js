import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.route.js";
import dotenv from "dotenv";
import { verifyToken } from "./config/verifyToken.js";
dotenv.config();

connectDB();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

app.get("/test/api", verifyToken, (req, res) => {
  res.json("API IS WORKING!");
});

app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message,
  });
});
