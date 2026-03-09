import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReport } from '../../features/reports/reportSlice';

const CreateReportPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'maintenance',
    priority: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReport(formData));
    navigate('/employee/myreports');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Report</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="maintenance">Maintenance</option>
            <option value="repair">Repair</option>
            <option value="software">Software Issue</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({...formData, priority: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
            rows="4"
            required
          />
        </div>

        <div className="flex gap-2 pt-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Submit
          </button>
          <button type="button" onClick={() => navigate(-1)} className="border px-4 py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateReportPage;