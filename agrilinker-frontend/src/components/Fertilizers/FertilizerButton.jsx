// src/components/Fertilizers/FertilizerButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FiGrid } from "react-icons/fi"; // ලස්සන Icon එකක් දැම්මා

export default function FertilizerButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    // ✅ Always show login page (ignore already logged-in user)
    navigate("/loginfertilizer");
  };

  return (
    <button
      onClick={handleClick}
      className="group relative flex items-center gap-3 bg-gradient-to-r from-green-800 to-emerald-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-green-100 hover:shadow-green-300 transition-all transform hover:-translate-y-1 active:scale-95 overflow-hidden"
    >
      {/* Button එක ඇතුලේ පොඩි glow effect එකක් */}
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      
      <FiGrid className="text-lg relative z-10" />
      <span className="relative z-10">Manage Products</span>
    </button>
  );
}