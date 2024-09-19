import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddHealthRecord = () => {
  const [date, setDate] = useState("");
  const [bodyTemperature, setBodyTemperature] = useState("");
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      date,
      bodyTemperature,
      bloodPressure: { systolic, diastolic },
      heartRate,
    };
console.log(newRecord)
    axios
      .post("https://healthbe.onrender.com/api/health-records", newRecord)
      .then(() => navigate("/"))
      .catch((error) => console.error("Error adding record", error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 max-w-lg animate-fade-in-down">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Add Health Record
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Body Temperature (°C)
            </label>
            <input
              type="number"
              value={bodyTemperature}
              onChange={(e) => setBodyTemperature(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Blood Pressure (Systolic / Diastolic)
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Systolic"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
              />
              <input
                type="number"
                placeholder="Diastolic"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Heart Rate (BPM)
            </label>
            <input
              type="number"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHealthRecord;
