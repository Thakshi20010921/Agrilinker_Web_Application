import React from "react";

export default function AddFertilizer() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow rounded-xl">
      <h1 className="text-3xl font-extrabold text-green-800 mb-6">
        Add Fertilizer
      </h1>

      <form className="space-y-6">
        {/* Name */}
        <div>
          <label className="font-semibold">Fertilizer Name</label>
          <input
            type="text"
            className="w-full border p-3 rounded-lg"
            placeholder="Enter fertilizer name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            className="w-full border p-3 rounded-lg"
            placeholder="Enter description"
            rows="3"
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <label className="font-semibold">Price (Rs.)</label>
          <input
            type="number"
            className="w-full border p-3 rounded-lg"
            placeholder="Enter price"
          />
        </div>

        {/* Unit */}
        <div>
          <label className="font-semibold">Unit</label>
          <input
            type="text"
            className="w-full border p-3 rounded-lg"
            placeholder="kg, bag, liter..."
          />
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold">Category</label>
          <select className="w-full border p-3 rounded-lg">
            <option>Organic</option>
            <option>Chemical</option>
            <option>Liquid</option>
            <option>Granular</option>
          </select>
        </div>

        {/* Stock */}
        <div>
          <label className="font-semibold">Stock</label>
          <input
            type="number"
            className="w-full border p-3 rounded-lg"
            placeholder="Available stock"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="font-semibold">Image URL</label>
          <input
            type="text"
            className="w-full border p-3 rounded-lg"
            placeholder="http://example.com/fert.png"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
        >
          Add Fertilizer
        </button>
      </form>
    </div>
  );
}
