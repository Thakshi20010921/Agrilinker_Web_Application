import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const EditProductPage = () => {
  const { id } = useParams(); // URL එකෙන් product ID එක ලබා ගනී
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [productData, setProductData] = useState({
    name: "",
    category: "",
    description: "",
    location: "",
    sellingPrice: "",
    quantity: "",
    unit: "kg",
    availability: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // 1. පරණ දත්ත ලබා ගැනීම (Fetch existing data)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/api/products/${id}`);
        setProductData(res.data);
        setPreviewUrl(`http://localhost:8081${res.data.product_image}`);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 2. දත්ත Update කිරීම
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // මෙතනදී අපි JSON දත්ත පමණක් යැවීමට Put request එක පාවිච්චි කරමු
      // (පින්තූරය වෙනස් කරන්නේ නැතිනම්)
      await axios.put(`http://localhost:8081/api/products/${id}`, productData);

      alert("Product updated successfully!");
      navigate("/my-products");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Error updating product.");
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center text-emerald-600 font-bold">
        Loading product details...
      </div>
    );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-xl shadow-emerald-900/5 border border-emerald-50 overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-600 p-8 text-white">
            <h1 className="text-2xl font-bold">
              Edit Product: {productData.name}
            </h1>
            <p className="opacity-80 text-sm mt-1">
              Update your harvest details below
            </p>
          </div>

          <form onSubmit={handleUpdate} className="p-8 md:p-12 space-y-8">
            {/* Row 1: Name and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-emerald-900 ml-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-2xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-emerald-900 ml-1">
                  Category
                </label>
                <select
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-2xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Grains">Grains</option>
                </select>
              </div>
            </div>

            {/* Row 2: Description */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-emerald-900 ml-1">
                Description
              </label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-5 py-3 rounded-2xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>

            {/* Row 3: Image Section */}
            <div className="bg-emerald-50/50 p-6 rounded-[2rem] border border-emerald-100 flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-md">
                <img
                  src={previewUrl}
                  alt="Current"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-emerald-900 mb-2">
                  Change Product Image
                </p>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="text-sm text-slate-500"
                />
              </div>
            </div>

            {/* Row 4: Pricing and Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-emerald-900 ml-1">
                  Price (LKR)
                </label>
                <input
                  type="number"
                  name="sellingPrice"
                  value={productData.sellingPrice}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-2xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-emerald-900 ml-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={productData.quantity}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-2xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-emerald-900 ml-1">
                  Unit
                </label>
                <select
                  name="unit"
                  value={productData.unit}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-2xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                >
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="Units">Units</option>
                </select>
              </div>
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center gap-3 ml-1">
              <input
                type="checkbox"
                name="availability"
                checked={productData.availability}
                onChange={handleChange}
                className="w-5 h-5 accent-emerald-600"
              />
              <label className="font-bold text-emerald-900">
                Available for Sale
              </label>
            </div>

            {/* Footer Buttons */}
            <div className="pt-8 border-t border-emerald-50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate("/my-products")}
                className="px-8 py-3.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-10 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-200 transition-all active:scale-95"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProductPage;
