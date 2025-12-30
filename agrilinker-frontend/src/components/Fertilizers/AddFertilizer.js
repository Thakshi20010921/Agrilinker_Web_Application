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
    imageUrl: "",
    quantityInside: "" 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ Ensure numeric-only input for price, stock, quantityInside
    if (["price", "stock", "quantityInside"].includes(name)) {
      // Allow only digits and decimal point for price, only digits for stock and quantityInside if needed
      if (name === "price") {
        if (!/^\d*\.?\d*$/.test(value)) return;
      } else {
        if (!/^\d*$/.test(value)) return;
      }
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate required fields
    const requiredFields = ["name", "description", "price", "unit", "category", "type", "stock", "imageUrl"];
    for (let field of requiredFields) {
      if (!form[field] || form[field].toString().trim() === "") {
        toast.error(`Please fill the ${field} field.`);
        return;
      }
    }

    // ✅ Validate numeric values
    if (isNaN(form.price) || Number(form.price) <= 0) {
      toast.error("Unit Price must be a positive number.");
      return;
    }
    if (isNaN(form.stock) || Number(form.stock) < 0) {
      toast.error("Stock must be zero or more.");
      return;
    }
    if ((form.unit === "bag" || form.unit === "bottle") && (!form.quantityInside || Number(form.quantityInside) <= 0)) {
      toast.error("Quantity inside must be greater than zero.");
      return;
    }

    try {
      await axios.post("http://localhost:8081/api/fertilizers", {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        quantityInside: form.quantityInside ? Number(form.quantityInside) : null
      }) ;

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

        <div>
          <label className="font-semibold">Fertilizer Name</label>
          <input type="text" name="name" className="w-full border p-3 rounded-lg" placeholder="Enter fertilizer name" onChange={handleChange} />
        </div>

        <div>
          <label className="font-semibold">Description</label>
          <textarea name="description" className="w-full border p-3 rounded-lg" placeholder="Enter description" rows="3" onChange={handleChange}></textarea>
        </div>

        <div>
          <label className="font-semibold">Unit Price (Rs.)</label>
          <input type="number" name="price" className="w-full border p-3 rounded-lg" placeholder="Enter unit price" onChange={handleChange} min="0" step="0.01" />
        </div>

        <div>
          <label className="font-semibold">Unit</label>
          <select name="unit" className="w-full border p-3 rounded-lg" onChange={handleChange}>
            <option value="">Select Unit</option>
            <option value="bottle">Bottle</option>
            <option value="bag">Bag</option>
            <option value="kg">Kg</option>
            <option value="liter">Liter</option>
          </select>
        </div>

        {(form.unit === "bag" || form.unit === "bottle") && (
          <div>
            <label className="font-semibold">Quantity inside ({form.unit === "bag" ? "kg" : "L"})</label>
            <input type="number" name="quantityInside" className="w-full border p-3 rounded-lg" placeholder={form.unit === "bag" ? "e.g., 50 kg" : "e.g., 1.5 L"} onChange={handleChange} min="0" step="0.01" />
          </div>
        )}

        <div>
          <label className="font-semibold">Category</label>
          <select name="category" className="w-full border p-3 rounded-lg" onChange={handleChange}>
            <option value="">Select Category</option>
            <option>Organic</option>
            <option>Chemical</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Type</label>
          <select name="type" className="w-full border p-3 rounded-lg" onChange={handleChange}>
            <option value="">Select Type</option>
            <option>Liquid</option>
            <option>Granular</option>
            <option>Water-Soluble</option>
            <option>Powder</option>
            <option>Slow-Release</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Stock</label>
          <input type="number" name="stock" className="w-full border p-3 rounded-lg" placeholder="Available stock" onChange={handleChange} min="0" step="1" />
        </div>

        <div>
          <label className="font-semibold">Image URL</label>
          <input type="text" name="imageUrl" className="w-full border p-3 rounded-lg" placeholder="http://example.com/fert.png" onChange={handleChange} />
        </div>

        <button type="submit" className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition">Add Fertilizer</button>
      </form>
    </div>
  );
}
