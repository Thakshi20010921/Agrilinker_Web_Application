import React, { useEffect, useState } from "react";
import axios from "axios";

const MOCK_FARMER_ID = "FARMER_001"; // same mock

const MyProducts = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/products");
      // Filter by mock farmerId
      const myProducts = res.data.filter(
        (p) => p.farmerId === MOCK_FARMER_ID
      );
      setProducts(myProducts);
    } catch (err) {
      console.error(err);
      alert("Error fetching products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:8081/api/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      alert("Product deleted");
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Products 🌾</h1>

      {products.length === 0 ? (
        <p>No products uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="border p-4 rounded shadow flex flex-col space-y-2"
            >
              {p.product_image && (
                <img
                  src={`http://localhost:8081${p.product_image}`}
                  alt={p.name}
                  className="h-32 object-cover rounded"
                />
              )}
              <h2 className="font-bold text-lg">{p.name}</h2>
              <p>{p.category}</p>
              <p>Price: ${p.price}</p>
              <p>Quantity: {p.quantity} {p.unit}</p>
              <p>Status: {p.status}</p>
              <div className="flex space-x-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                  // Add edit functionality later
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
