import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const farmerId = localStorage.getItem("email");
  const navigate = useNavigate();

  // 1. Fetch products from Backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/api/products/farmer/${farmerId}`,
        );
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };
    if (farmerId) fetchProducts();
  }, [farmerId]);

  // 2. Delete Product Function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:8081/api/products/${id}`);
        setProducts(products.filter((p) => p.id !== id)); // Remove from UI
      } catch (err) {
        alert("Could not delete product.");
      }
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center font-bold text-emerald-600">
        Loading your harvest...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      {/* PAGE HEADER */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-black text-emerald-950">
          My Product Listings
        </h1>
        <p className="text-emerald-600">
          Manage and track your available stock
        </p>
      </div>

      {/* QUICK STATS BAR */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-50">
          <p className="text-sm font-bold text-slate-400 uppercase">
            Active Listings
          </p>
          <p className="text-3xl font-black text-emerald-600">
            {products.length}
          </p>
        </div>
        <div className="bg-emerald-600 p-6 rounded-3xl shadow-lg shadow-emerald-200 text-white">
          <p className="text-sm font-bold opacity-80 uppercase">In Stock</p>
          <p className="text-3xl font-black text-white">
            {products.reduce((acc, curr) => acc + Number(curr.quantity), 0)}{" "}
            Units
          </p>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-emerald-50 hover:scale-[1.02] transition-transform duration-300"
          >
            {/* Product Image */}
            <div className="h-48 w-full bg-slate-200 relative">
              <img
                src={`http://localhost:8081${product.product_image}`}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300?text=No+Image";
                }}
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-600 shadow-sm">
                {product.category}
              </div>
            </div>

            {/* Product Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-emerald-950">
                  {product.name}
                </h3>
                <span className="text-emerald-600 font-black text-lg">
                  LKR {product.sellingPrice}
                </span>
              </div>

              <div className="flex items-center text-slate-500 text-sm mb-6 space-x-4">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                  Qty: {product.quantity} {product.unit}
                </span>
                <span>📍 {product.location}</span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate(`/edit-product/${product.id}`)}
                  className="py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="py-3 rounded-2xl bg-white border border-red-100 text-red-500 font-bold hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Products Placeholder */}
      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg">No products listed yet.</p>
          <button
            onClick={() => navigate("/add-product")}
            className="mt-4 text-emerald-600 font-bold underline"
          >
            Add your first harvest
          </button>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
