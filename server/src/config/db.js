import mongoose from "mongoose";
import { logSuccess, logError } from "../utils/logger.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logSuccess("MongoDB connected");
  } catch (err) {
    logError(`MongoDB error: ${err.message}`);
    process.exit(1);
  }
};
