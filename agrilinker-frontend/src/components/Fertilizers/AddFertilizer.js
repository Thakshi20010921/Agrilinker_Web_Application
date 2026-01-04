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
        "http://localhost:8081/api/fertilizers/upload-image", // ✅ FIXED URL
        fileData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const imageUrl = uploadRes.data; // ✅ FIXED RESPONSE

      // ✅ 2. Save fertilizer
      await axios.post("http://localhost:8081/api/fertilizers", {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        quantityInside: form.quantityInside
          ? Number(form.quantityInside)
          : null,
        imageUrl
      });

      toast.success("Fertilizer added successfully!");
      setTimeout(() => navigate("/fertilizers"), 800);

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
            placeholder="Quantity Inside"
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
          <option>Colombo</option>
          <option>Kandy</option>
          <option>Galle</option>
          <option>Kurunegala</option>
          <option>Jaffna</option>
        </select>

        <input type="number" name="stock"
          placeholder="Stock"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange} />

        <input type="file" accept="image/*"
          onChange={handleFileChange} />

        <button type="submit"
          className="bg-green-700 text-white px-6 py-3 rounded-lg">
          Add Fertilizer
        </button>
      </form>
    </div>
  );
}
