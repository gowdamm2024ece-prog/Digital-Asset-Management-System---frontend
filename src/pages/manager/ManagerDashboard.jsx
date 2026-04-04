import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchReports } from "../../features/reports/reportSlice";
import { fetchWorkOrders, createWorkOrder, deleteWorkOrder } from "../../features/workorders/workorderSlice";
import { fetchUsers } from "../../features/users/userSlice";
import { selectReports } from "../../features/reports/reportSelectors";
import { selectWorkOrders } from "../../features/workorders/workorderSelectors";
import { selectUsers } from "../../features/users/userSelectors";
import { selectAuthUser } from "../../features/auth/authSelectors";
import { logout } from "../../features/auth/authSlice";

const statusColor = { OPEN: "bg-blue-100 text-blue-800", IN_PROGRESS: "bg-purple-100 text-purple-800", RESOLVED: "bg-green-100 text-green-800", CLOSED: "bg-gray-100 text-gray-800" };
const priorityColor = { HIGH: "bg-red-100 text-red-800", MEDIUM: "bg-yellow-100 text-yellow-800", LOW: "bg-green-100 text-green-800" };
const woStatusColor = { ASSIGNED: "bg-yellow-100 text-yellow-800", WORKING: "bg-blue-100 text-blue-800", COMPLETED: "bg-green-100 text-green-800" };

function ManagerDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectAuthUser);
  const reports = useSelector(selectReports);
  const workorders = useSelector(selectWorkOrders);
  const users = useSelector(selectUsers);
  const [tab, setTab] = useState("reports");
  const [assignModal, setAssignModal] = useState(null); // report object
  const [technicianId, setTechnicianId] = useState("");
  const [assignError, setAssignError] = useState("");

  const technicians = users.filter((u) => u.role === "TECHNICIAN");

  useEffect(() => {
    dispatch(fetchReports());
    dispatch(fetchWorkOrders());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleAssign = async () => {
    if (!technicianId) { setAssignError("Select a technician"); return; }
    const result = await dispatch(createWorkOrder({ reportId: assignModal.id, issuedToId: Number(technicianId) }));
    if (createWorkOrder.fulfilled.match(result)) {
      setAssignModal(null);
      setTechnicianId("");
      setAssignError("");
      dispatch(fetchWorkOrders());
    } else {
      setAssignError(result.payload || "Failed to assign");
    }
  };

  const handleDeleteWO = (id) => {
    if (window.confirm("Delete this work order?")) dispatch(deleteWorkOrder(id));
  };

  const assignedReportIds = new Set(workorders.map((w) => w.reportId));

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Manager Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user?.username}</span>
            <button onClick={handleLogout} className="text-red-600 hover:text-red-800 font-medium">Logout</button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-3 flex gap-3">
          {["reports", "workorders"].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg capitalize transition ${tab === t ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
              {t === "reports" ? "All Reports" : "Work Orders"}
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {tab === "reports" && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">All Reports</h3>
            {reports.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">No reports found</div>
            ) : (
              <div className="space-y-3">
                {reports.map((r) => (
                  <div key={r.id} className="bg-white rounded-lg shadow p-5 flex justify-between items-start">
                    <div>
                      <div className="flex gap-2 mb-2">
                        <span className="font-semibold text-gray-800">Report #{r.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColor[r.priority] || "bg-gray-100 text-gray-800"}`}>{r.priority}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[r.status] || "bg-gray-100 text-gray-800"}`}>{r.status}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{r.description}</p>
                      <p className="text-xs text-gray-400 mt-1">Asset ID: {r.assetId} | Reporter ID: {r.reportedById}</p>
                    </div>
                    {!assignedReportIds.has(r.id) && r.status !== "RESOLVED" && (
                      <button onClick={() => { setAssignModal(r); setAssignError(""); setTechnicianId(""); }}
                        className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 whitespace-nowrap">
                        Assign Work Order
                      </button>
                    )}
                    {assignedReportIds.has(r.id) && (
                      <span className="ml-4 text-xs text-green-600 font-medium bg-green-50 px-3 py-2 rounded-lg">Assigned</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "workorders" && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Work Orders</h3>
            {workorders.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">No work orders yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      {["ID", "Report ID", "Description", "Technician ID", "Status", "Issued At", "Actions"].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {workorders.map((w) => (
                      <tr key={w.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{w.id}</td>
                        <td className="px-4 py-3 text-sm">{w.reportId}</td>
                        <td className="px-4 py-3 text-sm max-w-xs truncate">{w.description}</td>
                        <td className="px-4 py-3 text-sm">{w.issuedToId}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${woStatusColor[w.status] || "bg-gray-100 text-gray-800"}`}>{w.status}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500">{w.issuedAt ? new Date(w.issuedAt).toLocaleDateString() : "-"}</td>
                        <td className="px-4 py-3">
                          <button onClick={() => handleDeleteWO(w.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Assign Modal */}
      {assignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-96">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Assign Work Order</h3>
            <p className="text-sm text-gray-600 mb-1">Report #{assignModal.id}</p>
            <p className="text-sm text-gray-700 mb-4">{assignModal.description}</p>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Technician</label>
            <select value={technicianId} onChange={(e) => setTechnicianId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500">
              <option value="">-- Select --</option>
              {technicians.map((t) => (
                <option key={t.id} value={t.id}>{t.userName}</option>
              ))}
            </select>
            {assignError && <p className="text-red-500 text-sm mb-3">{assignError}</p>}
            <div className="flex gap-3">
              <button onClick={handleAssign} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium">Assign</button>
              <button onClick={() => setAssignModal(null)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 font-medium">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManagerDashboard;
