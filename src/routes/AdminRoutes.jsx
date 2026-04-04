import { Route } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ProtectedRoute from "../components/ProtectedRoute";

function AdminRoutes() {
  return (
    <Route path="/admin" element={
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <AdminDashboard />
      </ProtectedRoute>
    } />
  );
}

export default AdminRoutes;
