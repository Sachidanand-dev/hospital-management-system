// src/controllers/auth.controller.js
import User from "../models/User.model.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    await User.create({
      name,
      email,
      password: await hashPassword(password),
      role,
    });

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Auto-promote admin
    if (
      process.env.ADMIN_EMAIL &&
      email === process.env.ADMIN_EMAIL &&
      user.role !== "ADMIN"
    ) {
      user.role = "ADMIN";
      await user.save();
    }

    const payload = { id: user._id, role: user.role };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // ✅ FIXED COOKIE SETTINGS (macOS SAFE)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // 🔥 FIX
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const accessToken = generateAccessToken({
      id: decoded.id,
      role: decoded.role,
    });

    res.json({ accessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};




  // // src/controllers/auth.controller.js
  // import User from "../models/User.model.js";
  // import { hashPassword, comparePassword } from "../utils/hash.js";
  // import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
  // import jwt from "jsonwebtoken";

  // export const register = async (req, res) => {
  //   const { name, email, password, role } = req.body;

  //   const exists = await User.findOne({ email });
  //   if (exists) return res.status(400).json({ message: "User already exists" });

  //   const user = await User.create({
  //     name,
  //     email,
  //     password: await hashPassword(password),
  //     role,
  //   });

  //   res.status(201).json({ message: "Registered successfully" });
  // };

  // export const login = async (req, res, next) => {
  //   try {
  //     const { email, password } = req.body;

  //     const user = await User.findOne({ email });
  //     if (!user) {
  //       return res.status(400).json({ message: "Invalid credentials" });
  //     }

  //     const isMatch = await comparePassword(password, user.password);
  //     if (!isMatch) {
  //       return res.status(400).json({ message: "Invalid credentials" });
  //     }

  //     // Auto-promote to ADMIN if email matches env
  //     if (
  //       process.env.ADMIN_EMAIL &&
  //       email === process.env.ADMIN_EMAIL &&
  //       user.role !== "ADMIN"
  //     ) {
  //       user.role = "ADMIN";
  //       await user.save();
  //     }

  //     const payload = { id: user._id, role: user.role };

  //     const accessToken = generateAccessToken(payload);
  //     const refreshToken = generateRefreshToken(payload);

  //     // 🔒 Store refresh token securely
  //     res.cookie("refreshToken", refreshToken, {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === "production",
  //       sameSite: "strict",
  //       maxAge: 7 * 24 * 60 * 60 * 1000,
  //     });

  //     res.json({
  //       accessToken,
  //       user: {
  //         id: user._id,
  //         name: user.name,
  //         role: user.role,
  //       },
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // export const refreshAccessToken = (req, res) => {
  //   const token = req.cookies.refreshToken;

  //   if (!token) {
  //     return res.status(401).json({ message: "No refresh token" });
  //   }

  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

  //     const accessToken = generateAccessToken({
  //       id: decoded.id,
  //       role: decoded.role,
  //     });

  //     res.json({ accessToken });
  //   } catch (err) {
  //     return res.status(403).json({ message: "Invalid refresh token" });
  //   }
  // };
