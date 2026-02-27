import React from "react";
import LogoutButton from "../../components/common/LogoutButton";

const EmployeeDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employee Dashboard</h1>
        <LogoutButton />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2>My Assets</h2>
        <p className="text-3xl font-bold text-blue-600">5</p>
      </div>
    </div>
  );
};

export default EmployeeDashboard;