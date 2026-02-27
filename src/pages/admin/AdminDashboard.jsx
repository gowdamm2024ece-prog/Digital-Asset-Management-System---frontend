// pages/admin/AdminDashboard.jsx

import { Link, Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <nav className="space-y-3">
          <Link
            to="/admin/users"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Users
          </Link>

          <Link
            to="/admin/assets"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Assets
          </Link>

          <Link
            to="/admin/reports"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Reports
          </Link>

          <Link
            to="/admin/workorders"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Work Orders
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}