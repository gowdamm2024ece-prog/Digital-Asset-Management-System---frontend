import * as api from "../api/assetApi";
import {
  GET_ASSETS,
  GET_ASSET,
} from "../constants/assetConstants";

export const getAllAssets = () => async (dispatch) => {
  const { data } = await api.getAllAssetsAPI();
  dispatch({ type: GET_ASSETS, payload: data });
};

export const getAssetById = (id) => async (dispatch) => {
  const { data } = await api.getAssetByIdAPI(id);
  dispatch({ type: GET_ASSET, payload: data });
};

export const createAsset = (asset) => async (dispatch) => {
  await api.createAssetAPI(asset);
  dispatch(getAllAssets());
};

export const updateAsset = (id, asset) => async (dispatch) => {
  await api.updateAssetAPI(id, asset);
  dispatch(getAllAssets());
};

export const deleteAsset = (id) => async (dispatch) => {
  await api.deleteAssetAPI(id);
  dispatch(getAllAssets());
};