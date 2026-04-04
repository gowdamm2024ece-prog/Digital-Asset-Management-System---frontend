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

export const fetchAssetsByUserId = createAsyncThunk(
  "assets/fetchAssetsByUserId",
  async (userId, thunkAPI) => {
    try {
      return await assetAPI.getAssetsByUserId(userId);
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

export const createAsset = createAsyncThunk(
  "assets/createAsset",
  async (assetData, thunkAPI) => {
    try {
      return await assetAPI.createAsset(assetData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const updateAsset = createAsyncThunk(
  "assets/updateAsset",
  async ({ id, assetData }, thunkAPI) => {
    try {
      return await assetAPI.updateAsset({ id, assetData });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const deleteAsset = createAsyncThunk(
  "assets/deleteAsset",
  async (id, thunkAPI) => {
    try {
      await assetAPI.deleteAsset(id);
      return id;
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

      .addCase(fetchAssetsByUserId.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAssetsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.assets = action.payload;
      })

      .addCase(fetchAssetsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAssetById.fulfilled, (state, action) => {
        state.selectedAsset = action.payload;
      })

      .addCase(createAsset.fulfilled, (state, action) => {
        state.assets.push(action.payload);
      })

      .addCase(updateAsset.fulfilled, (state, action) => {
        const index = state.assets.findIndex(
          (asset) => asset.id === action.payload.id
        );

        if (index !== -1) {
          state.assets[index] = action.payload;
        }
      })

      .addCase(deleteAsset.fulfilled, (state, action) => {
        state.assets = state.assets.filter(
          (asset) => asset.id !== action.payload
        );
      });

  }
});

export default assetSlice.reducer;