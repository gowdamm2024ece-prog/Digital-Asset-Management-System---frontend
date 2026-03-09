import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getReports = async () => {
  const response = await axios.get(`${BASE_URL}/api/reports`);
  return response.data;
};

const createReport = async (reportData) => {
  const response = await axios.post(`${BASE_URL}/api/reports`, reportData);
  return response.data;
};

export default {
  getReports,
  createReport
};