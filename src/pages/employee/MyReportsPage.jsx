import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyReports } from "../../features/reports/reportSlice";
import { selectReports, selectReportsLoading } from "../../features/reports/reportSelectors";

const priorityColor = { HIGH: "bg-red-100 text-red-800", MEDIUM: "bg-yellow-100 text-yellow-800", LOW: "bg-green-100 text-green-800" };
const statusColor = { OPEN: "bg-blue-100 text-blue-800", IN_PROGRESS: "bg-purple-100 text-purple-800", RESOLVED: "bg-green-100 text-green-800", CLOSED: "bg-gray-100 text-gray-800" };

const MyReportsPage = () => {
  const dispatch = useDispatch();
  const reports = useSelector(selectReports);
  const loading = useSelector(selectReportsLoading);

  useEffect(() => { dispatch(fetchMyReports()); }, [dispatch]);

  if (loading) return <div className="text-center py-10 text-gray-500">Loading...</div>;

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">My Reports</h3>
      {reports.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No reports submitted yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Report #{report.id}</h4>
                  <p className="text-sm text-gray-500">Asset ID: {report.assetId}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColor[report.priority] || "bg-gray-100 text-gray-800"}`}>
                    {report.priority}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[report.status] || "bg-gray-100 text-gray-800"}`}>
                    {report.status}
                  </span>
                </div>
              </div>
              <p className="text-gray-700">{report.description}</p>
              {report.reportedAt && (
                <p className="text-xs text-gray-400 mt-2">{new Date(report.reportedAt).toLocaleString()}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReportsPage;
