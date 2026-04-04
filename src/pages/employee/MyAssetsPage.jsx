import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssetsByUserId } from "../../features/assets/assetSlice";
import { selectAssets, selectAssetsLoading } from "../../features/assets/assetSelectors";
import { selectAuthUser } from "../../features/auth/authSelectors";

const MyAssetsPage = () => {
  const dispatch = useDispatch();
  const assets = useSelector(selectAssets);
  const loading = useSelector(selectAssetsLoading);
  const user = useSelector(selectAuthUser);

  useEffect(() => {
    if (user?.id) dispatch(fetchAssetsByUserId(user.id));
  }, [dispatch, user]);

  if (loading) return <div className="text-center py-10 text-gray-500">Loading...</div>;

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">My Assets</h3>
      {assets.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No assets assigned to you</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map((asset) => (
            <div key={asset.allocationId} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">{asset.assetName}</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium">Type:</span> {asset.assetType}</p>
                <p><span className="font-medium">Allocated:</span> {asset.allocatedDate}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAssetsPage;
