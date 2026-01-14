import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({}, { timestamps: true });

const Analysis = mongoose.model("Analysis", analysisSchema);
