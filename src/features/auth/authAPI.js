import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const login = async ({ userName, password, role }) => {

  const response = await axios.get(`${BASE_URL}/users`);

  const users = response.data;

  const user = users.find(
    (u) =>
      u.userName === userName &&
      u.role === role
  );

  if (!user) {
    throw new Error("Invalid username or role");
  }

  if (password !== user.password) {
    throw new Error("Invalid password");
  }

  return user;
};

const register = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users`, userData);
  return response.data;
};

export default {
  login,
  register
};