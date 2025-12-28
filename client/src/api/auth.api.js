import api from "./axios";

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const logout = async () => {
  // Clear local token, sidebar handling might happen in context
  localStorage.removeItem("accessToken");
  // Optional: Call logout endpoint if your backend has one to clear cookies
  // await api.post("/auth/logout");
};

export const getMyProfile = async () => {
  const response = await api.get("/users/me");
  return response.data;
};
