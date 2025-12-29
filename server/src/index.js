import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { logInfo, logError } from "./utils/logger.js";

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  try {
    logInfo(`🚀 Server running on http://localhost:${PORT}`);
  } catch (error) {
    logError(error);
  }
});
