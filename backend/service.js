import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import docRoutes from "./routes/documentRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));
app.use(express.json());

// Debug (optional)
console.log("OpenAI key loaded:", !!process.env.OPENAI_API_KEY);

// Routes
app.use("/api/documents", docRoutes);

// Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
