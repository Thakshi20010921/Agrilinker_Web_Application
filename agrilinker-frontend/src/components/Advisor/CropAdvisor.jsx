import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiWind, FiLayers, FiActivity, FiSearch, FiCheckCircle, FiPackage, FiTarget } from "react-icons/fi";

export default function CropAdvisor() {
  const [form, setForm] = useState({ cropType: "", soilType: "", growthStage: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.cropType || !form.soilType || !form.growthStage) {
      toast.warn("Please select all parameters.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8081/api/advisor/analyze", form);
      setResult(res.data);
      toast.success("Crop Analysis Complete!");
    } catch (err) {
      toast.error("Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white/90 backdrop-blur-xl shadow-2xl border border-white rounded-[3rem] overflow-hidden">
        
        <div className="bg-gradient-to-r from-green-800 to-emerald-700 p-10 text-center relative overflow-hidden">
          <FiSearch className="text-white/10 text-9xl absolute -left-10 -top-10" />
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter relative z-10">Crop Advisor</h1>
          <p className="text-green-50 text-sm font-medium mt-2 relative z-10">Smart AI Input Recommendations</p>
        </div>

        <div className="p-8 md:p-12">
          <form className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10" onSubmit={handleSubmit}>
           <div className="space-y-2">
  <label className="text-[10px] font-black uppercase text-gray-400 ml-1 flex gap-2 tracking-widest">
    <FiWind className="text-green-600"/> Crop
  </label>
  
  <input 
    type="text"
    name="cropType"
    value={form.cropType}
    onChange={handleChange}
    placeholder="Type crop name (e.g. Chili, Carrot)"
    className="w-full bg-gray-50 border-none p-4 rounded-2xl outline-none font-bold text-gray-700 shadow-sm transition-all focus:ring-4 focus:ring-green-100"
    required
  />
</div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 flex gap-2 tracking-widest"><FiLayers className="text-green-600"/> Soil</label>
              <select name="soilType" onChange={handleChange} className="w-full bg-gray-50 border-none p-4 rounded-2xl outline-none font-bold text-gray-700 shadow-sm transition-all focus:ring-4 focus:ring-green-100">
                <option value="">Select...</option>
                <option value="Sandy">Sandy</option><option value="Clay">Clay</option><option value="Loamy">Loamy</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 flex gap-2 tracking-widest"><FiActivity className="text-green-600"/> Stage</label>
              <select name="growthStage" onChange={handleChange} className="w-full bg-gray-50 border-none p-4 rounded-2xl outline-none font-bold text-gray-700 shadow-sm transition-all focus:ring-4 focus:ring-green-100">
                <option value="">Select...</option>
                <option value="Seedling">Seedling</option><option value="Flowering">Flowering</option><option value="Fruiting">Fruiting</option>
              </select>
            </div>

            <button type="submit" disabled={loading} className="md:col-span-3 bg-green-800 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl transition-all hover:bg-green-900 active:scale-95">
              {loading ? "Analyzing Data..." : "Generate Analysis"}
            </button>
          </form>

          {result && (
            <div className="animate-in fade-in zoom-in-95 duration-700 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50/80 border border-emerald-100 p-6 rounded-[2.5rem] flex items-start gap-4 shadow-sm">
                  <div className="bg-emerald-600 text-white p-3 rounded-2xl shadow-lg shadow-emerald-100"><FiPackage size={24} /></div>
                  <div>
                    <h4 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest opacity-60">Ideal Formula</h4>
                    <p className="font-black text-emerald-900 text-lg">{result.idealFormula}</p>
                    <span className="text-xs text-emerald-700/70 font-bold italic">Tailored for {form.cropType}</span>
                  </div>
                </div>

                <div className="bg-blue-50/80 border border-blue-100 p-6 rounded-[2.5rem] flex items-start gap-4 shadow-sm">
                  <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-lg shadow-blue-100"><FiTarget size={24} /></div>
                  <div>
                    <h4 className="text-[10px] font-black text-blue-800 uppercase tracking-widest opacity-60">Optimum Dosage</h4>
                    <p className="font-black text-blue-900 text-lg">{result.dosage}</p>
                    <span className="text-xs text-blue-700/70 font-bold italic">Application Rate</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <FiCheckCircle className="absolute -right-8 -bottom-8 text-white/5 text-[10rem] pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="text-green-400 font-black uppercase tracking-widest text-[10px] mb-4">Advisory Note for you...</h3>
                  <p className="text-gray-100 font-medium italic text-lg pr-4">"{result.aiNote}"</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}