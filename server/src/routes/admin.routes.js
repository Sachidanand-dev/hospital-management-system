import express from "express";
import {
  getDashboardStats,
  getAllAppointments,
} from "../controllers/admin.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// protect all routes
router.use(authMiddleware);

// TODO: Add isAdmin middleware if available
router.get("/stats", getDashboardStats);
router.get("/appointments", getAllAppointments);

export default router;
