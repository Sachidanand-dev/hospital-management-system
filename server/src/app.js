import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import patientRoutes from "./routes/patient.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";

const app = express();

/* ======================================================
   1️⃣ CORS — MUST BE FIRST (macOS strict)
====================================================== */

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow server-to-server / Postman / mobile apps
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🔥 REQUIRED FOR macOS preflight
// app.options("*", cors());

/* ======================================================
   2️⃣ BODY & COOKIE PARSERS
====================================================== */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ======================================================
   3️⃣ SECURITY
====================================================== */

app.use(
  helmet({
    crossOriginResourcePolicy: false, // IMPORTANT for APIs
  })
);

/* ======================================================
   4️⃣ RATE LIMITING
====================================================== */

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

/* ======================================================
   5️⃣ STATIC FILES
====================================================== */

app.use(express.static("public"));

/* ======================================================
   6️⃣ ROUTES
====================================================== */

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);

/* ======================================================
   7️⃣ HEALTH CHECK
====================================================== */

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/* ======================================================
   8️⃣ GLOBAL ERROR HANDLER
====================================================== */

app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
