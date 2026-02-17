// src/components/Fertilizers/FertilizerButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FiGrid } from "react-icons/fi";

export default function FertilizerButton() {
  const navigate = useNavigate();

  // 1. get data from storage 
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // string from main loging
  const rolesJson = localStorage.getItem("roles"); // jason from fertilizer loging

  // 2. is already logged user is a supplier 
  let isSupplier = false;

  if (role === "FERTILIZERSUPPLIER") {
    isSupplier = true;
  } else if (rolesJson) {
    try {
      const rolesArray = JSON.parse(rolesJson);
      if (Array.isArray(rolesArray) && rolesArray.includes("FERTILIZERSUPPLIER")) {
        isSupplier = true;
      }
    } catch (e) {
      console.error("Error parsing roles from localStorage", e);
    }
  }

  // is not supplier then dont show button
  if (!isSupplier) {
    return null;
  }

  const handleClick = () => {
    // is already logged then move to dashboard
    if (token) {
      navigate("/fertilizer-dashboard");
    } else {
      // if any reason not loging at any more then move to loging
      navigate("/loginfertilizer");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="group relative flex items-center gap-3 bg-gradient-to-r from-green-800 to-emerald-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-green-100 hover:shadow-green-300 transition-all transform hover:-translate-y-1 active:scale-95 overflow-hidden"
    >
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      <FiGrid className="text-lg relative z-10" />
      <span className="relative z-10">Manage Products</span>
    </button>
  );
}