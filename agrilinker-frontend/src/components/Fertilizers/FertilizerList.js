import React, { useEffect, useState, useContext } from "react";
import { FiFilter } from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { CartContext } from "../../context/CartContext";

export default function FertilizerList() {
  const [fertilizers, setFertilizers] = useState([]);
  const [filteredFertilizers, setFilteredFertilizers] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { addToCart } = useContext(CartContext);

  // 1. LOAD DATA FROM BACKEND
  useEffect(() => {
    api.get("/api/fertilizers")
      .then(res => {
        setFertilizers(res.data);
        setFilteredFertilizers(res.data);
      })
      .catch(err => console.error("Fertilizer load error:", err));
  }, []);

  // 2. HIGHLIGHT FUNCTION FOR SEARCH
  const highlightMatch = (text) => {
    if (!text) return "";
    if (!searchTerm.trim()) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  // 3. COMBINED SEARCH + FILTER + SORT LOGIC
  useEffect(() => {
    let temp = [...fertilizers];

    // Filter by Search Term
    if (searchTerm.trim() !== "") {
      const text = searchTerm.toLowerCase();
      temp = temp.filter(
        (f) =>
          (f.fertilizerCode && f.fertilizerCode.toLowerCase().includes(text)) ||
          (f.name && f.name.toLowerCase().includes(text)) ||
          (f.category && f.category.toLowerCase().includes(text)) ||
          (f.type && f.type.toLowerCase().includes(text))
      );
    }

    // Filter by Dropdowns
    if (categoryFilter) temp = temp.filter(f => f.category === categoryFilter);
    if (typeFilter) temp = temp.filter(f => f.type === typeFilter);

    // Sorting
    if (sortOption === "priceLow") temp.sort((a, b) => a.price - b.price);
    if (sortOption === "priceHigh") temp.sort((a, b) => b.price - a.price);
    if (sortOption === "nameAZ") temp.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredFertilizers(temp);
  }, [fertilizers, searchTerm, sortOption, categoryFilter, typeFilter]);

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-green-800 tracking-tight">Fertilizers</h1>

        <div className="flex space-x-3 items-center">
          <input
            type="text"
            placeholder="Search name, code, or type..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border p-2 rounded-xl w-64 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <button className="flex items-center bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
            <FiFilter className="mr-2" /> Filters
          </button>

          <select 
            value={sortOption} 
            onChange={e => setSortOption(e.target.value)} 
            className="border p-2 rounded-lg bg-white outline-none"
          >
            <option value="">Sort By</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="nameAZ">Name: A–Z</option>
          </select>
        </div>
      </div>

      <Link
        to="/fertilizers/add"
        className="inline-block mb-8 bg-green-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-800 transition shadow-lg shadow-green-100"
      >
        + Add Fertilizer
      </Link>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFertilizers.map(f => (
          <div key={f.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
            <img
              src={f.imageUrl || "https://via.placeholder.com/300x200"}
              alt={f.name}
              className="rounded-2xl mb-4 w-full h-48 object-cover"
            />

            {/* Title with Highlight */}
            <h2 
              className="text-2xl font-bold text-green-800 mb-2"
              dangerouslySetInnerHTML={{ __html: highlightMatch(f.name) }}
            />

            <div className="space-y-1 text-sm text-gray-500 mb-4">
              <p>Code: <span className="font-semibold text-gray-700" dangerouslySetInnerHTML={{ __html: highlightMatch(f.fertilizerCode) }} /></p>
              <p>Type: <span className="font-semibold text-gray-700" dangerouslySetInnerHTML={{ __html: highlightMatch(f.type) }} /></p>
              <p>Category: <span className="font-semibold text-gray-700" dangerouslySetInnerHTML={{ __html: highlightMatch(f.category) }} /></p>
            </div>

            <p className="text-gray-600 text-sm line-clamp-2 mb-4">{f.description}</p>

            <p className="text-2xl font-black text-green-900 mb-6">
              Rs. {f.price.toFixed(2)} <span className="text-sm font-normal text-gray-400">/ {f.unit}</span>
            </p>

            <div className="flex gap-3 mt-auto">
              <Link
                to={`/fertilizers/update/${f.id}`}
                className="flex-1 text-center bg-yellow-500 text-white py-3 rounded-xl font-bold hover:bg-yellow-600 transition"
              >
                Edit
              </Link>

              <button
                onClick={() => addToCart(f)}
                className="flex-[2] bg-green-700 text-white py-3 rounded-xl font-bold hover:bg-green-800 transition shadow-lg shadow-green-100"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}