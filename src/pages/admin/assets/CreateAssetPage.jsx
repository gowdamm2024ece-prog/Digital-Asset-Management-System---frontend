import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAsset } from "../../../features/actions/assetActions";
import { useNavigate } from "react-router-dom";

const CreateAssetPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    status: "AVAILABLE",
    type: "",
    purchaseDate: "",
    warrantyExpiry: "",
    assetCode: "",
    serialNumber: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAsset(form));
    navigate("/admin/assets");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-lg p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Add New Asset
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <select
            className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="ALLOCATED">ALLOCATED</option>
            <option value="UNDER_REPAIR">UNDER_REPAIR</option>
            <option value="RETIRED">RETIRED</option>
          </select>

          <input
            className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            placeholder="Type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          />

          <input
            type="date"
            className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            value={form.purchaseDate}
            onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })}
          />

          <input
            type="date"
            className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            value={form.warrantyExpiry}
            onChange={(e) =>
              setForm({ ...form, warrantyExpiry: e.target.value })
            }
          />

          <input
            className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            placeholder="Asset Code"
            value={form.assetCode}
            onChange={(e) => setForm({ ...form, assetCode: e.target.value })}
          />

          <input
            className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            placeholder="Serial Number"
            value={form.serialNumber}
            onChange={(e) =>
              setForm({ ...form, serialNumber: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Create Asset
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAssetPage;