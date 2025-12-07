import React from "react";

export default function FertilizerList() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-green-800 mb-6">
        Fertilizers
      </h1>

      {/* Add Fertilizer Button */}
      <div className="mb-6">
        <a
          href="/fertilizers/add"
          className="bg-green-700 text-white px-5 py-3 rounded-lg font-semibold shadow hover:bg-green-800 transition"
        >
          + Add Fertilizer
        </a>
      </div>

      {/* Grid of Fertilizer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Static Example Card (you will map real data later) */}
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <img
            src="https://via.placeholder.com/300x200"
            alt="Fertilizer"
            className="rounded-lg mb-4"
          />

          <h2 className="text-2xl font-bold text-green-700">Urea</h2>
          <p className="text-gray-600 mb-2">High nitrogen fertilizer.</p>

          <p className="text-lg font-semibold">Rs. 2500 / bag</p>

          <div className="flex justify-between mt-4">
            <a
              href="/fertilizers/update/123"
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Edit
            </a>
            <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition">
              Buy
            </button>
          </div>
        </div>

        {/* When you fetch from backend, replace with map() */}
      </div>
    </div>
  );
}
