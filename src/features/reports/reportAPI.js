import api from "../../app/axiosInstance";

const createReport = async (reportData) => {
  const response = await api.post("/reports", reportData);
  return response.data;
};

const getReports = async () => {
  const response = await api.get("/reports");
  return response.data;
};

const getMyReports = async () => {
  const response = await api.get("/reports/my");
  return response.data;
};

const getReportById = async (id) => {
  const response = await api.get(`/reports/${id}`);
  return response.data;
};

const updateReport = async ({ id, reportData }) => {
  const response = await api.put(`/reports/${id}`, reportData);
  return response.data;
};

const deleteReport = async (id) => {
  await api.delete(`/reports/${id}`);
};

export default {
  createReport,
  getReports,
  getMyReports,
  getReportById,
  updateReport,
  deleteReport
};
