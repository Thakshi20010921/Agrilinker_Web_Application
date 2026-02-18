import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiPlusCircle, FiUploadCloud, FiInfo, FiTag, FiMapPin, FiPackage } from "react-icons/fi";

export default function AddFertilizer() {
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
    district: ""
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["price", "stock", "quantityInside"].includes(name)) {
      if (name === "price") {
        if (!/^\d*\.?\d*$/.test(value)) return;
      } else {
        if (!/^\d*$/.test(value)) return;
      }
    }

    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "name",
      "description",
      "price",
      "unit",
      "category",
      "type",
      "stock",
      "district"
    ];

    for (let field of requiredFields) {
      if (!form[field] || form[field].toString().trim() === "") {
        toast.error(`Please fill the ${field} field.`);
        return;
      }
    }

    if (!imageFile) {
      toast.error("Please upload an image for the fertilizer.");
      return;
    }

    try {
      // ✅ 1. Upload image
      const fileData = new FormData();
      fileData.append("file", imageFile);

      const uploadRes = await axios.post(
        "http://localhost:8081/api/fertilizers/upload-image",
        fileData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const imageUrl = uploadRes.data.startsWith("http")
        ? uploadRes.data.replace("http://localhost:8081", "")
        : uploadRes.data;

      // ✅ 2. Save fertilizer with Supplier Email
      await axios.post("http://localhost:8081/api/fertilizers", {
        ...form,
        supplierEmail: localStorage.getItem("email"),
        price: Number(form.price),
        stock: Number(form.stock),
        quantityInside: form.quantityInside
          ? Number(form.quantityInside)
          : null,
        imageUrl
      });

      toast.success("Fertilizer added successfully!");
      setTimeout(() => navigate("/fertilizer-dashboard"), 800);

    } catch (err) {
      console.error(err);
      toast.error("Error adding fertilizer!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white rounded-[2.5rem] overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-700 to-emerald-600 p-8 text-center">
          <FiPlusCircle className="text-white/20 text-6xl absolute right-10 top-5" />
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
            Add New Fertilizer
          </h1>
          <p className="text-green-50 text-sm font-medium opacity-80 mt-1">
            List your product in the premium fertilizer palace
          </p>
        </div>

        <form className="p-8 md:p-12 space-y-7" onSubmit={handleSubmit}>
          
          {/* Product Basic Info */}
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                <FiTag className="text-green-600" /> Fertilizer Name
              </label>
              <input type="text" name="name" placeholder="e.g. Premium Urea Plus"
                className="w-full bg-gray-50/50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-green-100 transition-all outline-none font-bold text-gray-700 shadow-sm"
                onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                <FiInfo className="text-green-600" /> Description
              </label>
              <textarea name="description" placeholder="Describe the benefits and usage..."
                className="w-full bg-gray-50/50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-green-100 transition-all outline-none font-medium text-gray-600 shadow-sm"
                rows="3" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Pricing & Stock Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-gray-400 ml-1 tracking-widest">Price (Rs.)</label>
              <input type="number" name="price" placeholder="0.00"
                className="w-full bg-gray-50/50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-green-100 transition-all outline-none font-black text-green-700 shadow-sm"
                onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-gray-400 ml-1 tracking-widest">Initial Stock</label>
              <div className="relative">
                <FiPackage className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input type="number" name="stock" placeholder="Qty"
                  className="w-full bg-gray-50/50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-green-100 transition-all outline-none font-bold text-gray-700 shadow-sm"
                  onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Units & Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-gray-400 ml-1 tracking-widest">Selling Unit</label>
              <select name="unit" className="w-full bg-gray-50/50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-green-100 transition-all outline-none font-bold text-gray-600 cursor-pointer shadow-sm"
                onChange={handleChange}>
                <option value="">Select Unit</option>
                <option value="bottle">Bottle</option>
                <option value="bag">Bag</option>
                <option value="kg">Kg</option>
                <option value="liter">Liter</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-1">
              <label className="text-[11px] font-black uppercase text-gray-400 ml-1 tracking-widest">Category</label>
              <select name="category" className="w-full bg-gray-50/50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-green-100 transition-all outline-none font-bold text-gray-600 cursor-pointer shadow-sm"
                onChange={handleChange}>
                <option value="">Select Category</option>
                <option>Organic</option>
                <option>Chemical</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-gray-400 ml-1 tracking-widest">Form Type</label>
              <select name="type" className="w-full bg-gray-50/50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-green-100 transition-all outline-none font-bold text-gray-600 cursor-pointer shadow-sm"
                onChange={handleChange}>
                <option value="">Select Type</option>
                <option value="Liquid">Liquid</option>
              <option value="Granular">Granular</option>
              <option value="Water-Soluble">Water-Soluble</option>
              <option value="Powder">Powder</option>
              <option value="Slow-Release">Slow-Release</option>
              </select>
            </div>
          </div>

          {/* Conditional Field & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(form.unit === "bag" || form.unit === "bottle") && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <label className="text-[11px] font-black uppercase text-green-600 ml-1 tracking-widest">Net Content (Kg/L)</label>
                <input type="number" name="quantityInside"
                  placeholder="e.g. 50"
                  className="w-full bg-green-50/30 border border-green-100 p-4 rounded-2xl focus:ring-4 focus:ring-green-100 transition-all outline-none font-bold text-green-700 shadow-sm"
                  onChange={handleChange} />
              </div>
            )}

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                <FiMapPin className="text-green-600" /> District
              </label>
              <select name="district" className="w-full bg-gray-50/50 border-none p-4 rounded-2xl focus:ring-4 focus:ring-green-100 transition-all outline-none font-bold text-gray-600 cursor-pointer shadow-sm"
                onChange={handleChange}>
                <option value="">Select District</option>
                {["Ampara","Anuradhapura","Badulla","Batticaloa","Colombo","Galle","Gampaha","Hambantota","Jaffna","Kalutara","Kandy","Kegalle","Kilinochchi","Kurunegala","Mannar","Matale","Matara","Moneragala","Mullaitivu","Nuwara Eliya","Polonnaruwa","Puttalam","Ratnapura","Trincomalee","Vavuniya"].map(d => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[11px] font-black uppercase text-gray-400 ml-1 tracking-widest">
              <FiUploadCloud className="text-green-600" /> Product Image
            </label>
            <div className="relative group">
              <div className={`w-full border-2 border-dashed rounded-[2rem] p-8 transition-all flex flex-col items-center justify-center gap-2 ${imageFile ? 'border-green-500 bg-green-50/50' : 'border-gray-200 hover:border-green-400 bg-gray-50/30'}`}>
                <input type="file" accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange} />
                <FiUploadCloud className={`text-4xl ${imageFile ? 'text-green-600' : 'text-gray-300'}`} />
                <p className={`text-sm font-bold ${imageFile ? 'text-green-700' : 'text-gray-400'}`}>
                  {imageFile ? imageFile.name : "Drop product image here or click to browse"}
                </p>
                {imageFile && <span className="text-[10px] text-green-600 font-black uppercase">Click to change image</span>}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit"
            className="w-full bg-gradient-to-r from-green-700 to-emerald-600 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-xl shadow-green-200 hover:shadow-green-300 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 mt-4">
            <FiPlusCircle size={20} />
            Add Fertilizer Product
          </button>
        </form>
      </div>
    </div>
  );
}