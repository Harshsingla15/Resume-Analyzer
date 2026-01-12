import { PDFParse } from "pdf-parse";

export const extractTextFromPdf = async (buffer) => {
  try {
    const parser = new PDFParse({
      data: buffer, // LOCAL FILE
    });

    const result = await parser.getText();
    return {
      text: result.text,
      pages: result.total,
    };
  } catch (error) {
    console.error("PDF parse error:", error.message);
    return null;
  }
};
