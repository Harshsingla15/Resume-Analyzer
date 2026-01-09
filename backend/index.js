import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

connectDB();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/test/api", (req, res) => {
  res.json("API IS WORKING!");
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
