import React from "react";
import LogoutButton from "../../components/common/LogoutButton";

const ManagerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manager Dashboard</h1>
        <LogoutButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2>Team Assets</h2>
          <p className="text-3xl font-bold text-blue-600">214</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2>Open Requests</h2>
          <p className="text-3xl font-bold text-orange-600">9</p>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;