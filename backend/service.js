import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import docRoutes from "./routes/documentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

console.log("OpenAI key loaded:", !!process.env.OPENAI_API_KEY);
//console.log("OPENAI KEY:", process.env.OPENAI_API_KEY);

app.use("/api/documents", docRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
