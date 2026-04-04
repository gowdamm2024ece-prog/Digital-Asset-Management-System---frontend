import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReport } from "../../features/reports/reportSlice";
import { fetchAssetsByUserId } from "../../features/assets/assetSlice";
import { selectAssets } from "../../features/assets/assetSelectors";
import { selectAuthUser } from "../../features/auth/authSelectors";

const CreateReportPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const assets = useSelector(selectAssets);
  const [formData, setFormData] = useState({ description: "", priority: "LOW", assetId: "" });
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (user?.id) dispatch(fetchAssetsByUserId(user.id));
  }, [dispatch, user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    const result = await dispatch(createReport({
      description: formData.description,
      priority: formData.priority,
      status: "OPEN",
      assetId: Number(formData.assetId)
    }));
    if (createReport.fulfilled.match(result)) {
      setSuccess(true);
      setFormData({ description: "", priority: "LOW", assetId: "" });
    } else {
      setErr(result.payload || "Failed to submit report");
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Create Report</h3>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            Report submitted successfully!
          </div>
        )}
        {err && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{err}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Select Asset</label>
            <select
              name="assetId"
              value={formData.assetId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select your asset --</option>
              {assets.map((a) => (
                <option key={a.assetId} value={a.assetId}>
                  {a.assetName} ({a.assetType})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Describe the issue..."
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateReportPage;
