import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import {
  getMyProfile,
  updateMyProfile,
  getAllUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

// Logged-in user profile
router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateMyProfile);

// Admin only
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  getAllUsers
);

export default router;
