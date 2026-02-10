import React from "react";
import { Link } from "react-router-dom";

export default function FertilizerSupplierDashboard() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-green-800 mb-6">
        Fertilizer Supplier Dashboard
      </h1>

      <div className="flex flex-col gap-4">
        <Link
          to="/fertilizers/add"
          className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
        >
          Add Fertilizer
        </Link>

        <Link
          to="/fertilizers"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          View Fertilizers....
        </Link>
      </div>
    </div>
  );
}
