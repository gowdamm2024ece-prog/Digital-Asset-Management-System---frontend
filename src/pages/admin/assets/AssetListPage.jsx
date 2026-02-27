import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAssets, deleteAsset } from "../../../features/actions/assetActions";
import { useNavigate } from "react-router-dom";

const AssetListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { assets } = useSelector((state) => state.assetState);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteAsset(id))
    }
  };

  useEffect(() => {
    dispatch(getAllAssets());
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Assets</h2>
        <button
          onClick={() => navigate("/admin/assets/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Asset
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Type</th>
            <th>Asset Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id} className="text-center border-t">
              <td>{asset.name}</td>
              <td>{asset.status}</td>
              <td>{asset.type}</td>
              <td>{asset.assetCode}</td>
              <td className="space-x-2">
                <button
                  onClick={() => navigate(`/admin/assets/edit/${asset.id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(asset.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetListPage;