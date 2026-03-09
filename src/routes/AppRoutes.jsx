import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import TechnicianDashboard from "../pages/technician/TechnicianDashboard";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";

import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<LoginPage />} />

      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="/manager" element={<ManagerDashboard />} />

      <Route path="/technician" element={<TechnicianDashboard />} />

      <Route path="/employee" element={<EmployeeDashboard />} />

      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
}

export default AppRoutes;