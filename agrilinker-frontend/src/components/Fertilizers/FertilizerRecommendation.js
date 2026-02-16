import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiWind, FiLayers, FiActivity, FiSearch, FiCheckCircle, FiPackage, FiTarget } from "react-icons/fi";

export default function FertilizerRecommendation() {
  const [form, setForm] = useState({ cropType: "", soilType: "", growthStage: "" });
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.cropType || !form.soilType || !form.growthStage) {
        toast.warn("Please select all fields for an accurate insight.");
        return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8081/api/fertilizers/recommend", form);
      setRecommendation(res.data);
      toast.success("AI Analysis Complete!");
    } catch (err) {
      toast.error("Failed to get recommendation");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-4 flex items-center justify-center font-sans">
      <div className="max-w-3xl w-full bg-white/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white rounded-[3rem] overflow-hidden">
        
        {/* Header Section - Clean & Solid */}
        <div className="bg-gradient-to-r from-green-800 to-emerald-700 p-10 text-center relative overflow-hidden">
          <FiSearch className="text-white/10 text-9xl absolute -left-10 -top-10" />
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter relative z-10">
            Precision Agri-Advisor
          </h1>
          <p className="text-green-50 text-sm font-medium opacity-90 mt-2 relative z-10">
            Tailored Fertilizer Specs for Your Farm
          </p>
        </div>

        <div className="p-8 md:p-12">
          {/* Form Section */}
          <form className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                <FiWind className="text-green-600" /> Crop
              </label>
              <select name="cropType" className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-green-100 outline-none font-bold text-gray-700 shadow-sm transition-all cursor-pointer" onChange={handleChange}>
                <option value="">Select...</option>
                <option>Rice</option><option>Tea</option><option>Coconut</option><option>Vegetables</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                <FiLayers className="text-green-600" /> Soil
              </label>
              <select name="soilType" className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-green-100 outline-none font-bold text-gray-700 shadow-sm transition-all cursor-pointer" onChange={handleChange}>
                <option value="">Select...</option>
                <option>Sandy</option><option>Clay</option><option>Loamy</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                <FiActivity className="text-green-600" /> Stage
              </label>
              <select name="growthStage" className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-green-100 outline-none font-bold text-gray-700 shadow-sm transition-all cursor-pointer" onChange={handleChange}>
                <option value="">Select...</option>
                <option>Seedling</option><option>Flowering</option><option>Fruiting</option>
              </select>
            </div>

            <button type="submit" disabled={loading} className="md:col-span-3 bg-green-800 text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl hover:bg-green-900 transition-all active:scale-95 flex items-center justify-center gap-3">
              {loading ? "Calculating Optimum Levels..." : "Get Detailed Specification"}
            </button>
          </form>

          {/* Cleaned Result Display */}
          {recommendation && (
            <div className="animate-in fade-in zoom-in-95 duration-700 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Type & Formula Card - Clean emerald background */}
                <div className="bg-emerald-50/80 border border-emerald-100 p-6 rounded-[2.5rem] flex items-start gap-4 shadow-sm">
                  <div className="bg-emerald-600 text-white p-3 rounded-2xl shadow-lg shadow-emerald-100">
                    <FiPackage size={24} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest opacity-60">Ideal Formula</h4>
                    <p className="font-black text-emerald-900 text-lg">Organic / Liquid</p>
                    <span className="text-xs text-emerald-700/70 font-bold italic">Optimized for {form.growthStage} stage</span>
                  </div>
                </div>

                {/* Dosage Card - Clean blue background */}
                <div className="bg-blue-50/80 border border-blue-100 p-6 rounded-[2.5rem] flex items-start gap-4 shadow-sm">
                  <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-lg shadow-blue-100">
                    <FiTarget size={24} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-blue-800 uppercase tracking-widest opacity-60">Optimum Dosage</h4>
                    <p className="font-black text-blue-900 text-lg">250ml per Acre</p>
                    <span className="text-xs text-blue-700/70 font-bold italic">Dilute with 200L of water</span>
                  </div>
                </div>
              </div>

              {/* AI Explanation Note - Clean dark card */}
              <div className="bg-slate-900 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
                {/* Background Decoration Icon */}
                <FiCheckCircle className="absolute -right-8 -bottom-8 text-white/5 text-[10rem] pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-[2px] w-8 bg-green-500 rounded-full"></span>
                    <h3 className="text-green-400 font-black uppercase tracking-widest text-[10px]">AI Advisory Note</h3>
                  </div>
                  <p className="text-gray-100 font-medium leading-relaxed italic text-lg pr-4">
                    "{recommendation}"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}