import Doctor from "../models/Doctor.model.js";
import Patient from "../models/Patient.model.js";
import Appointment from "../models/Appointment.model.js";
import User from "../models/User.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments();
    const totalPatients = await Patient.countDocuments();
    const totalAppointments = await Appointment.countDocuments();

    res.json({
      totalDoctors,
      totalPatients,
      totalAppointments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate({
        path: "doctor",
        populate: { path: "user", select: "name email" },
      })
      .populate({
        path: "patient",
        populate: { path: "user", select: "name email" },
      })
      .sort({ date: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
