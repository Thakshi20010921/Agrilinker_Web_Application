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
    price: "",
    quantity: "",
    unit: "kg",
    status: "available",
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
      navigate("/farmer/my-products");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Error updating product.Pleace cheack inputs");
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center text-emerald-600 font-bold">
        Loading product details...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFB] p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* TOPIC / HEADER */}
        <div className="mb-8">
          <h1 className="text-5xl font-black text-emerald-950 tracking-tight">
            Edit Your Product Details
          </h1>
          <p className="text-emerald-600 font-medium">
            Update your harvest details and stock information
          </p>
        </div>
        {/* PAGE LAYOUT GRID */}
        <div className="flex flex-col lg:flex-row gap-40 bg-slate-100 p-10 rounded-[10px]">
          {/* LEFT SIDE: FORM SECTION (75% width) */}
          <div className="lg:w-3/4">
            <div className="flex min-h-screen bg-slate-50">
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

                  <form
                    onSubmit={handleUpdate}
                    className="p-8 md:p-12 space-y-8"
                  >
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

                    {/* Row 2-3: Description */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-emerald-900 ml-1">
                        Location
                      </label>
                      <textarea
                        name="location"
                        value={productData.location}
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
                          name="price"
                          value={productData.price}
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

                    <div className="pt-4">
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={productData.status === "available"}
                            onChange={(e) =>
                              setProductData({
                                ...productData,
                                status: e.target.checked
                                  ? "available"
                                  : "unavailable",
                              })
                            }
                          />

                          <div
                            className={`block w-14 h-8 rounded-full transition-colors ${
                              productData.status === "available"
                                ? "bg-emerald-500"
                                : "bg-gray-300"
                            }`}
                          ></div>

                          <div
                            className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                              productData.status === "available"
                                ? "translate-x-6"
                                : ""
                            }`}
                          ></div>
                        </div>

                        <div className="ml-4">
                          <span className="text-emerald-950 font-bold block">
                            Currently Available
                          </span>
                          <span className="text-emerald-600/70 text-lg">
                            If turned off, buyers see this product as not
                            available.
                          </span>
                        </div>
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
          </div>
          <div className="lg:w-1/4 mt-[160px]">
            <div className="sticky top-10 space-y-4  ">
              {/* --- NEW RIGHT NAVIGATION CARD --- */}
              <div className="lg:w-1/4 h-fit pt-0 pr-0 p-8 space-y-4 ">
                <div className=" rounded-[0.5rem] pb-6 pt-0 ">
                  <div className="flex flex-col items-center space-y-[50px]">
                    {[
                      {
                        name: "Dashboard",
                        icon: "",
                        path: "/farmer/dashboard",
                      },
                      { name: "Analytics", icon: "", path: "/analytics" },
                      { name: "My Orders", icon: "", path: "/orders" },
                      {
                        name: "My Products",
                        icon: "",
                        path: "/farmer/my-products",
                      },
                    ].map((item) => (
                      <button
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        className="flex items-center justify-center w-[200px] text-xl bg-emerald-600 items-center h-[100px] space-x-4 s p-4  rounded-full hover:bg-emerald-400 text-white font-semibold transition-all duration-300 group active:scale-95 shadow-lg shadow-emerald-200 border border-transparent hover:border-emerald-500"
                      >
                        <span className="text-xl group-hover:scale-110 transition-transform">
                          {item.icon}
                        </span>
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
