import { Routes, Route } from "react-router-dom";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import MyAssetsPage from "../pages/employee/MyAssetsPage";
import AssetDetailsPage from "../pages/employee/AssetDetailsPage";
import CreateReportPage from "../pages/employee/CreateReportPage";
import MyReportsPage from "../pages/employee/MyReportsPage";
import WorkOrderDetailsPage from "../pages/employee/WorkOrderDetailsPage";
import ProfilePage from "../pages/employee/ProfilePage";

function EmployeeRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<EmployeeDashboard />} />
      <Route path="assets" element={<MyAssetsPage />} />
      <Route path="assets/:id" element={<AssetDetailsPage />} />
      <Route path="reports/create" element={<CreateReportPage />} />
      <Route path="reports" element={<MyReportsPage />} />
      <Route path="workorders/:id" element={<WorkOrderDetailsPage />} />
      <Route path="profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default EmployeeRoutes;