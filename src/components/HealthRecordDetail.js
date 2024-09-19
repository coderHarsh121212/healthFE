import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const HealthRecordDetail = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // For toggling edit mode
  const [formData, setFormData] = useState({
    date: "",
    bodyTemperature: "",
    systolic: "",
    diastolic: "",
    heartRate: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the health record details
    axios
      .get(`http://localhost:5000/api/health-records/${id}`)
      .then((response) => {
        setRecord(response.data);
        setFormData({
          date: response.data.date,
          bodyTemperature: response.data.bodyTemperature,
          systolic: response.data.bloodPressure?.systolic,
          diastolic: response.data.bloodPressure?.diastolic,
          heartRate: response.data.heartRate,
        });
      })
      .catch((error) => console.error("Error fetching record", error));
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/health-records/${id}`)
      .then(() => navigate("/"))
      .catch((error) => console.error("Error deleting record", error));
  };

  const handleEdit = () => {
    setIsEditing(true); // Switch to edit mode
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Cancel editing
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updatedRecord = {
      date: formData.date,
      bodyTemperature: formData.bodyTemperature,
      bloodPressure: {
        systolic: formData.systolic,
        diastolic: formData.diastolic,
      },
      heartRate: formData.heartRate,
    };

    // Call PUT API to update the record
    axios
      .put(`http://localhost:5000/api/health-records/${id}`, updatedRecord)
      .then((response) => {
        setRecord(response.data); // Update the record in the state
        setIsEditing(false); // Exit edit mode
      })
      .catch((error) => console.error("Error updating record", error));
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-8 max-w-6xl animate-fadeIn">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Health Record Details
      </h1>
      {record ? (
        isEditing ? (
          // Edit form when in editing mode
          <form onSubmit={handleSaveEdit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all transform duration-200 hover:scale-105"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Body Temperature (°C)
              </label>
              <input
                type="number"
                name="bodyTemperature"
                value={formData.bodyTemperature}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all transform duration-200 hover:scale-105"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Systolic Blood Pressure
              </label>
              <input
                type="number"
                name="systolic"
                value={formData.systolic}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all transform duration-200 hover:scale-105"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Diastolic Blood Pressure
              </label>
              <input
                type="number"
                name="diastolic"
                value={formData.diastolic}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all transform duration-200 hover:scale-105"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Heart Rate (BPM)
              </label>
              <input
                type="number"
                name="heartRate"
                value={formData.heartRate}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all transform duration-200 hover:scale-105"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all transform duration-200 hover:scale-105"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all transform duration-200 hover:scale-105"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          // Display mode when not editing
<div className="space-y-6 max-w-7xl mx-auto bg-white p-10 rounded-lg shadow-xl transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
  <div className="space-y-6">
    <p className="text-2xl font-bold text-gray-800 flex justify-between">
      <span>Date: </span>
      <span className="text-gray-900 shadow-sm">{new Date(record.date).toLocaleDateString()}</span>
    </p>
    <p className="text-2xl font-bold text-gray-800 flex justify-between">
      <span>Body Temperature: </span>
      <span className="text-gray-900 shadow-sm">{record.bodyTemperature} °C</span>
    </p>
    <p className="text-2xl font-bold text-gray-800 flex justify-between">
      <span>Blood Pressure: </span>
      <span className="text-gray-900 shadow-sm">{record.bloodPressure?.systolic}/{record.bloodPressure?.diastolic} mmHg</span>
    </p>
    <p className="text-2xl font-bold text-gray-800 flex justify-between">
      <span>Heart Rate: </span>
      <span className="text-gray-900 shadow-sm">{record.heartRate} bpm</span>
    </p>
    <div className="flex justify-between mt-8">
      <button
        onClick={handleEdit}
        className="bg-blue-500 text-white py-4 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition-all transform duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-400"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white py-4 px-8 rounded-lg shadow-lg hover:bg-red-600 transition-all transform duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-400"
      >
        Delete
      </button>
    </div>
  </div>
</div>


        )
      ) : (
        <p className="text-center text-gray-600 animate-pulse">Loading...</p>
      )}
    </div>
  );
};

export default HealthRecordDetail;
