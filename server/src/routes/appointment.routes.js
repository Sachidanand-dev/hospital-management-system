import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  getMyAppointments,
  updateAppointmentStatus,
} from "../controllers/appointment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, bookAppointment);
router.get("/", authMiddleware, getMyAppointments);
router.patch("/:id/cancel", authMiddleware, cancelAppointment);
router.patch("/:id/status", authMiddleware, updateAppointmentStatus);

export default router;
