import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

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
    imageUrl: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Load fertilizer data
  useEffect(() => {
    axios.get(`http://localhost:8081/api/fertilizers/${id}`)
      .then(res => setForm(res.data))
      .catch(err => toast.error("Failed to load fertilizer data"));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers for price, stock, quantityInside
    if (["price", "stock", "quantityInside"].includes(name)) {
      if (name === "price" && !/^\d*\.?\d*$/.test(value)) return;
      if (name !== "price" && !/^\d*$/.test(value)) return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  const uploadImage = async () => {
    if (!imageFile) return form.imageUrl;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const res = await axios.post(
        "http://localhost:8081/api/fertilizers/upload-image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setUploading(false);
      return res.data;
    } catch (err) {
      console.error(err);
      setUploading(false);
      toast.error("Image upload failed!");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = form.imageUrl;
    if (imageFile) {
      const uploadedUrl = await uploadImage();
      if (!uploadedUrl) return;
      imageUrl = uploadedUrl;
    }

    // Validate required fields
    const requiredFields = ["name", "description", "price", "unit", "category", "type", "stock", "district"];
    for (let field of requiredFields) {
      if (!form[field] || form[field].toString().trim() === "") {
        toast.error(`Please fill the ${field} field.`);
        return;
      }
    }

    // Additional validations
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
      await axios.put(`http://localhost:8081/api/fertilizers/${id}`, {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        quantityInside: form.quantityInside ? Number(form.quantityInside) : null,
        imageUrl
      });

      toast.success("Fertilizer updated successfully!");
      setTimeout(() => navigate("/fertilizers"), 800);
    } catch (err) {
      console.error(err);
      toast.error("Error updating fertilizer!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow rounded-xl">
      <h1 className="text-3xl font-extrabold text-green-800 mb-6">Update Fertilizer</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="font-semibold">Fertilizer Name</label>
          <input
            type="text"
            name="name"
            className="w-full border p-3 rounded-lg"
            placeholder="Enter fertilizer name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            className="w-full border p-3 rounded-lg"
            placeholder="Enter description"
            rows="3"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        {/* Price */}
        <div>
          <label className="font-semibold">Unit Price (Rs.)</label>
          <input
            type="number"
            name="price"
            className="w-full border p-3 rounded-lg"
            placeholder="Enter unit price"
            value={form.price}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
        </div>

        {/* Unit */}
        <div>
          <label className="font-semibold">Unit</label>
          <select
            name="unit"
            className="w-full border p-3 rounded-lg"
            value={form.unit}
            onChange={handleChange}
          >
            <option value="">Select Unit</option>
            <option value="bottle">Bottle</option>
            <option value="bag">Bag</option>
            <option value="kg">Kg</option>
            <option value="liter">Liter</option>
          </select>
        </div>

        {/* Quantity Inside */}
        {(form.unit === "bag" || form.unit === "bottle") && (
          <div>
            <label className="font-semibold">Quantity inside ({form.unit === "bag" ? "kg" : "L"})</label>
            <input
              type="number"
              name="quantityInside"
              className="w-full border p-3 rounded-lg"
              placeholder={form.unit === "bag" ? "e.g., 50 kg" : "e.g., 1.5 L"}
              value={form.quantityInside}
              onChange={handleChange}
              min="0"
              step="0.01"
            />
          </div>
        )}

        {/* Category */}
        <div>
          <label className="font-semibold">Category</label>
          <select
            name="category"
            className="w-full border p-3 rounded-lg"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option>Organic</option>
            <option>Chemical</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="font-semibold">Type</label>
          <select
            name="type"
            className="w-full border p-3 rounded-lg"
            value={form.type}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option>Liquid</option>
            <option>Granular</option>
            <option>Water-Soluble</option>
            <option>Powder</option>
            <option>Slow-Release</option>
          </select>
        </div>

        {/* District */}
        <div>
          <label className="font-semibold">District</label>
          <select
            name="district"
            className="w-full border p-3 rounded-lg"
            value={form.district}
            onChange={handleChange}
          >
            <option value="">Select District</option>
            <option>Colombo</option>
            <option>Gampaha</option>
            <option>Kalutara</option>
            <option>Kandy</option>
            <option>Matale</option>
            <option>Nuwara Eliya</option>
            <option>Galle</option>
            <option>Matara</option>
            <option>Hambantota</option>
            <option>Jaffna</option>
            <option>Kilinochchi</option>
            <option>Mannar</option>
            <option>Vavuniya</option>
            <option>Mullaitivu</option>
            <option>Batticaloa</option>
            <option>Ampara</option>
            <option>Trincomalee</option>
            <option>Kurunegala</option>
            <option>Puttalam</option>
            <option>Anuradhapura</option>
            <option>Polonnaruwa</option>
            <option>Badulla</option>
            <option>Moneragala</option>
            <option>Ratnapura</option>
          </select>
        </div>

        {/* Stock */}
        <div>
          <label className="font-semibold">Stock</label>
          <input
            type="number"
            name="stock"
            className="w-full border p-3 rounded-lg"
            placeholder="Available stock"
            value={form.stock}
            onChange={handleChange}
            min="0"
            step="1"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="font-semibold">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {uploading && <p className="text-sm text-gray-500">Uploading image...</p>}
          {form.imageUrl && !imageFile && (
            <img src={form.imageUrl} alt="Fertilizer" className="mt-2 h-24 object-cover rounded" />
          )}
        </div>

        <button type="submit" className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition">
          Update Fertilizer
        </button>
      </form>
    </div>
  );
}
