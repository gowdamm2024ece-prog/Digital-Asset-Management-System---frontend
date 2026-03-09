import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchReports } from '../../features/reports/reportSlice';
import { selectReports } from '../../features/reports/reportSelector';

const MyReportsPage = () => {
  const dispatch = useDispatch();
  const reports = useSelector(selectReports);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Reports</h1>
        <Link to="/employee/createreport" className="bg-blue-600 text-white px-4 py-2 rounded">
          + New Report
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Priority</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id} className="border-t">
                <td className="px-4 py-2">{report.title}</td>
                <td className="px-4 py-2">{report.type}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    report.priority === 'high' ? 'bg-red-100 text-red-800' :
                    report.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>{report.priority}</span>
                </td>
                <td className="px-4 py-2">{report.status}</td>
                <td className="px-4 py-2">{new Date(report.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReportsPage;