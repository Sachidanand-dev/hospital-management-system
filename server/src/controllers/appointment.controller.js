import Appointment from "../models/Appointment.model.js";
import Doctor from "../models/Doctor.model.js";
import Patient from "../models/Patient.model.js";

export const bookAppointment = async (req, res) => {
  const { doctorId, date, startTime, endTime, reason } = req.body;
  const userId = req.user._id;

  try {
    const patient = await Patient.findOne({ user: userId });
    if (!patient)
      return res.status(404).json({ message: "Patient profile required" });

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const appointment = await Appointment.create({
      doctor: doctorId,
      patient: patient._id,
      date,
      startTime,
      endTime,
      reason,
      price: doctor.fees,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    // Check if user is doctor or patient
    const patient = await Patient.findOne({ user: req.user._id });
    const doctor = await Doctor.findOne({ user: req.user._id });

    let query = {};
    if (patient) query.patient = patient._id;
    else if (doctor) query.doctor = doctor._id;
    else
      return res
        .status(400)
        .json({ message: "User not linked to any profile" });

    const appointments = await Appointment.find(query)
      .populate("doctor")
      .populate("patient")
      .sort({ date: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    // Verify ownership (simplified for now)
    appointment.status = "CANCELLED";
    await appointment.save();

    res.json({ message: "Appointment cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
