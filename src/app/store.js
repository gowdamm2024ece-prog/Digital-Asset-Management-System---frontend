import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/users/userSlice";
import assetReducer from "../features/assets/assetSlice";
import reportReducer from "../features/reports/reportSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    assets: assetReducer,
    reports: reportReducer
  }
});