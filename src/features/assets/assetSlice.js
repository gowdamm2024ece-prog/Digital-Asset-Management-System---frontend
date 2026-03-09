import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import assetAPI from "./assetAPI";

const initialState = {
  assets: [],
  selectedAsset: null,
  loading: false,
  error: null
};

export const fetchAssets = createAsyncThunk(
  "assets/fetchAssets",
  async (_, thunkAPI) => {
    try {
      return await assetAPI.getAssets();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const fetchAssetById = createAsyncThunk(
  "assets/fetchAssetById",
  async (id, thunkAPI) => {
    try {
      return await assetAPI.getAssetById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const assetSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.assets = action.payload;
      })

      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAssetById.fulfilled, (state, action) => {
        state.selectedAsset = action.payload;
      });

  }
});

export default assetSlice.reducer;