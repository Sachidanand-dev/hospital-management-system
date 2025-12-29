import api from "./axios";

export const bookAppointment = async (data) => {
  const response = await api.post("/appointments", data);
  return response.data;
};

export const getMyAppointments = async () => {
  const response = await api.get("/appointments");
  return response.data;
};

export const cancelAppointment = async (id) => {
  const response = await api.patch(`/appointments/${id}/cancel`);
  return response.data;
};

export const updateAppointmentStatus = async (id, status) => {
  const response = await api.patch(`/appointments/${id}/status`, { status });
  return response.data;
};
