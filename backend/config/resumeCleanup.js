export const resumeCleanup = (rawText, maxLength = 8000) => {
  if (!rawText) return { cleanedText: "", originalLength: 0, cleanedLength: 0 };
  // Step 1: Save original length
  const originalLength = rawText.length;
  // Step 2: Normalize spaces
  // Replace multiple spaces/tabs with a single space
  let text = rawText.replace(/[ \t]+/g, " ");
  // Step 3: Normalize newlines
  // Replace 3 or more consecutive newlines with 2 newlines
  text = text.replace(/\n{3,}/g, "\n\n");
  // Step 4: Trim each line and remove empty lines or junk lines
  const lines = text
    .split("\n") // split into array of lines
    .map((line) => line.trim()) // trim spaces at start/end
    .filter((line) => {
      if (line === "") return false; // remove empty lines
      if (/^[-_]{3,}$/.test(line)) return false; // remove lines like "----" or "___"
      if (/^page \d+/i.test(line)) return false; // remove page numbers
      return true; // keep everything else
    });
  // Step 5: Join back cleaned lines
  text = lines.join("\n");
  // Step 6: Enforce max length
  if (text.length > maxLength) {
    text = text.slice(0, maxLength);
  }
  // Step 7: Return cleaned text with metadata
  return {
    cleanedText: text,
    originalLength,
    cleanedLength: text.length,
  };
};
