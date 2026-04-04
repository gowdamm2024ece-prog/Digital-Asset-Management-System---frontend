import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "../../features/auth/authSelectors";
import { logout } from "../../features/auth/authSlice";

const EmployeeDashboard = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectAuthUser);

  const isActive = (path) => location.pathname.includes(path);

  const handleLogout = () => { dispatch(logout()); navigate("/"); };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h2 className="text-2xl font-bold text-gray-800">Employee Dashboard</h2>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, {user?.username}</span>
              <button onClick={handleLogout} className="text-red-600 hover:text-red-800 font-medium">Logout</button>
            </div>
          </div>
          <div className="flex gap-3 pb-4">
            {[["my-assets", "My Assets"], ["create-report", "Create Report"], ["my-reports", "My Reports"]].map(([path, label]) => (
              <Link key={path} to={path}
                className={`px-4 py-2 rounded-lg transition ${isActive(path) ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
