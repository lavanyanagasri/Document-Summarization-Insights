
import OpenAI from "openai";

export const analyzeText = async (text) => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY not loaded");
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `
Analyze the following document and return JSON only.
Do NOT include markdown or explanations.

Return exactly this format:
{
  "summary": "",
  "sentiment": "positive | neutral | negative",
  "keywords": []
}

Text:
${text}
        `
      }
    ],
    temperature: 0.3
  });

  const raw = response.choices[0].message.content.trim();

  // ✅ remove ```json ``` if present
  const cleaned = raw
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};
