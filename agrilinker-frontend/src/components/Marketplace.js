import React, { useState, useEffect } from "react";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: "Fresh Blueberries",
          price: 6.0,
          location: "Washington, USA",
          rating: 4.9,
          reviews: 187,
          category: "Fruits",
          img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400",
          inStock: true,
          farmer: "Blueberry Farms Co."
        },
        {
          id: 2,
          name: "Organic Broccoli",
          price: 3.5,
          location: "Oregon, USA",
          rating: 4.5,
          reviews: 78,
          category: "Vegetables",
          img: "https://images.unsplash.com/photo-1607305387299-f5c52a4d8ad2?w=400",
          inStock: true,
          farmer: "Green Valley Organics"
        },
        {
          id: 3,
          name: "Sweet Corn",
          price: 2.5,
          location: "Iowa, USA",
          rating: 4.7,
          reviews: 234,
          category: "Vegetables",
          img: "https://images.unsplash.com/photo-1626800202585-ecfd6be6c8d8?w=400",
          inStock: true,
          farmer: "Midwest Corn Co."
        },
        {
          id: 4,
          name: "Red Apples",
          price: 4.0,
          location: "Michigan, USA",
          rating: 4.8,
          reviews: 156,
          category: "Fruits",
          img: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400",
          inStock: true,
          farmer: "Apple Creek Orchards"
        },
        {
          id: 5,
          name: "Carrots",
          price: 2.0,
          location: "California, USA",
          rating: 4.4,
          reviews: 89,
          category: "Vegetables",
          img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400",
          inStock: true,
          farmer: "Sunshine Farms"
        },
        {
          id: 6,
          name: "Strawberries",
          price: 5.5,
          location: "Florida, USA",
          rating: 4.9,
          reviews: 267,
          category: "Fruits",
          img: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=400",
          inStock: false,
          farmer: "Berry Best Farms"
        },
        {
          id: 7,
          name: "Potatoes",
          price: 1.8,
          location: "Idaho, USA",
          rating: 4.3,
          reviews: 145,
          category: "Vegetables",
          img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
          inStock: true,
          farmer: "Idaho Spud Co."
        },
        {
          id: 8,
          name: "Organic Tomatoes",
          price: 4.5,
          location: "California, USA",
          rating: 4.6,
          reviews: 198,
          category: "Vegetables",
          img: "https://images.unsplash.com/photo-1546470427-e212b7d310a2?w=400",
          inStock: true,
          farmer: "Organic Harvest"
        },
        {
          id: 9,
          name: "Bananas",
          price: 1.5,
          location: "Ecuador",
          rating: 4.2,
          reviews: 324,
          category: "Fruits",
          img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
          inStock: true,
          farmer: "Tropical Fruits Inc."
        },
        {
          id: 10,
          name: "Spinach",
          price: 3.2,
          location: "Arizona, USA",
          rating: 4.4,
          reviews: 76,
          category: "Vegetables",
          img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400",
          inStock: true,
          farmer: "Desert Greens"
        },
        {
          id: 11,
          name: "Avocados",
          price: 7.0,
          location: "Mexico",
          rating: 4.7,
          reviews: 189,
          category: "Fruits",
          img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400",
          inStock: true,
          farmer: "Avocado Dream"
        },
        {
          id: 12,
          name: "Bell Peppers",
          price: 4.8,
          location: "Netherlands",
          rating: 4.5,
          reviews: 112,
          category: "Vegetables",
          img: "https://images.unsplash.com/photo-1525607551107-68e20c75b1a8?w=400",
          inStock: true,
          farmer: "Euro Greens"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filtered = products
    .filter((p) =>
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

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading fresh products...</div>
        </div>
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

      {/* Filters and Search */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="lg:col-span-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
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
        </div>
        <div>
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
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden bg-white"
          >
            <div className="relative">
              <img 
                src={product.img} 
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
                <h2 className="font-semibold text-lg text-gray-800">{product.name}</h2>
                <span className="text-green-600 font-bold text-lg">${product.price}</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{product.farmer}</p>
              <p className="text-sm text-gray-500 mb-3">{product.location}</p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm font-medium ml-1">{product.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                </div>
                <span className="text-sm text-gray-500">/ kg</span>
              </div>
              
              <button 
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  product.inStock 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🍃</div>
          <h3 className="text-xl font-semibold text-gray-600">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;