// routes/AppRoutes.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";

export default function AppRoutes() {
  return (
      <Routes>
        {/* Redirect root to admin */}
        <Route path="/" element={<Navigate to="/admin" />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* 404 Page */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
  );
}