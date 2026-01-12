import express from "express";
import upload from "../config/multer.js";
import { verifyToken } from "../config/verifyToken.js";
import {
  uploadResume,
  analyzeResumeController,
} from "../controllers/resume.controller.js";

const router = express.Router();

router.post("/upload", verifyToken, upload.single("resume"), uploadResume);
router.post("/analyze/:resumeId", verifyToken, analyzeResumeController);

export default router;
