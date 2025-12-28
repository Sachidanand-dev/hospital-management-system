import Patient from "../models/Patient.model.js";

export const createPatientProfile = async (req, res) => {
  const {
    dateOfBirth,
    gender,
    bloodGroup,
    address,
    contactNumber,
    medicalHistory,
  } = req.body;
  const userId = req.user._id;

  try {
    let patient = await Patient.findOne({ user: userId });
    if (patient) {
      return res
        .status(400)
        .json({ message: "Patient profile already exists" });
    }

    patient = await Patient.create({
      user: userId,
      dateOfBirth,
      gender,
      bloodGroup,
      address,
      contactNumber,
      medicalHistory,
    });

    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.user._id }).populate(
      "user",
      "name email"
    );
    if (!patient)
      return res.status(404).json({ message: "Patient profile not found" });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updatePatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.user._id });
    if (!patient)
      return res.status(404).json({ message: "Patient profile not found" });

    const updatedPatient = await Patient.findByIdAndUpdate(
      patient._id,
      req.body,
      { new: true }
    );
    res.json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
