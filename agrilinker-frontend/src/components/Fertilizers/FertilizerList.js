// src/pages/fertilizers/FertilizerList.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FiFilter, FiSearch, FiMapPin, FiPackage, FiTag } from "react-icons/fi";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ReviewModal from "../../components/ReviewModal";
import FertilizerButton from "./FertilizerButton";

export default function FertilizerList() {
  // ===== State =====
  const [fertilizers, setFertilizers] = useState([]);
  const [filteredFertilizers, setFilteredFertilizers] = useState([]);

  const [sortOption, setSortOption] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { addToCart } = useContext(CartContext);

  // Review modal state
  const [selectedItem, setSelectedItem] = useState(null);
  const [reviewType, setReviewType] = useState("fertilizer");

  // ===== Pagination =====
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // ===== Fetch fertilizers =====
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/fertilizers")
      .then((res) => {
        setFertilizers(res.data || []);
        setFilteredFertilizers(res.data || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // ===== Highlight search match =====
  const highlightMatch = (text) => {
    if (!text) return "";
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return String(text).replace(regex, "<mark>$1</mark>");
  };

  // ===== Add to cart =====
  const handleBuy = (f) => {
    addToCart({
      id: f.id || f._id,
      name: f.name,
      price: Number(f.price || 0),
      unit: f.unit || "unit",
      imageUrl: f.imageUrl || "https://via.placeholder.com/300x200",
      type: "fertilizer",
    });

    toast.success(`${f.name} added to cart!`);
  };

  // ===== Filter, search, sort =====
  useEffect(() => {
    let temp = [...fertilizers];

    // search
    if (searchTerm.trim() !== "") {
      const text = searchTerm.toLowerCase();
      temp = temp.filter(
        (f) =>
          (f.fertilizerCode && f.fertilizerCode.toLowerCase().includes(text)) ||
          (f.name && f.name.toLowerCase().includes(text)) ||
          (f.category && f.category.toLowerCase().includes(text)) ||
          (f.type && f.type.toLowerCase().includes(text)) ||
          (f.district && f.district.toLowerCase().includes(text))
      );
    }

    // filters
    if (categoryFilter) temp = temp.filter((f) => f.category === categoryFilter);
    if (typeFilter) temp = temp.filter((f) => f.type === typeFilter);
    if (districtFilter) temp = temp.filter((f) => f.district === districtFilter);

    // sorting
    if (sortOption === "priceLow") temp.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sortOption === "priceHigh") temp.sort((a, b) => (b.price || 0) - (a.price || 0));
    else if (sortOption === "nameAZ") temp.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

    setFilteredFertilizers(temp);
    setCurrentPage(1);
  }, [fertilizers, searchTerm, sortOption, categoryFilter, typeFilter, districtFilter]);

  // ===== Pagination calculations =====
  const totalPages = Math.ceil(filteredFertilizers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredFertilizers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header & Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <h1 className="text-4xl font-extrabold text-green-800 border-l-8 border-green-600 pl-4">
            Fertilizers
          </h1>

          <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
            <div className="relative flex-grow lg:flex-grow-0">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl w-full lg:w-64 focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
              />
            </div>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-200 p-2 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none shadow-sm bg-white"
            >
              <option value="">Sort By</option>
              <option value="priceLow">Price: Low → High</option>
              <option value="priceHigh">Price: High → Low</option>
              <option value="nameAZ">Name: A → Z</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-200 p-2 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none shadow-sm bg-white"
            >
              <option value="">All Categories</option>
              <option value="Organic">Organic</option>
              <option value="Chemical">Chemical</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-200 p-2 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none shadow-sm bg-white"
            >
              <option value="">All Types</option>
              <option value="Liquid">Liquid</option>
              <option value="Granular">Granular</option>
              <option value="Water-Soluble">Water-Soluble</option>
              <option value="Powder">Powder</option>
              <option value="Slow-Release">Slow-Release</option>
            </select>

            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="border border-gray-200 p-2 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none shadow-sm bg-white"
            >
              <option value="">All Districts</option>
              <option>Colombo</option><option>Gampaha</option><option>Kalutara</option><option>Kandy</option>
              <option>Matale</option><option>Nuwara Eliya</option><option>Galle</option><option>Matara</option>
              <option>Hambantota</option><option>Jaffna</option><option>Kilinochchi</option><option>Mannar</option>
              <option>Vavuniya</option><option>Mullaitivu</option><option>Batticaloa</option><option>Ampara</option>
              <option>Trincomalee</option><option>Kurunegala</option><option>Puttalam</option><option>Anuradhapura</option>
              <option>Polonnaruwa</option><option>Badulla</option><option>Moneragala</option><option>Ratnapura</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-10 flex flex-wrap gap-4">
          <FertilizerButton />
          <Link
            to="/fertilizers/recommend"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1"
          >
            Get Recommendation
          </Link>
        </div>

        {/* Fertilizer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.map((f) => {
            const id = f.id || f._id;

            return (
              <div
                key={id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="p-5">
                  <div className="relative overflow-hidden rounded-2xl mb-4">
                   <img
  src={
    f.imageUrl
      ? encodeURI(
          f.imageUrl.startsWith("http")
            ? f.imageUrl
            : `http://localhost:8081/${
                f.imageUrl.replace(/^.*uploads[\\/]/, "uploads/")
              }`
        )
      : "/placeholder.jpg"
  }
  alt={f.name || "Fertilizer"}
  className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/placeholder.jpg";
  }}
/>


                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-green-700 shadow-sm">
                        {f.category}
                      </span>
                    </div>
                  </div>

                  <h2
                    className="text-2xl font-bold text-gray-800 mb-2 leading-tight"
                    dangerouslySetInnerHTML={{ __html: highlightMatch(f.name) }}
                  />

                  {/* Review */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedItem(f);
                      setReviewType("fertilizer");
                    }}
                    className="text-green-600 hover:text-green-700 font-medium underline text-sm mb-4 block transition"
                  >
                    Write a review
                  </button>

                  <div className="space-y-2 mb-4 border-t border-gray-50 pt-4">
                    <p className="flex items-center gap-2 text-sm text-gray-600">
                      <FiTag className="text-green-600" /> 
                      Code: <span className="font-semibold" dangerouslySetInnerHTML={{ __html: highlightMatch(f.fertilizerCode) }} />
                    </p>
                    <p className="flex items-center gap-2 text-sm text-gray-600">
                      <FiTag className="text-green-600" /> 
                      Type: <span className="font-semibold" dangerouslySetInnerHTML={{ __html: highlightMatch(f.type) }} />
                    </p>
                    <p className="flex items-center gap-2 text-sm text-gray-600">
                      <FiMapPin className="text-green-600" /> 
                      District: <span className="font-semibold text-gray-800">{f.district}</span>
                    </p>
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <FiPackage className="text-green-600" /> 
                      Stock: <span className={f.stock < 10 ? "text-red-600 font-bold" : "text-gray-800"}>{f.stock} {f.unit}</span>
                    </p>
                  </div>

                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 italic leading-relaxed">
                    {f.description}
                  </p>

                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-green-700">Rs. {f.price}</span>
                    <span className="text-sm text-gray-400 font-medium">/ {f.unit}</span>
                    {(f.unit === "bottle" || f.unit === "bag") && f.quantityInside
                      ? <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full ml-2">
                          {f.quantityInside} {f.unit === "bag" ? "kg" : "L"}
                        </span>
                      : ""}
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => handleBuy(f)}
                    className="w-full bg-green-700 text-white py-3.5 rounded-2xl font-bold hover:bg-green-800 transition shadow-lg shadow-green-100 active:scale-95"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-16 pb-10 gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-12 h-12 flex items-center justify-center font-bold rounded-xl border transition-all duration-200 ${
                  currentPage === page
                    ? "bg-green-700 text-white border-green-700 shadow-lg scale-110"
                    : "bg-white text-gray-400 border-gray-200 hover:border-green-500 hover:text-green-600"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}

        {/* ✅ Review Modal */}
        {selectedItem && (
          <ReviewModal
            item={selectedItem}
            type={reviewType}
            userId={localStorage.getItem("email")}
            onClose={() => setSelectedItem(null)}
            onSubmitted={() => {}}
          />
        )}
      </div>
    </div>
  );
}