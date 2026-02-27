import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL + "/assets";

export const getAllAssetsAPI = () =>
  axios.get(BASE_URL);

export const getAssetByIdAPI = (id) =>
  axios.get(`${BASE_URL}/${id}`);

export const createAssetAPI = (data) =>
  axios.post(BASE_URL, data);

export const updateAssetAPI = (id, data) =>
  axios.patch(`${BASE_URL}/${id}`, data);

export const deleteAssetAPI = (id) =>
  axios.delete(`${BASE_URL}/${id}`);