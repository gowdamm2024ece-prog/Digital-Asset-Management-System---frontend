import api from "../../app/axiosInstance";

const createUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

const updateUser = async ({ id, userData }) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

const deleteUser = async (id) => {
  await api.delete(`/users/${id}`);
};

export default {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
