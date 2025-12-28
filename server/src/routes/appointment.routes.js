import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  getMyAppointments,
} from "../controllers/appointment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, bookAppointment);
router.get("/", authMiddleware, getMyAppointments);
router.put("/:id/cancel", authMiddleware, cancelAppointment);

export default router;
