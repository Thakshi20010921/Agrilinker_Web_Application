import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEdit3, FiUploadCloud, FiInfo, FiTag, FiMapPin, FiPackage, FiSave } from "react-icons/fi";

export default function UpdateFertilizer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    unit: "",
    category: "",
    type: "",
    stock: "",
    quantityInside: "",
    district: "",
    imageUrl: "",
    supplierEmail: ""
  });

  const [uploading, setUploading] = useState(false);

  // 1. loading old data
  useEffect(() => {
    axios.get(`http://localhost:8081/api/fertilizers/${id}`)
      .then(res => {
        setForm(res.data);
      })
      .catch(() => toast.error("Failed to load fertilizer data"));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("http://localhost:8081/api/fertilizers/upload-image", formData);
      setForm({ ...form, imageUrl: res.data });
      toast.success("Image updated!");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const finalData = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      quantityInside: (form.unit === "bag" || form.unit === "bottle") ? Number(form.quantityInside) : null
    };

    try {
      await axios.put(`http://localhost:8081/api/fertilizers/${id}`, finalData);
      toast.success("Updated successfully!");
      setTimeout(() => navigate("/fertilizer-dashboard"), 800);
    } catch (err) {
      toast.error("Update failed! Please check all fields.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white rounded-[2.5rem] overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-800 to-emerald-700 p-8 text-center relative overflow-hidden">
          <FiEdit3 className="text-white/10 text-8xl absolute -right-4 -top-4 rotate-12" />
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter relative z-10">
            Update Fertilizer Details
          </h1>
          <p className="text-green-50 text-sm font-medium opacity-80 mt-1 relative z-10">
            Keep your product information accurate and up to date
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
          
          {/* Name & Description Grid */}
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                <FiTag className="text-green-600" /> Product Name
              </label>
              <input name="name" value={form.name} 
                className="w-full bg-gray-50/50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-green-100 transition-all outline-none font-bold text-gray-700 shadow-sm"
                onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                <FiInfo className="text-green-600" /> Description
              </label>
              <textarea name="description" value={form.description} 
                className="w-full bg-gray-50/50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-green-100 transition-all outline-none font-medium text-gray-600 shadow-sm"
                rows="3" onChange={handleChange} required />
            </div>
          </div>

          {/* 4-Grid Layout for Category, Type, Price, Unit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-gray-400 ml-1 tracking-widest">Category</label>
              <select name="category" value={form.category} className="w-full bg-gray-50/50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-green-100 transition-all outline-none font-bold text-gray-600 cursor-pointer shadow-sm" onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="Organic">Organic</option>
                <option value="Chemical">Chemical</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-gray-400 ml-1 tracking-widest">Form Type</label>
              <select name="type" value={form.type} className="w-full bg-gray-50/50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-green-100 transition-all outline-none font-bold text-gray-600 cursor-pointer shadow-sm" onChange={handleChange} required>
                <option value="">Select Type</option>
                <option value="Granular">Granular</option>
                <option value="Liquid">Liquid</option>
                <option value="Powder">Powder</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-gray-400 ml-1 tracking-widest">Price (Rs.)</label>
              <input name="price" type="number" value={form.price} className="w-full bg-gray-50/50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-green-100 transition-all outline-none font-black text-green-700 shadow-sm" onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-gray-400 ml-1 tracking-widest">Selling Unit</label>
              <select name="unit" value={form.unit} className="w-full bg-gray-50/50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-green-100 transition-all outline-none font-bold text-gray-600 cursor-pointer shadow-sm" onChange={handleChange} required>
                <option value="bag">Bag</option>
                <option value="bottle">Bottle</option>
                <option value="kg">Kg (Bulk)</option>
                <option value="liter">Liter (Bulk)</option>
              </select>
            </div>
          </div>

          {/* District & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                <FiMapPin className="text-green-600" /> District
              </label>
              <select name="district" value={form.district} className="w-full bg-gray-50/50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-green-100 transition-all outline-none font-bold text-gray-600 cursor-pointer shadow-sm" onChange={handleChange} required>
                {["Ampara","Anuradhapura","Badulla","Batticaloa","Colombo","Galle","Gampaha","Hambantota","Jaffna","Kalutara","Kandy","Kegalle","Kilinochchi","Kurunegala","Mannar","Matale","Matara","Moneragala","Mullaitivu","Nuwara Eliya","Polonnaruwa","Puttalam","Ratnapura","Trincomalee","Vavuniya"].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                <FiPackage className="text-green-600" /> Current Stock
              </label>
              <input name="stock" type="number" value={form.stock} className="w-full bg-gray-50/50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-green-100 transition-all outline-none font-bold text-gray-700 shadow-sm" onChange={handleChange} required />
            </div>
          </div>

          {/* Quantity Inside Logic (Animated) */}
          {(form.unit === "bag" || form.unit === "bottle") && (
            <div className="animate-in fade-in slide-in-from-top-2 bg-green-50/50 p-6 rounded-[2rem] border border-green-100 flex flex-col gap-2">
              <label className="block font-black text-green-800 text-[11px] uppercase tracking-widest">
                {form.unit === "bag" ? "Weight per Bag (kg)" : "Volume per Bottle (L)"} *
              </label>
              <input name="quantityInside" type="number" step="0.01" value={form.quantityInside || ""} 
                className="w-full bg-white border-none p-3 rounded-xl focus:ring-4 focus:ring-green-100 outline-none font-bold text-green-700 shadow-sm"
                onChange={handleChange} required />
            </div>
          )}

          {/* Image Management */}
          <div className="bg-gray-50/50 p-6 rounded-[2.5rem] border border-gray-100">
            <label className="text-[11px] font-black uppercase text-gray-400 ml-1 tracking-widest mb-4 block">
              Product Media
            </label>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative group">
                <img src={form.imageUrl} alt="preview" className="w-32 h-32 object-cover rounded-[2rem] border-4 border-white shadow-xl transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <FiUploadCloud className="text-white text-2xl" />
                </div>
              </div>
              
              <div className="flex-grow w-full">
                <div className="relative w-full">
                  <input type="file" onChange={handleFileUpload} 
                    className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  <div className="w-full border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-green-400 transition-colors">
                    <p className="text-sm font-bold text-gray-400">Click to upload a new image</p>
                    <p className="text-[10px] text-gray-300 uppercase font-black mt-1">PNG, JPG or WEBP (Max 2MB)</p>
                  </div>
                </div>
                {uploading && (
                  <div className="mt-3 flex items-center gap-2 text-emerald-600 font-bold text-xs animate-pulse">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div> Uploading new media...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" 
            className="w-full bg-gradient-to-r from-green-700 to-emerald-600 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-xl shadow-green-200 hover:shadow-green-300 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
            <FiSave size={20} />
            Save All Changes
          </button>
        </form>
      </div>
    </div>
  );
}