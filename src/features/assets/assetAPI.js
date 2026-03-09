import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getAssets = async () => {
  const response = await axios.get(`${BASE_URL}/assets`);
  return response.data;
};

const getAssetById = async (id) => {
  const response = await axios.get(`${BASE_URL}/assets/${id}`);
  return response.data;
};

export default {
  getAssets,
  getAssetById
};