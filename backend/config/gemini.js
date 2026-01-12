import { GoogleGenAI } from "@google/genai";
import { errorHandler } from "./error.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const extractText = (response) => {
  return response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
};

export const analyzeResume = async (cleanedText) => {
  if (!cleanedText) {
    throw errorHandler(400, "Resume text is empty!");
  }

  const prompt = `
You are an experienced technical recruiter and ATS expert.

Analyze the resume text below and return ONLY valid JSON in this exact format:
{
  "summary": "string",
  "skills": ["string"],
  "experience_level": "fresher | junior | mid | senior",
  "ats_score": number,
  "suggestions": ["string"]
}

Rules:
- Return valid JSON only
- No markdown
- No explanations
- ats_score between 0 and 100

Resume Text:
"""
${cleanedText}
"""
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: { temperature: 0.2 },
    });

    let text = extractText(response).trim();

    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    // Remove accidental markdown
    text = text.replace(/```json|```/g, "");

    try {
      return JSON.parse(text);
    } catch {
      console.error("Invalid JSON from Gemini:", text);
      throw new Error("AI returned invalid JSON");
    }
  } catch (error) {
    console.error("Gemini analysis failed:", error.message);
    throw errorHandler(500, "Failed to analyze resume with AI");
  }
};
