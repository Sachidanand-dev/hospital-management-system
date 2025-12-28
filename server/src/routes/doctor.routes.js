import express from "express";
import {
  createDoctorProfile,
  getAllDoctors,
  getDoctorById,
  updateDoctorProfile,
} from "../controllers/doctor.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createDoctorProfile);
router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.put("/", authMiddleware, updateDoctorProfile);

export default router;
