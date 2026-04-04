import api from "../../app/axiosInstance";

const getWorkOrders = async () => {
  const response = await api.get("/workorders");
  return response.data;
};

const getMyWorkOrders = async () => {
  const response = await api.get("/workorders/my");
  return response.data;
};

const getWorkOrderById = async (id) => {
  const response = await api.get(`/workorders/${id}`);
  return response.data;
};

const createWorkOrder = async (data) => {
  const response = await api.post("/workorders", data);
  return response.data;
};

const updateWorkOrderStatus = async (data) => {
  const response = await api.patch("/workorders/status", data);
  return response.data;
};

const updateWorkOrder = async ({ id, data }) => {
  const response = await api.put(`/workorders/${id}`, data);
  return response.data;
};

const deleteWorkOrder = async (id) => {
  await api.delete(`/workorders/${id}`);
};

export default {
  getWorkOrders,
  getMyWorkOrders,
  getWorkOrderById,
  createWorkOrder,
  updateWorkOrderStatus,
  updateWorkOrder,
  deleteWorkOrder
};
