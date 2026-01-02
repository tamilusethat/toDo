import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

// Port (Render provides PORT automatically)
const PORT = process.env.PORT || 5000;

// Database connection + server start
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
