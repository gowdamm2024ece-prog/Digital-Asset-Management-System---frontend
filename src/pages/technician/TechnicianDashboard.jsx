import React from "react";
import LogoutButton from "../../components/common/LogoutButton";

const TechnicianDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Technician Dashboard</h1>
        <LogoutButton />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2>Assigned Work Orders</h2>
        <p className="text-3xl font-bold text-indigo-600">7</p>
      </div>
    </div>
  );
};

export default TechnicianDashboard;