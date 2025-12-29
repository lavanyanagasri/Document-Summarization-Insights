import Document from "../models/Document.js";
import { analyzeText } from "../services/openaiService.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export const uploadDocument = async (req, res) => {
  let text = "";

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ✅ PDF handling
    if (req.file.mimetype === "application/pdf") {
      try {
        const data = await pdfParse(req.file.buffer);
        text = data.text;
      } catch (err) {
        console.error("PDF PARSE ERROR:", err);
        return res.status(500).json({ message: "PDF parsing failed" });
      }
    } 
    // ✅ TXT handling
    else {
      text = req.file.buffer.toString("utf-8");
    }

    // ✅ Validate extracted text
    if (!text || text.trim().length < 50) {
      return res.status(400).json({ message: "Document too short or empty" });
    }

    // ✅ Save document
    const doc = await Document.create({
      filename: req.file.originalname,
      content: text,
      status: "PROCESSING"
    });

    // ✅ AI analysis
    try {
      const aiResult = await analyzeText(text);
      doc.summary = aiResult.summary;
      doc.sentiment = aiResult.sentiment;
      doc.keywords = aiResult.keywords;
      doc.status = "COMPLETED";
      await doc.save();
    } catch (aiErr) {
      console.error("AI ERROR:", aiErr.message);
      doc.status = "FAILED";
      await doc.save();
    }

    res.json(doc);

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
