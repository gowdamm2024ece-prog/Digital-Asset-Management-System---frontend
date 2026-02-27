// features/api/userApi.js

import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL + "/users";

export const fetchUsersAPI = () => axios.get(BASE_URL);
export const createUserAPI = (data) => axios.post(BASE_URL, data);
export const updateUserAPI = (id, data) =>
  axios.patch(`${BASE_URL}/${id}`, data);
export const deleteUserAPI = (id) =>
  axios.delete(`${BASE_URL}/${id}`);