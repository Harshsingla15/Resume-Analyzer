import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    experienceLevel: {
      type: String,
      required: true,
    },
    atsScore: {
      type: Number,
      required: true,
    },
    suggestions: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Analysis = mongoose.model("Analysis", analysisSchema);

export default Analysis;
