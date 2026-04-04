import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const login = async ({ userName, password }) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    username: userName,
    password
  });
  const data = response.data;
  localStorage.setItem("token", data.token);
  return data; // { token, role, username, id }
};

const register = async (userData) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, userData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  return response.data;
};

export default { login, register };
