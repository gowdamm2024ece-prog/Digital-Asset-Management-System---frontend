// routes/AdminRoutes.jsx

import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";

import UserListPage from "../pages/admin/users/UserListPage";
import CreateUserPage from "../pages/admin/users/CreateUserPage";
import EditUserPage from "../pages/admin/users/EditUserPage";
import CreateAssetPage from "../pages/admin/assets/CreateAssetPage";
import AssetListPage from "../pages/admin/assets/AssetListPage";
import EditAssetPage from "../pages/admin/assets/EditAssetPage";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />}>
        <Route path="users" element={<UserListPage />} />
        <Route path="users/create" element={<CreateUserPage />} />
        <Route path="users/edit/:id" element={<EditUserPage />} />
        <Route path="assets" element={<AssetListPage />} />
        <Route path="assets/add" element={<CreateAssetPage />} />
        <Route path="assets/edit/:id" element={<EditAssetPage />} />
      </Route>
    </Routes>
  );
}