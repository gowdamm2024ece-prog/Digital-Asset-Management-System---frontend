import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAssets } from '../../features/assets/assetSlice';
import { selectAssets } from '../../features/assets/assetSelector';

const MyAssetsPage = () => {
  const dispatch = useDispatch();
  const assets = useSelector(selectAssets);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);

  const filteredAssets = filter === 'all' 
    ? assets 
    : assets.filter(a => a.status === filter);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Assets</h1>
        <div className="flex gap-2">
          {['all', 'available', 'assigned'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded ${filter === status ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map(asset => (
          <Link key={asset.id} to={`/employee/asset/${asset.id}`} className="bg-white rounded-lg shadow p-4 hover:shadow-md">
            <h3 className="font-semibold">{asset.name}</h3>
            <p className="text-sm text-gray-600">Tag: {asset.assetTag}</p>
            <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
              asset.status === 'available' ? 'bg-green-100 text-green-800' :
              asset.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>{asset.status}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyAssetsPage;