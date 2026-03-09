import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const createUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users`, userData);
  return response.data;
};

const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
};

const getUserById = async (id) => {
  const response = await axios.get(`${BASE_URL}/users/${id}`);
  return response.data;
};

const updateUser = async ({ id, userData }) => {
  const response = await axios.patch(`${BASE_URL}/users/${id}`, userData);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(`${BASE_URL}/users/${id}`);
  return response.data;
};

export default {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};