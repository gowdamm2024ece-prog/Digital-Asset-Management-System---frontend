import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reportAPI from "./reportAPI";

const initialState = {
  reports: [],
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

export const createReport = createAsyncThunk(
  "reports/createReport",
  async (reportData, thunkAPI) => {
    try {
      return await reportAPI.createReport(reportData);
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

      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })

      .addCase(createReport.fulfilled, (state, action) => {
        state.reports.push(action.payload);
      });

  }
});

export default reportSlice.reducer;