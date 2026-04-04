import { Route } from "react-router-dom";
import TechnicianDashboard from "../pages/technician/TechnicianDashboard";
import ProtectedRoute from "../components/ProtectedRoute";

function TechnicianRoutes() {
  return (
    <Route path="/technician" element={
      <ProtectedRoute allowedRoles={["TECHNICIAN"]}>
        <TechnicianDashboard />
      </ProtectedRoute>
    } />
  );
}

export default TechnicianRoutes;
