import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";

const HealthDashboard = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  const filteredRecords = records.filter((record) => {
    return record.date.includes(search) || record.heartRate > search;
  });

  useEffect(() => {
    axios
      .get("https://healthbe.onrender.com/api/health-records")
      .then((response) => setRecords(response.data))
      .catch((error) => console.error("Error fetching records", error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://healthbe.onrender.com/api/health-records/${id}`)
      .then(() => {
        setRecords(records.filter((record) => record._id !== id));
      })
      .catch((error) => console.error("Error deleting record", error));
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-blue-300 flex flex-col items-center py-10 px-4"
      style={{
        backgroundImage: "url('/path-to-health-background-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl font-bold text-white mb-8 flex items-center">
        <FaHeartbeat className="mr-2 text-red-500" />
        Health Dashboard
      </h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-between items-center w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search by Date or Heart Rate..."
          className="border rounded-lg p-3 w-full max-w-sm shadow-lg focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link
          to="/add"
          className="ml-4 bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-700 transition-all"
        >
          Add Health Record
        </Link>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto w-full max-w-4xl bg-white rounded-lg shadow-lg p-4">
        <table className="min-w-full table-auto bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-green-400 via-blue-500 to-indigo-500 text-white uppercase text-sm leading-normal rounded-lg">
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Body Temperature</th>
              <th className="py-3 px-6 text-left">Blood Pressure</th>
              <th className="py-3 px-6 text-left">Heart Rate</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <tr
                  key={record._id}
                  className="border-b border-gray-200 hover:bg-gray-100 transition duration-300"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {record.bodyTemperature} °C
                  </td>
                  <td className="py-3 px-6 text-left">
                    {record.bloodPressure.systolic}/
                    {record.bloodPressure.diastolic}
                  </td>
                  <td className="py-3 px-6 text-left">{record.heartRate} bpm</td>
                  <td className="py-3 px-6 text-center">
                    <Link
                      to={`/health-record/${record._id}`}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(record._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-6 px-6 text-center text-gray-500 font-medium"
                >
                  No health records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HealthDashboard;
