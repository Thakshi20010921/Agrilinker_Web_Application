import React, { useState } from "react";
import axios from "axios";

const MOCK_FARMER_ID = "FARMER_001"; // temporary mock

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    unit: "kg",
    location: "",
    status: "available",
    product_image: null, // File object
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "product_image") {
      setProduct({ ...product, product_image: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Wrap product fields into JSON for backend
      const productData = {
        name: product.name,
        category: product.category,
        description: product.description,
        price: parseFloat(product.price),
        quantity: parseInt(product.quantity),
        unit: product.unit,
        location: product.location,
        status: product.status,
        farmerId: MOCK_FARMER_ID, // mock for now
      };

      formData.append(
        "product",
        new Blob([JSON.stringify(productData)], { type: "application/json" })
      );

      // Append image file
      if (product.product_image) {
        formData.append("image", product.product_image);
      }

      // POST request to backend
      const res = await axios.post(
        "http://localhost:8081/api/products/with-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Product saved successfully!");
      console.log(res.data);

      // Reset form
      setProduct({
        name: "",
        category: "",
        description: "",
        price: "",
        quantity: "",
        unit: "kg",
        location: "",
        status: "available",
        product_image: null,
      });
    } catch (err) {
      console.error("Error saving product:", err.response || err.message);
      alert("Error saving product. Check console for details.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Product 🌱</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="unit"
          value={product.unit}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="kg">Kg</option>
          <option value="g">Gram</option>
          <option value="pcs">Pieces</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={product.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

       <select
  name="status"
  value={product.status}
  onChange={handleChange}
  className="w-full border p-2 rounded"
>
  <option value="available">Available</option>
  <option value="out_of_stock">Out of Stock</option>
</select>

        <input
          type="file"
          name="product_image"
          accept="image/*"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Save Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
