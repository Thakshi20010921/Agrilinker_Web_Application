// src/components/Fertilizers/FertilizerButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function FertilizerButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    // Always redirect to Fertilizer Supplier login page
    navigate("/loginfertilizer");
  };

  return (
    <button
      onClick={handleClick}
      className="bg-green-700 text-white px-5 py-3 rounded-lg font-semibold shadow hover:bg-green-800 transition"
    >
      Fertilizers (Add/Update)
    </button>
  );
}
