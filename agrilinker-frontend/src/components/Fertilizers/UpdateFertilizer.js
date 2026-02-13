import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdateFertilizer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    unit: "",
    category: "", // ✅ Add form එකේ වගේම දැන් මෙතනත් තියෙනවා
    type: "",     // ✅ Add form එකේ වගේම දැන් මෙතනත් තියෙනවා
    stock: "",
    quantityInside: "",
    district: "", // ✅ Add form එකේ වගේම දැන් මෙතනත් තියෙනවා
    imageUrl: "",
    supplierEmail: ""
  });

  const [uploading, setUploading] = useState(false);

  // 1. පරණ දත්ත load කිරීම
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
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-2xl my-10 border-t-8 border-green-700">
      <h2 className="text-3xl font-bold text-green-800 mb-6 font-serif">Update Fertilizer Details</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Name & Description */}
        <div className="md:col-span-2">
          <label className="font-bold text-gray-700">Product Name *</label>
          <input name="name" value={form.name} className="w-full border p-3 rounded-lg mt-1" onChange={handleChange} required />
        </div>
        
        <div className="md:col-span-2">
          <label className="font-bold text-gray-700">Description *</label>
          <textarea name="description" value={form.description} className="w-full border p-3 rounded-lg mt-1" onChange={handleChange} required />
        </div>

        {/* Category & Type (දැන් මේවා Update එකේ පේනවා) */}
        <div>
          <label className="font-bold text-gray-700">Category *</label>
          <select name="category" value={form.category} className="w-full border p-3 rounded-lg mt-1" onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="Organic">Organic</option>
            <option value="Chemical">Chemical</option>
          </select>
        </div>

        <div>
          <label className="font-bold text-gray-700">Type *</label>
          <select name="type" value={form.type} className="w-full border p-3 rounded-lg mt-1" onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="Granular">Granular</option>
            <option value="Liquid">Liquid</option>
            <option value="Powder">Powder</option>
          </select>
        </div>

        {/* Price & Unit */}
        <div>
          <label className="font-bold text-gray-700">Price (Rs.) *</label>
          <input name="price" type="number" value={form.price} className="w-full border p-3 rounded-lg mt-1" onChange={handleChange} required />
        </div>

        <div>
          <label className="font-bold text-gray-700">Selling Unit *</label>
          <select name="unit" value={form.unit} className="w-full border p-3 rounded-lg mt-1" onChange={handleChange} required>
            <option value="bag">Bag</option>
            <option value="bottle">Bottle</option>
            <option value="kg">Kg (Bulk)</option>
            <option value="liter">Liter (Bulk)</option>
          </select>
        </div>

        {/* District */}
        <div>
          <label className="font-bold text-gray-700">District *</label>
          <select name="district" value={form.district} className="w-full border p-3 rounded-lg mt-1" onChange={handleChange} required>
            <option value="Ampara">Ampara</option>
<option value="Anuradhapura">Anuradhapura</option>
<option value="Badulla">Badulla</option>
<option value="Batticaloa">Batticaloa</option>
<option value="Colombo">Colombo</option>
<option value="Galle">Galle</option>
<option value="Gampaha">Gampaha</option>
<option value="Hambantota">Hambantota</option>
<option value="Jaffna">Jaffna</option>
<option value="Kalutara">Kalutara</option>
<option value="Kandy">Kandy</option>
<option value="Kegalle">Kegalle</option>
<option value="Kilinochchi">Kilinochchi</option>
<option value="Kurunegala">Kurunegala</option>
<option value="Mannar">Mannar</option>
<option value="Matale">Matale</option>
<option value="Matara">Matara</option>
<option value="Moneragala">Moneragala</option>
<option value="Mullaitivu">Mullaitivu</option>
<option value="Nuwara Eliya">Nuwara Eliya</option>
<option value="Polonnaruwa">Polonnaruwa</option>
<option value="Puttalam">Puttalam</option>
<option value="Ratnapura">Ratnapura</option>
<option value="Trincomalee">Trincomalee</option>
<option value="Vavuniya">Vavuniya</option>
          </select>
        </div>

        {/* Stock */}
        <div>
          <label className="font-bold text-gray-700 capitalize">Stock (In {form.unit}s) *</label>
          <input name="stock" type="number" value={form.stock} className="w-full border p-3 rounded-lg mt-1 border-green-200" onChange={handleChange} required />
        </div>

        {/* Quantity Inside Logic */}
        {(form.unit === "bag" || form.unit === "bottle") && (
          <div className="md:col-span-2 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <label className="block font-bold text-blue-800">
              {form.unit === "bag" ? "Weight per Bag (kg)" : "Volume per Bottle (L)"} *
            </label>
            <input name="quantityInside" type="number" step="0.01" value={form.quantityInside || ""} className="w-full border p-2 rounded mt-1 border-blue-200" onChange={handleChange} required />
          </div>
        )}

        {/* Image Display & Change */}
        <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg border">
          <label className="font-bold block mb-2">Change Image</label>
          <div className="flex items-center gap-4">
            <img src={form.imageUrl} alt="preview" className="w-24 h-24 object-cover rounded-xl border-2 border-white shadow-md" />
            <input type="file" onChange={handleFileUpload} />
          </div>
          {uploading && <p className="text-blue-600 mt-2 animate-pulse font-semibold">Uploading...</p>}
        </div>

        <button type="submit" className="md:col-span-2 bg-green-700 text-white p-4 rounded-xl font-bold hover:bg-green-800 shadow-lg transform transition active:scale-95">
          Save All Changes
        </button>
      </form>
    </div>
  );
}