import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers, createUser, updateUser, deleteUser } from "../../features/users/userSlice";
import { fetchAssets, createAsset, updateAsset, deleteAsset } from "../../features/assets/assetSlice";
import { fetchReports, deleteReport } from "../../features/reports/reportSlice";
import { fetchWorkOrders, deleteWorkOrder } from "../../features/workorders/workorderSlice";
import { selectUsers } from "../../features/users/userSelectors";
import { selectAssets } from "../../features/assets/assetSelectors";
import { selectReports } from "../../features/reports/reportSelectors";
import { selectWorkOrders } from "../../features/workorders/workorderSelectors";
import { selectAuthUser } from "../../features/auth/authSelectors";
import { logout } from "../../features/auth/authSlice";
import api from "../../app/axiosInstance";

const TABS = ["users", "assets", "reports", "workorders", "allocations"];

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector(selectAuthUser);
  const users = useSelector(selectUsers);
  const assets = useSelector(selectAssets);
  const reports = useSelector(selectReports);
  const workorders = useSelector(selectWorkOrders);

  const [tab, setTab] = useState("users");
  const [modal, setModal] = useState(null); // { type: 'user'|'asset', data: {} | null }
  const [allocations, setAllocations] = useState([]);
  const [allocForm, setAllocForm] = useState({ userId: "", assetId: "" });
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchAssets());
    dispatch(fetchReports());
    dispatch(fetchWorkOrders());
  }, [dispatch]);

  useEffect(() => {
    if (tab === "allocations") {
      api.get("/allocations/user/0").catch(() => {});
    }
  }, [tab]);

  const handleLogout = () => { dispatch(logout()); navigate("/"); };

  // ---- USER CRUD ----
  const openUserModal = (user = null) => {
    setFormData(user ? { userName: user.userName, password: "", role: user.role, id: user.id } : { userName: "", password: "", role: "EMPLOYEE" });
    setFormError("");
    setModal({ type: "user", edit: !!user });
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (modal.edit) {
      const result = await dispatch(updateUser({ id: formData.id, userData: { userName: formData.userName, password: formData.password, role: formData.role } }));
      if (updateUser.rejected.match(result)) { setFormError("Update failed"); return; }
    } else {
      const result = await dispatch(createUser({ username: formData.userName, password: formData.password, role: formData.role }));
      if (createUser.rejected.match(result)) { setFormError(result.payload || "Create failed"); return; }
    }
    setModal(null);
    dispatch(fetchUsers());
  };

  // ---- ASSET CRUD ----
  const openAssetModal = (asset = null) => {
    setFormData(asset ? { ...asset } : { name: "", type: "", assetCode: "", serialNumber: "", status: "AVAILABLE", warrantyExpiry: "" });
    setFormError("");
    setModal({ type: "asset", edit: !!asset });
  };

  const handleAssetSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (modal.edit) {
      await dispatch(updateAsset({ id: formData.id, assetData: formData }));
    } else {
      await dispatch(createAsset(formData));
    }
    setModal(null);
  };

  // ---- ALLOCATION ----
  const handleAllocate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/allocations/allocate", { userId: Number(allocForm.userId), assetId: Number(allocForm.assetId) });
      setAllocForm({ userId: "", assetId: "" });
      dispatch(fetchAssets());
      alert("Asset allocated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Allocation failed");
    }
  };

  const handleDeallocate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/allocations/deallocate", { userId: Number(allocForm.userId), assetId: Number(allocForm.assetId) });
      setAllocForm({ userId: "", assetId: "" });
      dispatch(fetchAssets());
      alert("Asset deallocated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Deallocation failed");
    }
  };

  const statusColor = { OPEN: "bg-blue-100 text-blue-800", IN_PROGRESS: "bg-purple-100 text-purple-800", RESOLVED: "bg-green-100 text-green-800" };
  const woColor = { ASSIGNED: "bg-yellow-100 text-yellow-800", WORKING: "bg-blue-100 text-blue-800", COMPLETED: "bg-green-100 text-green-800" };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {authUser?.username}</span>
            <button onClick={handleLogout} className="text-red-600 hover:text-red-800 font-medium">Logout</button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-3 flex gap-2 flex-wrap">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg capitalize transition ${tab === t ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
              {t}
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* USERS TAB */}
        {tab === "users" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Users</h3>
              <button onClick={() => openUserModal()} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">+ Add User</button>
            </div>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>{["ID", "Username", "Role", "Actions"].map(h => <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{u.id}</td>
                      <td className="px-4 py-3 text-sm font-medium">{u.userName}</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">{u.role}</span></td>
                      <td className="px-4 py-3 flex gap-2">
                        <button onClick={() => openUserModal(u)} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600">Edit</button>
                        <button onClick={() => { if (window.confirm("Delete user?")) dispatch(deleteUser(u.id)); }} className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ASSETS TAB */}
        {tab === "assets" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Assets</h3>
              <button onClick={() => openAssetModal()} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">+ Add Asset</button>
            </div>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>{["ID", "Name", "Type", "Asset Code", "Serial No.", "Status", "Actions"].map(h => <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {assets.map((a) => (
                    <tr key={a.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{a.id}</td>
                      <td className="px-4 py-3 text-sm font-medium">{a.name}</td>
                      <td className="px-4 py-3 text-sm">{a.type}</td>
                      <td className="px-4 py-3 text-sm">{a.assetCode}</td>
                      <td className="px-4 py-3 text-sm">{a.serialNumber}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-xs font-medium ${a.status === "AVAILABLE" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}>{a.status}</span></td>
                      <td className="px-4 py-3 flex gap-2">
                        <button onClick={() => openAssetModal(a)} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600">Edit</button>
                        <button onClick={() => { if (window.confirm("Delete asset?")) dispatch(deleteAsset(a.id)); }} className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* REPORTS TAB */}
        {tab === "reports" && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">All Reports</h3>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>{["ID", "Description", "Priority", "Status", "Asset ID", "Reporter ID", "Actions"].map(h => <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {reports.map((r) => (
                    <tr key={r.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{r.id}</td>
                      <td className="px-4 py-3 text-sm max-w-xs truncate">{r.description}</td>
                      <td className="px-4 py-3 text-sm">{r.priority}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-xs font-medium ${statusColor[r.status] || "bg-gray-100 text-gray-800"}`}>{r.status}</span></td>
                      <td className="px-4 py-3 text-sm">{r.assetId}</td>
                      <td className="px-4 py-3 text-sm">{r.reportedById}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => { if (window.confirm("Delete report?")) dispatch(deleteReport(r.id)); }} className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* WORK ORDERS TAB */}
        {tab === "workorders" && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">All Work Orders</h3>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>{["ID", "Description", "Status", "Report ID", "Manager ID", "Technician ID", "Actions"].map(h => <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {workorders.map((w) => (
                    <tr key={w.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{w.id}</td>
                      <td className="px-4 py-3 text-sm max-w-xs truncate">{w.description}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-xs font-medium ${woColor[w.status] || "bg-gray-100 text-gray-800"}`}>{w.status}</span></td>
                      <td className="px-4 py-3 text-sm">{w.reportId}</td>
                      <td className="px-4 py-3 text-sm">{w.issuedById}</td>
                      <td className="px-4 py-3 text-sm">{w.issuedToId}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => { if (window.confirm("Delete work order?")) dispatch(deleteWorkOrder(w.id)); }} className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ALLOCATIONS TAB */}
        {tab === "allocations" && (
          <div className="max-w-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Asset Allocation</h3>
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                <input type="number" value={allocForm.userId} onChange={(e) => setAllocForm({ ...allocForm, userId: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="User ID" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asset ID</label>
                <input type="number" value={allocForm.assetId} onChange={(e) => setAllocForm({ ...allocForm, assetId: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="Asset ID" />
              </div>
              <div className="flex gap-3">
                <button onClick={handleAllocate} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium">Allocate</button>
                <button onClick={handleDeallocate} className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 font-medium">Deallocate</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* USER MODAL */}
      {modal?.type === "user" && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-96">
            <h3 className="text-lg font-bold text-gray-800 mb-4">{modal.edit ? "Edit User" : "Add User"}</h3>
            <form onSubmit={handleUserSubmit} className="space-y-3">
              <input value={formData.userName} onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                placeholder="Username" required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
              <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder={modal.edit ? "New password (leave blank to keep)" : "Password"} required={!modal.edit}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
              <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                {["EMPLOYEE", "MANAGER", "TECHNICIAN", "ADMIN"].map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              {formError && <p className="text-red-500 text-sm">{formError}</p>}
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium">Save</button>
                <button type="button" onClick={() => setModal(null)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 font-medium">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ASSET MODAL */}
      {modal?.type === "asset" && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-96">
            <h3 className="text-lg font-bold text-gray-800 mb-4">{modal.edit ? "Edit Asset" : "Add Asset"}</h3>
            <form onSubmit={handleAssetSubmit} className="space-y-3">
              {[["name", "Name"], ["type", "Type"], ["assetCode", "Asset Code"], ["serialNumber", "Serial Number"]].map(([field, label]) => (
                <input key={field} value={formData[field] || ""} onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  placeholder={label} required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
              ))}
              <select value={formData.status || "AVAILABLE"} onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                {["AVAILABLE", "ALLOCATED", "UNDER_REPAIR", "RETIRED"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <input type="date" value={formData.warrantyExpiry || ""} onChange={(e) => setFormData({ ...formData, warrantyExpiry: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium">Save</button>
                <button type="button" onClick={() => setModal(null)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 font-medium">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
