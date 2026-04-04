import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";

import AdminRoutes from "./AdminRoutes";
import ManagerRoutes from "./ManagerRoutes";
import TechnicianRoutes from "./TechnicianRoutes";
import EmployeeRoutes from "./EmployeeRoutes";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {AdminRoutes()}
      {ManagerRoutes()}
      {TechnicianRoutes()}
      {EmployeeRoutes()}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;