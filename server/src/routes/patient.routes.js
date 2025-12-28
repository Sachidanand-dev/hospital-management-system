import express from "express";
import {
  createPatientProfile,
  getPatientProfile,
  updatePatientProfile,
} from "../controllers/patient.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPatientProfile);
router.get("/me", authMiddleware, getPatientProfile);
router.put("/me", authMiddleware, updatePatientProfile);

export default router;
