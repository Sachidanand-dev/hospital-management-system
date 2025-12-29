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
    // 1. Get all users with role "DOCTOR"
    const doctorUsers = await User.find({ role: "DOCTOR" }).select(
      "name email _id"
    );

    // 2. Get all doctor profiles
    const doctorProfiles = await Doctor.find().populate("user", "name email");

    // 3. Merge them. ensure every doctorUser is represented.
    // Map profiles by user ID for quick lookup
    const profileMap = new Map();
    doctorProfiles.forEach((doc) => {
      if (doc.user?._id) profileMap.set(doc.user._id.toString(), doc);
    });

    const combinedDoctors = await Promise.all(
      doctorUsers.map(async (user) => {
        const profile = profileMap.get(user._id.toString());
        if (profile) return profile;

        // Create a default profile NOW?
        // It's a bit "dirty" for a GET, but ensures consistency immediately.
        try {
          const newDoc = await Doctor.create({
            user: user._id,
            specialization: "General Physician",
            fees: 500, // Default fee
            qualifications: ["MBBS"],
            experience: 1,
          });
          // We need to populate the user for the return
          return await Doctor.findById(newDoc._id).populate(
            "user",
            "name email"
          );
        } catch (e) {
          console.error("Auto-create profile failed", e);
          return null;
        }
      })
    );

    res.json(combinedDoctors.filter((d) => d !== null));
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
