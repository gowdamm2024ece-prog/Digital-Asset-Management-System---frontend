import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import workorderAPI from "./workorderAPI";

const initialState = {
  workorders: [],
  selectedWorkOrder: null,
  loading: false,
  error: null
};

export const fetchWorkOrders = createAsyncThunk(
  "workorders/fetchAll",
  async (_, thunkAPI) => {
    try { return await workorderAPI.getWorkOrders(); }
    catch (e) { return thunkAPI.rejectWithValue(e.response?.data); }
  }
);

export const fetchMyWorkOrders = createAsyncThunk(
  "workorders/fetchMy",
  async (_, thunkAPI) => {
    try { return await workorderAPI.getMyWorkOrders(); }
    catch (e) { return thunkAPI.rejectWithValue(e.response?.data); }
  }
);

export const createWorkOrder = createAsyncThunk(
  "workorders/create",
  async (data, thunkAPI) => {
    try { return await workorderAPI.createWorkOrder(data); }
    catch (e) { return thunkAPI.rejectWithValue(e.response?.data?.message || "Failed"); }
  }
);

export const updateWorkOrderStatus = createAsyncThunk(
  "workorders/updateStatus",
  async (data, thunkAPI) => {
    try { return await workorderAPI.updateWorkOrderStatus(data); }
    catch (e) { return thunkAPI.rejectWithValue(e.response?.data?.message || "Failed"); }
  }
);

export const deleteWorkOrder = createAsyncThunk(
  "workorders/delete",
  async (id, thunkAPI) => {
    try { await workorderAPI.deleteWorkOrder(id); return id; }
    catch (e) { return thunkAPI.rejectWithValue(e.response?.data); }
  }
);

const workorderSlice = createSlice({
  name: "workorders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchWorkOrders.fulfilled, (state, action) => {
        state.loading = false; state.workorders = action.payload;
      })
      .addCase(fetchWorkOrders.rejected, (state, action) => {
        state.loading = false; state.error = action.payload;
      })
      .addCase(fetchMyWorkOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchMyWorkOrders.fulfilled, (state, action) => {
        state.loading = false; state.workorders = action.payload;
      })
      .addCase(fetchMyWorkOrders.rejected, (state, action) => {
        state.loading = false; state.error = action.payload;
      })
      .addCase(createWorkOrder.fulfilled, (state, action) => {
        state.workorders.push(action.payload);
      })
      .addCase(updateWorkOrderStatus.fulfilled, (state, action) => {
        const idx = state.workorders.findIndex(w => w.id === action.payload.id);
        if (idx !== -1) state.workorders[idx] = action.payload;
      })
      .addCase(deleteWorkOrder.fulfilled, (state, action) => {
        state.workorders = state.workorders.filter(w => w.id !== action.payload);
      });
  }
});

export default workorderSlice.reducer;
