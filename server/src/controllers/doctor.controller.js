import Doctor from "../models/Doctor.model.js";
import User from "../models/User.model.js";

export const createDoctorProfile = async (req, res) => {
  const {
    specialization,
    qualifications,
    experience,
    fees,
    hospital,
    availability,
  } = req.body;
  const userId = req.user._id;

  try {
    let doctor = await Doctor.findOne({ user: userId });
    if (doctor) {
      return res.status(400).json({ message: "Doctor profile already exists" });
    }

    doctor = await Doctor.create({
      user: userId,
      specialization,
      qualifications,
      experience,
      fees,
      hospital,
      availability,
    });

    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("user", "name email");
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user._id });
    if (!doctor)
      return res.status(404).json({ message: "Doctor profile not found" });

    const updatedDoctor = await Doctor.findByIdAndUpdate(doctor._id, req.body, {
      new: true,
    });
    res.json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
