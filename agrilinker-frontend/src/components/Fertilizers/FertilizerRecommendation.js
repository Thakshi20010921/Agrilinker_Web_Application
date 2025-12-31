import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function FertilizerRecommendation() {
  const [form, setForm] = useState({ cropType: "", soilType: "", growthStage: "" });
  const [recommendation, setRecommendation] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/api/fertilizers/recommend", form);
      setRecommendation(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to get recommendation");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Fertilizer Recommendation</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label>Crop Type</label>
          <select name="cropType" className="w-full border p-2 rounded" onChange={handleChange}>
            <option value="">Select Crop</option>
            <option>Rice</option>
            <option>Tea</option>
            <option>Coconut</option>
            <option>Vegetables</option>
          </select>
        </div>

        <div>
          <label>Soil Type</label>
          <select name="soilType" className="w-full border p-2 rounded" onChange={handleChange}>
            <option value="">Select Soil</option>
            <option>Sandy</option>
            <option>Clay</option>
            <option>Loamy</option>
          </select>
        </div>

        <div>
          <label>Growth Stage</label>
          <select name="growthStage" className="w-full border p-2 rounded" onChange={handleChange}>
            <option value="">Select Stage</option>
            <option>Seedling</option>
            <option>Flowering</option>
            <option>Fruiting</option>
          </select>
        </div>

        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">Get Recommendation</button>
      </form>

      {recommendation && (
        <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-700 rounded">
          <strong>Recommendation:</strong> {recommendation}
        </div>
      )}
    </div>
  );
}
