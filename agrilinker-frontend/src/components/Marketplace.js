import React, { useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import ReviewModal from "./ReviewModal";
import StarRating from "./StarRating";

const WISHLIST_KEY = "wishlist";
const loadWishlist = () => JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
const saveWishlist = (list) => localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewProduct, setReviewProduct] = useState(null);

  // Advanced filters
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [wishlistOnly, setWishlistOnly] = useState(false);

  const [wishlist, setWishlist] = useState(loadWishlist());

  const { addToCart } = useContext(CartContext);

  // Debounce search for better UX
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/products");
        const productsWithStock = response.data.map((p) => ({
          ...p,
          inStock: p.quantity > 0 && p.status === "available",
        }));
        setProducts(productsWithStock);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      saveWishlist(next);
      return next;
    });
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("name");
    setMinPrice("");
    setMaxPrice("");
    setMinRating(0);
    setInStockOnly(false);
    setWishlistOnly(false);
  };

  const filtered = useMemo(() => {
    const minP = minPrice === "" ? null : Number(minPrice);
    const maxP = maxPrice === "" ? null : Number(maxPrice);

    return products
      .filter((p) => {
        const nameOk = (p?.name || "").toLowerCase().includes(debouncedSearch);
        const catOk = category === "All" || p.category === category;

        const price = Number(p.price || 0);
        const minOk = minP === null || price >= minP;
        const maxOk = maxP === null || price <= maxP;

        const rating = Number(p.ratingAvg || 0);
        const ratingOk = rating >= Number(minRating || 0);

        const stockOk = !inStockOnly || p.inStock;

        const pid = p.id || p._id;
const wishOk = !wishlistOnly || wishlist.includes(pid);


        return nameOk && catOk && minOk && maxOk && ratingOk && stockOk && wishOk;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return (a.price || 0) - (b.price || 0);
          case "price-high":
            return (b.price || 0) - (a.price || 0);
          case "rating":
            return (b.ratingAvg || 0) - (a.ratingAvg || 0);
          case "newest":
            return new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0);
          default:
            return (a.name || "").localeCompare(b.name || "");
        }
      });
  }, [
    products,
    debouncedSearch,
    category,
    minPrice,
    maxPrice,
    minRating,
    inStockOnly,
    wishlistOnly,
    wishlist,
    sortBy,
  ]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading)
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="h-6 w-56 bg-gray-100 rounded animate-pulse mb-4" />
          <div className="h-4 w-80 bg-gray-100 rounded animate-pulse mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="border rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="h-44 bg-gray-100 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-100 rounded animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-2/3" />
                  <div className="h-10 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
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
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-green-900 tracking-tight">
              🌿 Fresh Marketplace
            </h1>
            <p className="text-gray-600 mt-2">
              Direct from farmers to your table — trusted, fresh, and local.
            </p>
          </div>

          <div className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-700">{filtered.length}</span> of{" "}
            <span className="font-semibold text-gray-700">{products.length}</span> products
          </div>
        </div>

        {/* Base Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
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
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* Advanced Filters */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-6 gap-3">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min Rs."
            className="border border-gray-200 rounded-xl p-3 shadow-sm"
          />

          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max Rs."
            className="border border-gray-200 rounded-xl p-3 shadow-sm"
          />

          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="border border-gray-200 rounded-xl p-3 shadow-sm"
          >
            <option value={0}>Any rating</option>
            <option value={3}>3★ & up</option>
            <option value={4}>4★ & up</option>
            <option value={4.5}>4.5★ & up</option>
          </select>

          <label className="flex items-center gap-2 border border-gray-200 rounded-xl p-3 shadow-sm bg-white">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            <span className="text-sm text-gray-700">In stock</span>
          </label>

          <label className="flex items-center gap-2 border border-gray-200 rounded-xl p-3 shadow-sm bg-white">
            <input
              type="checkbox"
              checked={wishlistOnly}
              onChange={(e) => setWishlistOnly(e.target.checked)}
            />
            <span className="text-sm text-gray-700">Wishlist</span>
          </label>

          <button
            type="button"
            onClick={clearFilters}
            className="rounded-xl p-3 font-semibold border border-gray-200 hover:bg-gray-50"
          >
            Clear
          </button>
        </div>

        {/* Filter Chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {minPrice !== "" && (
            <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">Min Rs. {minPrice}</span>
          )}
          {maxPrice !== "" && (
            <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">Max Rs. {maxPrice}</span>
          )}
          {minRating > 0 && (
            <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">{minRating}★ & up</span>
          )}
          {inStockOnly && (
            <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">In stock</span>
          )}
          {wishlistOnly && (
            <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">Wishlist</span>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => {
          const imagePath = product.Product_image || product.product_image;

const imageUrl = imagePath
  ? encodeURI(`http://localhost:8081${imagePath}`)
  : "/placeholder.jpg";


          const id = product.id || product._id;
          const isWishlisted = wishlist.includes(id);

          return (
            <div
              key={id}
              className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                 onError={(e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = "/placeholder.jpg";
}}

                />

                {/* Category */}
                <div className="absolute top-3 left-3 bg-green-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                  {product.category}
                </div>

                {/* Stock */}
                {!product.inStock && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                    Out of Stock
                  </div>
                )}

                {/* ❤️ Wishlist */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(id)}
                  className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow hover:scale-105 transition"
                  title="Wishlist"
                >
                  <span className="text-lg">{isWishlisted ? "❤️" : "🤍"}</span>
                </button>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-semibold text-lg text-gray-900 group-hover:text-green-700 transition-colors line-clamp-1">
                    {product.name}
                  </h2>

                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                    {product.farmerEmail} • {product.location}
                  </p>

                  {/* Price + Review */}
                  <div className="mt-3 flex items-end justify-between">
                    <p className="text-lg font-extrabold text-gray-900">
                      Rs. {Number(product.price || 0).toFixed(0)}
                      <span className="text-sm font-medium text-gray-500">
                        {" "}
                        / {product.unit || "unit"}
                      </span>
                    </p>

                    <button
                      type="button"
                      onClick={() => setReviewProduct(product)}
                      className="text-xs text-green-700 underline hover:text-green-900"
                    >
                      Review
                    </button>
                  </div>

                  {/* Rating */}
                  <div className="mt-2 flex items-center gap-2">
                    <StarRating value={product.ratingAvg} />
                    <span className="text-sm font-semibold text-gray-800">
                      {(product.ratingAvg || 0).toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-400">({product.ratingCount || 0})</span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`mt-4 w-full py-3 rounded-xl font-semibold text-white transition ${
                    product.inStock
                      ? "bg-green-700 hover:bg-green-800"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty */}
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
          type="product"
          onClose={() => setReviewProduct(null)}
          onSubmitted={() => {}}
        />
      )}
    </div>
  );
};

export default Marketplace;
