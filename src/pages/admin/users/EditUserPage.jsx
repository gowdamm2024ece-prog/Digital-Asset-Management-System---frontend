// pages/admin/users/EditUserPage.jsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers, updateUser } from "../../../features/actions/userActions";

export default function EditUserPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users } = useSelector(
    (state) => state.userState
  );

  const [form, setForm] = useState({
    userName: "",
    password: "",
    role: "USER",
  });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    const user = users.find((u) => u.id === Number(id));
    if (user) {
      setForm({
        userName: user.userName,
        password: "",
        role: user.role,
      });
    }
  }, [users, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(id, form));
    navigate("/admin/users");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit User</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded space-y-4"
      >
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={form.userName}
          onChange={(e) =>
            setForm({ ...form, userName: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="New Password (optional)"
          className="w-full border p-2 rounded"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <select
          className="w-full border p-2 rounded"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="EMPLOYEE">EMPLOYEE</option>
            <option value="MANAGER">MANAGER</option>
            <option value="TECHNICIAN">TECHNICIAN</option>
            <option value="ADMIN">ADMIN</option>
        </select>

        <button className="w-full bg-yellow-500 text-white py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}