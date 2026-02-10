import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom"; // Import this for navigation

const FarmerDashboard = () => {
  const [products, setProducts] = useState([]);
  const farmerEmail = localStorage.getItem("email"); // or use stored farmerEmail
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/api/products/farmer/${farmerEmail}`,
        );
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [farmerEmail]);

  return (
    <div className="relative min-h-screen bg-slate-50 p-8">
      {/* --- HEADER SECTION --- */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-emerald-950">
          Farmer Dashboard
        </h1>
        <p className="text-emerald-600 font-medium">
          Manage your harvests and listings
        </p>
      </div>

      {/* --- STATS CARD --- */}

      <button
        type="button"
        onClick={() => navigate("/farmer/add-product2")}
        className="w-[110px] h-[110px] bg-white p-6 rounded-full shadow-sm border border-emerald-100 mb-8 inline-block text-left"
      >
        <h2 className="text-sm font-bold text-emerald-800 uppercase tracking-wider">
          Add Products
        </h2>
      </button>

      <button
        type="button"
        onClick={() => navigate("/farmer/my-products")}
        className="w-[110px] h-[110px] bg-white p-6 rounded-full shadow-sm border border-emerald-100 mb-8 inline-block text-left"
      >
        <h2 className="text-sm font-bold text-emerald-800 uppercase tracking-wider">
          My Products
        </h2>
      </button>
      <br></br>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 mb-8 inline-block">
        <h2 className="text-sm font-bold text-emerald-800 uppercase tracking-wider">
          Total Products
        </h2>
        <p className="text-4xl font-black text-emerald-600">
          {products.length}
        </p>
      </div>
    </div>
  );
};

export default FarmerDashboard;
