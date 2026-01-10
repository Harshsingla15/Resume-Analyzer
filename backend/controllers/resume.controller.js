import { uploadOnCloudinary } from "../config/cloudinary.js";
import { errorHandler } from "../config/error.js";
import Resume from "../models/resume.model.js";

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
