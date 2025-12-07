import React from "react";

export default function UpdateFertilizer() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow rounded-xl">
      <h1 className="text-3xl font-extrabold text-green-800 mb-6">
        Update Fertilizer
      </h1>

      <form className="space-y-6">
        {/* All fields same as AddFertilizer.js */}
        <div>
          <label className="font-semibold">Fertilizer Name</label>
          <input type="text" className="w-full border p-3 rounded-lg" />
        </div>

        <div>
          <label className="font-semibold">Description</label>
          <textarea className="w-full border p-3 rounded-lg" rows="3"></textarea>
        </div>

        <div>
          <label className="font-semibold">Price (Rs.)</label>
          <input type="number" className="w-full border p-3 rounded-lg" />
        </div>

        <div>
          <label className="font-semibold">Unit</label>
          <input type="text" className="w-full border p-3 rounded-lg" />
        </div>

        <div>
          <label className="font-semibold">Category</label>
          <select className="w-full border p-3 rounded-lg">
            <option>Organic</option>
            <option>Chemical</option>
            <option>Liquid</option>
            <option>Granular</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Stock</label>
          <input type="number" className="w-full border p-3 rounded-lg" />
        </div>

        <div>
          <label className="font-semibold">Image URL</label>
          <input type="text" className="w-full border p-3 rounded-lg" />
        </div>

        <button
          type="submit"
          className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition"
        >
          Update Fertilizer
        </button>
      </form>
    </div>
  );
}
