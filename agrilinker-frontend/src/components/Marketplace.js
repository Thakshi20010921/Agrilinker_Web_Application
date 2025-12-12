import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/products");
        
        console.log("Backend Response:", response.data); 
        // Adjust stock depending on your backend: 1/0
        const productsWithStock = response.data.map((p) => ({
          ...p,
          inStock: p.quantity > 0 && p.status === "available",

        }));
        setProducts(productsWithStock);
        setLoading(false);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Failed to load products. Please try again.");
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filtered = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        (category === "All" || p.category === category)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto flex justify-center items-center h-64">
        <div className="text-lg">Loading fresh products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto flex justify-center items-center h-64">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-green-900">Fresh Marketplace</h1>
          <p className="text-gray-600 mt-2">Direct from farmers to your table</p>
        </div>
        <div className="mt-4 lg:mt-0 text-sm text-gray-500">
          Showing {filtered.length} of {products.length} products
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />

        <select
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Dairy">Dairy</option>
          <option value="Grains">Grains</option>
        </select>

        <select
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => {
          const imageUrl = product.product_image
            ? `http://localhost:8081${product.product_image}`
            : "/placeholder.jpg";

          return (
            <div
              key={product.id}
              className="border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden bg-white"
            >
              <div className="relative">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />

                {!product.inStock && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    Out of Stock
                  </div>
                )}

                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  {product.category}
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="font-semibold text-lg text-gray-800">
                    {product.name}
                  </h2>
                  <span className="text-green-600 font-bold text-lg">
                    ${product.price}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-2">{product.farmer}</p>
                <p className="text-sm text-gray-500 mb-3">{product.location}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm font-medium ml-1">
                      {product.rating}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({product.reviews})
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">/ kg</span>
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    product.inStock
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!product.inStock}
                  onClick={() => handleAddToCart(product)}
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🍃</div>
          <h3 className="text-xl font-semibold text-gray-600">
            No products found
          </h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
