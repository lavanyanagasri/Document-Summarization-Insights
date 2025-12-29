import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  filename: String,
  content: String,
  summary: String,
  sentiment: String,
  keywords: [String],
  status: {
    type: String,
    enum: ["PROCESSING", "COMPLETED", "FAILED"],
    default: "PROCESSING"
  }
}, { timestamps: true });

export default mongoose.model("Document", documentSchema);
