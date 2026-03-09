import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAssets } from '../../features/assets/assetSlice';
import { fetchReports } from '../../features/reports/reportSlice';
import { selectAssets } from '../../features/assets/assetSelectors';
import { selectReports } from '../../features/reports/reportSelectors';

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const assets = useSelector(selectAssets);
  const reports = useSelector(selectReports);

  useEffect(() => {
    dispatch(fetchAssets());
    dispatch(fetchReports());
  }, [dispatch]);

  const stats = [
    { label: 'Total Assets', value: assets.length, icon: '📦', color: 'bg-blue-100' },
    { label: 'Active Reports', value: reports.filter(r => r.status === 'pending').length, icon: '📊', color: 'bg-yellow-100' },
    { label: 'Resolved', value: reports.filter(r => r.status === 'resolved').length, icon: '✅', color: 'bg-green-100' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Employee Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className={`${stat.color} p-4 rounded-lg shadow`}>
            <span className="text-2xl mb-2 block">{stat.icon}</span>
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-3">Recent Assets</h2>
          {assets.slice(0, 3).map(asset => (
            <Link key={asset.id} to={`/employee/asset/${asset.id}`} className="block p-2 hover:bg-gray-50">
              {asset.name} - <span className="text-sm text-gray-600">{asset.status}</span>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-3">Recent Reports</h2>
          {reports.slice(0, 3).map(report => (
            <div key={report.id} className="p-2 border-b last:border-0">
              <p className="font-medium">{report.title}</p>
              <p className="text-sm text-gray-600">{report.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;