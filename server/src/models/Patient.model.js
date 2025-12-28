import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    address: String,
    contactNumber: String,
    medicalHistory: [
      {
        condition: String,
        diagnosisDate: Date,
        treatment: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Patient", patientSchema);
