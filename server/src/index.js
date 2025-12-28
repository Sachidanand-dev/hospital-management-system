import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { logError, logInfo } from "./utils/logger.js";

connectDB();

app.listen(process.env.PORT || 5000, () => {
  try {
    logInfo(`🚀 Server running on port ${process.env.PORT}`);
  } catch (error) {
    logError(error);
  }
});
