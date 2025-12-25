import React from "react";
import { useNavigate } from "react-router-dom";

const MOCK_FARMER_ID = "FARMER_001"; // temporary mock for presentation

const FarmerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Farmer Dashboard 🌾</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded">
          <p className="text-gray-500">Total Products</p>
          <p className="text-2xl font-semibold">--</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <p className="text-gray-500">New Orders</p>
          <p className="text-2xl font-semibold">--</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <p className="text-gray-500">Order Status</p>
          <p className="text-sm">Pending / Accepted</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <p className="text-gray-500">Top Selling Product</p>
          <p className="font-medium">--</p>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h2 className="font-semibold mb-2">Notifications</h2>
        <p className="text-gray-500 text-sm">No new notifications</p>
      </div>

      {/* Shortcut Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/farmer/add-product")}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Add Product
        </button>

        <button
          onClick={() => navigate("/farmer/my-products")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          View My Products
        </button>
      </div>

      {/* Mock Farmer Info (for presentation) */}
      <div className="mt-6 bg-gray-100 p-4 rounded">
        <p>
          <span className="font-semibold">Farmer ID:</span> {MOCK_FARMER_ID}
        </p>
        <p>
          <span className="font-semibold">Farmer Name:</span> Demo Farmer
        </p>
      </div>
    </div>
  );
};

export default FarmerDashboard;
