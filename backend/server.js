import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(5000, () =>
      console.log("🚀 Server running on http://localhost:5000")
    );
  })
  .catch(err => console.log(err));
