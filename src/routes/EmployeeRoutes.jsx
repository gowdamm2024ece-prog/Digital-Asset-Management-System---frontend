import { Route } from "react-router-dom";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import MyAssetsPage from "../pages/employee/MyAssetsPage";
import CreateReportPage from "../pages/employee/CreateReportPage";
import MyReportsPage from "../pages/employee/MyReportsPage";
import ProtectedRoute from "../components/ProtectedRoute";

function EmployeeRoutes() {
  return (
    <Route path="/employee" element={
      <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
        <EmployeeDashboard />
      </ProtectedRoute>
    }>
      <Route path="my-assets" element={<MyAssetsPage />} />
      <Route path="create-report" element={<CreateReportPage />} />
      <Route path="my-reports" element={<MyReportsPage />} />
    </Route>
  );
}

export default EmployeeRoutes;
