import Appointment from "../models/Appointment.model.js";
import Doctor from "../models/Doctor.model.js";
import Patient from "../models/Patient.model.js";
import User from "../models/User.model.js";

export const bookAppointment = async (req, res) => {
  const {
    doctorId,
    date,
    reason,
    gender,
    dateOfBirth,
    contactNumber,
    address,
  } = req.body;
  const userId = req.user._id;

  try {
    console.log("=== Booking Attempt ===");
    console.log("User:", userId);
    console.log("Payload:", req.body);

    // 1. Validate Payload
    if (!doctorId || !date) {
      throw new Error("Missing required fields: doctorId, date");
    }

    // 2. Resolve Doctor
    // Try finding by ID first
    let doctor = await Doctor.findById(doctorId);

    // If not found, it might be a User ID (from our virtual doctor list)
    if (!doctor) {
      console.log(
        "Doctor profile not found by ID. Checking if it's a User ID..."
      );
      const doctorUser = await User.findById(doctorId);
      if (doctorUser && doctorUser.role === "DOCTOR") {
        console.log("Found Doctor User. Creating Profile...");
        doctor = await Doctor.create({
          user: doctorUser._id,
          specialization: "General Physician",
          fees: 500,
          qualifications: ["MBBS"],
          experience: 1,
        });
      } else {
        throw new Error("Invalid Doctor ID selected.");
      }
    }

    // 3. Resolve Patient
    let patient = await Patient.findOne({ user: userId });

    // Create or Update Patient Details
    const patientData = {
      user: userId,
      ...(gender && { gender }),
      ...(dateOfBirth && { dateOfBirth }),
      ...(contactNumber && { contactNumber }),
      ...(address && { address }),
    };

    if (!patient) {
      console.log("Patient profile missing. Auto-creating...");
      // Ensure defaults if not provided
      patient = await Patient.create({
        bloodGroup: "O+", // Default
        gender: "Other",
        contactNumber: "0000000000",
        ...patientData,
      });
    } else {
      console.log("Updating existing Patient profile...");
      // Update existing profile with new info if provided
      if (gender) patient.gender = gender;
      if (dateOfBirth) patient.dateOfBirth = dateOfBirth;
      if (contactNumber) patient.contactNumber = contactNumber;
      if (address) patient.address = address;
      await patient.save();
    }

    // 4. Create Appointment
    console.log("Calculating Queue Number...");
    const appointmentDate = new Date(date);
    const startOfDay = new Date(appointmentDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(appointmentDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingAppointments = await Appointment.countDocuments({
      doctor: doctor._id,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    const queueNumber = existingAppointments + 1;
    console.log(`Assigning Queue Number: ${queueNumber}`);

    console.log("Creating Appointment Record...");
    const appointment = await Appointment.create({
      doctor: doctor._id, // Use actual Doctor Profile ID
      patient: patient._id, // Use actual Patient Profile ID
      date: appointmentDate, // Ensure Date Object
      queueNumber,
      reason: reason || "General Checkup",
      status: "PENDING", // Correct enum value
      price: doctor.fees || 500,
    });

    console.log("Appointment Created:", appointment._id);
    res.status(201).json(appointment);
  } catch (error) {
    console.error("Booking Logic Failed:", error);
    res.status(500).json({
      message: error.message || "Booking failed due to server error",
      details: error.toString(),
    });
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
      .populate({
        path: "doctor",
        populate: { path: "user", select: "name email" },
      })
      .populate({
        path: "patient",
        populate: { path: "user", select: "name email" },
      })
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

export const updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    // TODO: Verify if the user is the doctor of this appointment
    // const doctor = await Doctor.findOne({ user: req.user._id });
    // if (appointment.doctor.toString() !== doctor._id.toString()) ...

    appointment.status = status;
    await appointment.save();

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
