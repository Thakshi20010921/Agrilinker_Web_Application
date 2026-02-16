import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FiFilter, FiSearch, FiMapPin, FiPackage, FiTag, FiShoppingBag, FiStar, FiArrowRight } from "react-icons/fi";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ReviewModal from "../../components/ReviewModal";
import FertilizerButton from "./FertilizerButton";

export default function FertilizerList() {
  // ===== State (No changes here) =====
  const [fertilizers, setFertilizers] = useState([]);
  const [filteredFertilizers, setFilteredFertilizers] = useState([]);

  const [sortOption, setSortOption] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { addToCart } = useContext(CartContext);

  const [selectedItem, setSelectedItem] = useState(null);
  const [reviewType, setReviewType] = useState("fertilizer");

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // ===== Fetch fertilizers =====
  useEffect(() => {
    const userEmail = localStorage.getItem("email"); 
    
    // මේ log එකෙන් බලාගන්න පුළුවන් email එක ඇත්තටම එනවද කියලා
    console.log("Current Logged-in Email:", userEmail); 

    if (userEmail) {
        axios
          .get(`http://localhost:8081/api/fertilizers?email=${userEmail}`)
          .then((res) => {
            setFertilizers(res.data || []);
            setFilteredFertilizers(res.data || []);
          })
          .catch((err) => console.error("API Error:", err));
    } else {
        // Email එක නැතිනම් සාමාන්‍ය විදිහට call කරන්න (එතකොට 10% වැඩි මිල පේයි)
        axios.get(`http://localhost:8081/api/fertilizers`)
          .then((res) => {
            setFertilizers(res.data || []);
            setFilteredFertilizers(res.data || []);
          })
          .catch((err) => console.error(err));
    }
}, []);

  // ===== Highlight search match =====
  const highlightMatch = (text) => {
    if (!text) return "";
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return String(text).replace(regex, "<mark class='bg-yellow-200 rounded px-1'>$1</mark>");
  };

  // ===== Add to cart =====
  const handleBuy = (f) => {
    addToCart({
      id: f.id || f._id,
      name: f.name,
      price: Number(f.displayPrice || 0),
      unit: f.unit || "unit",
      imageUrl: f.imageUrl || "https://via.placeholder.com/300x200",
      type: "fertilizer",
    });

    toast.success(`${f.name} added to cart!`);
  };

  // ===== Filter, search, sort (Logic Intact) =====
  useEffect(() => {
    let temp = [...fertilizers];
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
    if (categoryFilter) temp = temp.filter((f) => f.category === categoryFilter);
    if (typeFilter) temp = temp.filter((f) => f.type === typeFilter);
    if (districtFilter) temp = temp.filter((f) => f.district === districtFilter);

    if (sortOption === "priceLow") temp.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sortOption === "priceHigh") temp.sort((a, b) => (b.price || 0) - (a.price || 0));
    else if (sortOption === "nameAZ") temp.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

    setFilteredFertilizers(temp);
    setCurrentPage(1);
  }, [fertilizers, searchTerm, sortOption, categoryFilter, typeFilter, districtFilter]);

  const totalPages = Math.ceil(filteredFertilizers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredFertilizers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header & Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-emerald-600 tracking-tight">
              Premium Fertilizers
            </h1>
            <p className="text-gray-500 font-medium ml-1">Nurturing your fields with the best quality.</p>
          </div>

          <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
            <div className="relative flex-grow lg:flex-grow-0">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 border-none bg-white rounded-2xl w-full lg:w-72 focus:ring-4 focus:ring-green-100 outline-none shadow-sm transition-all"
              />
            </div>

            <div className="flex gap-2">
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="bg-white border-none p-3 rounded-2xl text-sm font-semibold text-gray-700 focus:ring-4 focus:ring-green-100 shadow-sm cursor-pointer transition-all">
                    <option value="">Sort By</option>
                    <option value="priceLow">Price: Low → High</option>
                    <option value="priceHigh">Price: High → Low</option>
                    <option value="nameAZ">Name: A → Z</option>
                </select>

                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-white border-none p-3 rounded-2xl text-sm font-semibold text-gray-700 focus:ring-4 focus:ring-green-100 shadow-sm cursor-pointer transition-all">
                    <option value="">All Categories</option>
                    <option value="Organic">Organic</option>
                    <option value="Chemical">Chemical</option>
                </select>
            </div>
          </div>
        </div>

        {/* Filters Row 2 */}
        <div className="flex flex-wrap gap-3 mb-10 items-center bg-white/50 backdrop-blur-md p-4 rounded-[2rem] border border-white/60 shadow-sm">
            <div className="flex items-center gap-2 px-4 text-green-800 font-bold border-r border-green-200 mr-2">
                <FiFilter /> <span className="text-sm uppercase tracking-wider">Advanced Filters</span>
            </div>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="bg-white/80 border-none px-4 py-2 rounded-xl text-xs font-bold text-gray-600 focus:ring-2 focus:ring-green-400 shadow-sm">
                <option value="">All Types</option>
                <option value="Liquid">Liquid</option>
                <option value="Granular">Granular</option>
                <option value="Water-Soluble">Water-Soluble</option>
                <option value="Powder">Powder</option>
                <option value="Slow-Release">Slow-Release</option>
            </select>

            <select value={districtFilter} onChange={(e) => setDistrictFilter(e.target.value)} className="bg-white/80 border-none px-4 py-2 rounded-xl text-xs font-bold text-gray-600 focus:ring-2 focus:ring-green-400 shadow-sm">
                <option value="">All Districts</option>
                {["Colombo","Gampaha","Kalutara","Kandy","Matale","Nuwara Eliya","Galle","Matara","Hambantota","Jaffna","Kilinochchi","Mannar","Vavuniya","Mullaitivu","Batticaloa","Ampara","Trincomalee","Kurunegala","Puttalam","Anuradhapura","Polonnaruwa","Badulla","Moneragala","Ratnapura"].map(d => (
                    <option key={d} value={d}>{d}</option>
                ))}
            </select>
        </div>

        {/* Action Buttons */}
        <div className="mb-10 flex flex-wrap gap-4">
          <FertilizerButton />
          <Link 
  to="/crop-advisor" 
  className="text-sm font-bold text-emerald-700 hover:text-emerald-900 transition-all flex items-center gap-2 mt-4 decoration-emerald-200 underline-offset-4 hover:underline"
>
  <span className="bg-emerald-100 p-1 rounded-md">✨</span> 
  Get Fertilizer Recommendations
</Link>
        </div>

        {/* Fertilizer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentItems.map((f) => {
            const id = f.id || f._id;
            return (
              <div
                key={id}
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-white shadow-xl hover:shadow-2xl hover:shadow-green-100 transition-all duration-500 flex flex-col justify-between"
              >
                <div className="p-6">
                  <div className="relative overflow-hidden rounded-[2rem] mb-6 aspect-video">
                    <img
                      src={f.imageUrl ? encodeURI(f.imageUrl.startsWith("http") ? f.imageUrl : `http://localhost:8081/${f.imageUrl.replace(/^.*uploads[\\/]/, "uploads/")}`) : "/placeholder.jpg"}
                      alt={f.name || "Fertilizer"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => { e.currentTarget.src = "/placeholder.jpg"; }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-green-700 shadow-sm border border-green-100">
                        {f.category}
                      </span>
                    </div>
                  </div>

                  <h2
                    className="text-2xl font-black text-gray-800 mb-3 leading-tight group-hover:text-green-700 transition-colors"
                    dangerouslySetInnerHTML={{ __html: highlightMatch(f.name) }}
                  />

                  <button
                    type="button"
                    onClick={() => { setSelectedItem(f); setReviewType("fertilizer"); }}
                    className="flex items-center gap-2 text-green-600 hover:text-green-800 font-bold text-xs uppercase tracking-widest mb-6 transition"
                  >
                    <FiStar className="fill-green-600" /> Write a review
                  </button>

                  <div className="grid grid-cols-2 gap-4 mb-6 border-y border-gray-50 py-4">
                    <div className="space-y-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Code</span>
                        <p className="text-sm font-bold text-gray-700 truncate" dangerouslySetInnerHTML={{ __html: highlightMatch(f.fertilizerCode) }} />
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Type</span>
                        <p className="text-sm font-bold text-gray-700 truncate" dangerouslySetInnerHTML={{ __html: highlightMatch(f.type) }} />
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Location</span>
                        <p className="text-sm font-bold text-gray-700 flex items-center gap-1"><FiMapPin className="text-green-500" /> {f.district}</p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Inventory</span>
                        <p className={`text-sm font-black ${f.stock < 10 ? "text-red-500 animate-pulse" : "text-gray-800"}`}>{f.stock} {f.unit}</p>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm mb-6 line-clamp-2 italic leading-relaxed font-medium">
                    "{f.description}"
                  </p>

                  <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-400 uppercase">Unit Price</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black text-green-700">Rs. {f.displayPrice}</span>
                            <span className="text-xs text-gray-400 font-bold">/ {f.unit}</span>
                        </div>
                    </div>
                    {(f.unit === "bottle" || f.unit === "bag") && f.quantityInside && (
                        <span className="bg-green-50 text-green-700 text-[10px] font-black px-3 py-1.5 rounded-xl border border-green-100">
                          {f.quantityInside} {f.unit === "bag" ? "kg" : "L"} Net
                        </span>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => handleBuy(f)}
                    className="w-full bg-gradient-to-r from-green-700 to-emerald-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:from-green-800 hover:to-emerald-700 transition-all shadow-lg shadow-green-100 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <FiShoppingBag /> Buy Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-20 pb-16 gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-14 h-14 flex items-center justify-center font-black rounded-2xl transition-all duration-300 ${
                  currentPage === page
                    ? "bg-green-700 text-white shadow-xl shadow-green-200 -translate-y-2 scale-110"
                    : "bg-white text-gray-400 hover:bg-green-50 hover:text-green-600 shadow-sm"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}

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