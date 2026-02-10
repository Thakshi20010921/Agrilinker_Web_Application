import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import ReviewModal from "./ReviewModal";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [reviewProduct, setReviewProduct] = useState(null);

  // ✅ Sentiment summary per productId
  const [sentimentMap, setSentimentMap] = useState({});

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/products");
        const productsWithStock = response.data.map((p) => ({
          ...p,
          inStock: p.quantity > 0 && p.status === "available",
        }));
        setProducts(productsWithStock);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again.");
        setLoading(false);
      }
    };
    loadProducts();
  }, []);
  const refreshSummaryForProduct = async (productId) => {
  try {
    const res = await axios.get("http://localhost:8081/api/reviews/summary", {
      params: { productId },
    });
    setSentimentMap((prev) => ({ ...prev, [productId]: res.data }));
  } catch (e) {
    console.error(e);
  }
};


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
          return (b.ratingAvg || 0) - (a.ratingAvg || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // ✅ Fetch sentiment summaries for visible products (limit to first 20)
  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const results = await Promise.all(
          filtered.slice(0, 20).map(async (p) => {
            const id = p.id || p._id;
            const res = await axios.get("http://localhost:8081/api/reviews/summary", {
              params: { productId: id },
            });
            return [id, res.data];
          })
        );

        setSentimentMap(Object.fromEntries(results));
      } catch (err) {
        console.error("Error loading product sentiment summaries:", err);
      }
    };

    if (filtered.length > 0) fetchSummaries();
  }, [filtered]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading)
    return (
      <div className="p-6 max-w-7xl mx-auto flex justify-center items-center h-64">
        <div className="text-lg animate-pulse text-green-600">
          Loading fresh products...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="p-6 max-w-7xl mx-auto flex justify-center items-center h-64">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-green-900">🌿 Fresh Marketplace</h1>
          <p className="text-gray-600 mt-2">Direct from farmers to your table</p>
        </div>
        <div className="mt-4 lg:mt-0 text-sm text-gray-500">
          Showing {filtered.length} of {products.length} products
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
        >
          <option value="All">All Categories</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Dairy">Dairy</option>
          <option value="Grains">Grains</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
        >
          <option value="name">Sort by Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => {
          const id = product.id || product._id;
          const summary = sentimentMap[id];

          const imageUrl = product.product_image
            ? `http://localhost:8081${product.product_image}`
            : "/placeholder.jpg";

          return (
            <div
              key={id}
              className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative">
                <img src={imageUrl} alt={product.name} className="h-52 w-full object-cover" />
                {!product.inStock && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Out of Stock
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {product.category}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-semibold text-lg text-gray-800 hover:text-green-600 transition-colors">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-sm">{product.farmer}</p>
                  <p className="text-gray-500 text-sm">{product.location}</p>
                </div>

                {/* Ratings and review */}
                <div className="mt-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">⭐</span>
                      <span className="font-medium">{product.ratingAvg || 0}</span>
                      <span className="text-gray-400 text-sm">({product.ratingCount || 0})</span>
                      <button
                        type="button"
                        onClick={() => setReviewProduct(product)}
                        className="text-sm text-green-600 underline hover:text-green-800"
                      >
                        Write a review
                      </button>
                    </div>
                    <span className="text-gray-500 text-sm">/ kg</span>
                  </div>

                  {/* ✅ Sentiment Summary */}
                  {summary && summary.totalReviews > 0 && (
                    <div className="mt-1 text-xs">
                      <div className="font-semibold text-green-700">
                        {summary.positivePercent}% positive
                      </div>
                      <div className="text-gray-500">{summary.topComment}</div>
                    </div>
                  )}
                </div>

                {/* Add to cart */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`mt-4 w-full py-3 rounded-lg font-semibold text-white transition-colors ${
                    product.inStock ? "bg-green-600 hover:bg-green-700" : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Products */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-300 text-6xl mb-4 animate-pulse">🍃</div>
          <h3 className="text-xl font-semibold text-gray-600">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Review Modal */}
      {reviewProduct && (
  <ReviewModal
    item={reviewProduct}
    onClose={() => setReviewProduct(null)}
    onSubmitted={() => refreshSummaryForProduct(reviewProduct.id || reviewProduct._id)}
  />
)}

    </div>
  );
};

export default Marketplace;
