import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reportAPI from "./reportAPI";

const initialState = {
  reports: [],
  selectedReport: null,
  loading: false,
  error: null
};

export const fetchReports = createAsyncThunk(
  "reports/fetchReports",
  async (_, thunkAPI) => {
    try {
      return await reportAPI.getReports();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const fetchMyReports = createAsyncThunk(
  "reports/fetchMyReports",
  async (_, thunkAPI) => {
    try {
      return await reportAPI.getMyReports();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const createReport = createAsyncThunk(
  "reports/createReport",
  async (reportData, thunkAPI) => {
    try {
      return await reportAPI.createReport(reportData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create report");
    }
  }
);

export const deleteReport = createAsyncThunk(
  "reports/deleteReport",
  async (id, thunkAPI) => {
    try {
      await reportAPI.deleteReport(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => { state.loading = true; })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyReports.pending, (state) => { state.loading = true; })
      .addCase(fetchMyReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchMyReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.reports.push(action.payload);
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.reports = state.reports.filter((r) => r.id !== action.payload);
      });
  }
});

export default reportSlice.reducer;
