// pages/admin/users/CreateUserPage.jsx

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../features/actions/userActions";

export default function CreateUserPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    password: "",
    role: "EMPLOYEE",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(form));
    navigate("/admin/users");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create User</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded space-y-4"
      >
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded"
          value={form.userName}
          onChange={(e) =>
            setForm({ ...form, userName: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
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

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}