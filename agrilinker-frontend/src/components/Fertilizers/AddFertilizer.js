import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

      const imageUrl = uploadRes.data;

      // ✅ 2. Save fertilizer with Supplier Email
      await axios.post("http://localhost:8081/api/fertilizers", {
        ...form,
        supplierEmail: localStorage.getItem("email"), // 👈 මෙන්න මචං අලුත් කෑල්ල!
        price: Number(form.price),
        stock: Number(form.stock),
        quantityInside: form.quantityInside
          ? Number(form.quantityInside)
          : null,
        imageUrl
      });

      toast.success("Fertilizer added successfully!");
      
      // ✅ වැඩේ ඉවර වුණාම Marketplace එකට නෙවෙයි, Supplier ගේ Dashboard එකටම යමු
      setTimeout(() => navigate("/fertilizer-dashboard"), 800);

    } catch (err) {
      console.error(err);
      toast.error("Error adding fertilizer!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow rounded-xl">
      <h1 className="text-3xl font-extrabold text-green-800 mb-6">
        Add Fertilizer
      </h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Fertilizer Name"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange} />

        <textarea name="description" placeholder="Description"
          className="w-full border p-3 rounded-lg"
          rows="3" onChange={handleChange}></textarea>

        <input type="number" name="price" placeholder="Price"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange} />

        <select name="unit" className="w-full border p-3 rounded-lg"
          onChange={handleChange}>
          <option value="">Select Unit</option>
          <option value="bottle">Bottle</option>
          <option value="bag">Bag</option>
          <option value="kg">Kg</option>
          <option value="liter">Liter</option>
        </select>

        {(form.unit === "bag" || form.unit === "bottle") && (
          <input type="number" name="quantityInside"
            placeholder="Quantity Inside (Kg/L)"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange} />
        )}

        <select name="category" className="w-full border p-3 rounded-lg"
          onChange={handleChange}>
          <option value="">Category</option>
          <option>Organic</option>
          <option>Chemical</option>
        </select>

        <select name="type" className="w-full border p-3 rounded-lg"
          onChange={handleChange}>
          <option value="">Type</option>
          <option>Liquid</option>
          <option>Granular</option>
          <option>Powder</option>
        </select>

        <select name="district" className="w-full border p-3 rounded-lg"
          onChange={handleChange}>
          <option value="">District</option>
          <option>Ampara</option>
<option>Anuradhapura</option>
<option>Badulla</option>
<option>Batticaloa</option>
<option>Colombo</option>
<option>Galle</option>
<option>Gampaha</option>
<option>Hambantota</option>
<option>Jaffna</option>
<option>Kalutara</option>
<option>Kandy</option>
<option>Kegalle</option>
<option>Kilinochchi</option>
<option>Kurunegala</option>
<option>Mannar</option>
<option>Matale</option>
<option>Matara</option>
<option>Moneragala</option>
<option>Mullaitivu</option>
<option>Nuwara Eliya</option>
<option>Polonnaruwa</option>
<option>Puttalam</option>
<option>Ratnapura</option>
<option>Trincomalee</option>
<option>Vavuniya</option>
        </select>

        <input type="number" name="stock"
          placeholder="Stock"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange} />

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Upload Product Image</label>
          <input type="file" accept="image/*"
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            onChange={handleFileChange} />
        </div>

        <button type="submit"
          className="w-full bg-green-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-800 transition shadow-lg">
          Add Fertilizer Product
        </button>
      </form>
    </div>
  );
}