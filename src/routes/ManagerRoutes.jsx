import { Route } from "react-router-dom";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import ProtectedRoute from "../components/ProtectedRoute";

function ManagerRoutes() {
  return (
    <Route path="/manager" element={
      <ProtectedRoute allowedRoles={["MANAGER"]}>
        <ManagerDashboard />
      </ProtectedRoute>
    } />
  );
}

export default ManagerRoutes;
