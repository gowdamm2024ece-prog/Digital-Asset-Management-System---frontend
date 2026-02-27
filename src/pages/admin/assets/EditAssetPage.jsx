import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAssetById, updateAsset } from "../../../features/actions/assetActions";
import { useNavigate, useParams } from "react-router-dom";

const EditAssetPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { asset } = useSelector((state) => state.assetState);

  const [form, setForm] = useState({
    name: "",
    status: "AVAILABLE",
    type: "",
    purchaseDate: "",
    warrantyExpiry: "",
    assetCode: "",
    serialNumber: "",
  });

  // Fetch asset when page loads
  useEffect(() => {
    dispatch(getAssetById(id));
  }, [dispatch, id]);

  // Populate form when asset is loaded
  useEffect(() => {
    if (asset) {
      setForm({
        name: asset.name || "",
        status: asset.status || "AVAILABLE",
        type: asset.type || "",
        purchaseDate: asset.purchaseDate || "",
        warrantyExpiry: asset.warrantyExpiry || "",
        assetCode: asset.assetCode || "",
        serialNumber: asset.serialNumber || "",
      });
    }
  }, [asset]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAsset(id, form));
    navigate("/admin/assets");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Asset</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Asset Name"
          className="border p-2 w-full rounded"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="ALLOCATED">ALLOCATED</option>
          <option value="UNDER_REPAIR">UNDER_REPAIR</option>
          <option value="RETIRED">RETIRED</option>
        </select>

        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Type"
          className="border p-2 w-full rounded"
        />

        <input
          type="date"
          name="purchaseDate"
          value={form.purchaseDate}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input
          type="date"
          name="warrantyExpiry"
          value={form.warrantyExpiry}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input
          name="assetCode"
          value={form.assetCode}
          onChange={handleChange}
          placeholder="Asset Code"
          className="border p-2 w-full rounded"
        />

        <input
          name="serialNumber"
          value={form.serialNumber}
          onChange={handleChange}
          placeholder="Serial Number"
          className="border p-2 w-full rounded"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/assets")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default EditAssetPage;