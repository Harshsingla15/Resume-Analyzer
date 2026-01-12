import { uploadOnCloudinary } from "../config/cloudinary.js";
import { errorHandler } from "../config/error.js";
import { extractTextFromPdf } from "../config/pdfParse.js";
import { resumeCleanup } from "../config/resumeCleanup.js";
import { analyzeResume } from "../config/gemini.js";
import Resume from "../models/resume.model.js";
import axios from "axios";

export const uploadResume = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return next(errorHandler(400, "Resume file is required!"));
    }
    const response = await uploadOnCloudinary(file.path);
    if (!response) {
      return next(errorHandler(500, "Failed to upload resume"));
    }
    const resume = await Resume.create({
      userId: req.user,
      fileName: file.originalname,
      fileUrl: response.secure_url,
    });
    return res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      resume,
    });
  } catch (error) {
    next(error);
  }
};

const fetchPdfBuffer = async (url) => {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    return Buffer.from(response.data);
  } catch (error) {
    console.error("Failed to fetch PDF:", error.message);
  }
};

export const analyzeResumeController = async (req, res, next) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findById(resumeId);
    if (!resume) return next(errorHandler(404, "Resume not found"));
    const pdfBuffer = await fetchPdfBuffer(resume.fileUrl);
    const response = await extractTextFromPdf(pdfBuffer);
    const rawText = response.text;
    const cleaned = resumeCleanup(rawText).cleanedText;
    const analysis = await analyzeResume(cleaned);
    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    next(error);
  }
};
