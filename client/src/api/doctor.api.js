import api from "./axios";

export const getAllDoctors = async () => {
  const response = await api.get("/doctors");
  return response.data;
};

export const getDoctorById = async (id) => {
  const response = await api.get(`/doctors/${id}`);
  return response.data;
};

export const createDoctorProfile = async (data) => {
  const response = await api.post("/doctors", data);
  return response.data;
};

export const updateDoctorProfile = async (data) => {
  const response = await api.put("/doctors", data);
  return response.data;
};
