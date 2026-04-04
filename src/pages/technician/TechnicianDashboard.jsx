import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMyWorkOrders, updateWorkOrderStatus } from "../../features/workorders/workorderSlice";
import { selectWorkOrders, selectWorkOrdersLoading } from "../../features/workorders/workorderSelectors";
import { selectAuthUser } from "../../features/auth/authSelectors";
import { logout } from "../../features/auth/authSlice";

const statusColor = { ASSIGNED: "bg-yellow-100 text-yellow-800", WORKING: "bg-blue-100 text-blue-800", COMPLETED: "bg-green-100 text-green-800" };

function TechnicianDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectAuthUser);
  const workorders = useSelector(selectWorkOrders);
  const loading = useSelector(selectWorkOrdersLoading);

  useEffect(() => { dispatch(fetchMyWorkOrders()); }, [dispatch]);

  const handleLogout = () => { dispatch(logout()); navigate("/"); };

  const handleMarkComplete = async (wo) => {
    await dispatch(updateWorkOrderStatus({ id: wo.id, status: "COMPLETED" }));
  };

  const handleMarkInProgress = async (wo) => {
    await dispatch(updateWorkOrderStatus({ id: wo.id, status: "WORKING" }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Technician Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user?.username}</span>
            <button onClick={handleLogout} className="text-red-600 hover:text-red-800 font-medium">Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">My Work Orders</h3>
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading...</div>
        ) : workorders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">No work orders assigned to you</div>
        ) : (
          <div className="space-y-4">
            {workorders.map((wo) => (
              <div key={wo.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-800">Work Order #{wo.id}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[wo.status] || "bg-gray-100 text-gray-800"}`}>
                        {wo.status}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{wo.description}</p>
                    <p className="text-xs text-gray-400">Report ID: {wo.reportId} | Issued: {wo.issuedAt ? new Date(wo.issuedAt).toLocaleDateString() : "-"}</p>
                  </div>
                  <div className="ml-4 flex flex-col gap-2">
                    {wo.status === "ASSIGNED" && (
                      <button onClick={() => handleMarkInProgress(wo)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 whitespace-nowrap">
                        Start Work
                      </button>
                    )}
                    {wo.status === "WORKING" && (
                      <button onClick={() => handleMarkComplete(wo)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 whitespace-nowrap">
                        Mark Complete
                      </button>
                    )}
                    {wo.status === "COMPLETED" && (
                      <span className="text-green-600 font-medium text-sm">✓ Completed</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TechnicianDashboard;
