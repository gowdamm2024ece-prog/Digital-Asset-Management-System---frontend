import api from "../../app/axiosInstance";

const createAsset = async (assetData) => {
  const response = await api.post("/assets", assetData);
  return response.data;
};

const getAssets = async () => {
  const response = await api.get("/assets");
  return response.data;
};

const getAssetsByUserId = async (userId) => {
  const response = await api.get(`/allocations/user/${userId}`);
  return response.data;
};

const getAssetById = async (id) => {
  const response = await api.get(`/assets/${id}`);
  return response.data;
};

const updateAsset = async ({ id, assetData }) => {
  const response = await api.put(`/assets/${id}`, assetData);
  return response.data;
};

const deleteAsset = async (id) => {
  await api.delete(`/assets/${id}`);
};

export default {
  createAsset,
  getAssets,
  getAssetsByUserId,
  getAssetById,
  updateAsset,
  deleteAsset
};
