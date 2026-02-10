import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FiFilter } from "react-icons/fi";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ReviewModal from "../../components/ReviewModal"; // ✅ adjust path if needed
import FertilizerButton from "./FertilizerButton";

export default function FertilizerList() {
  const [fertilizers, setFertilizers] = useState([]);
  const [filteredFertilizers, setFilteredFertilizers] = useState([]);

  const [sortOption, setSortOption] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { addToCart } = useContext(CartContext);

  // ✅ Review modal state
  const [selectedItem, setSelectedItem] = useState(null);
  const [reviewType, setReviewType] = useState("fertilizer");

  // ✅ Pagination state and constant
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9; // You can adjust how many items per page

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/fertilizers")
      .then((res) => {
        setFertilizers(res.data);
        setFilteredFertilizers(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const highlightMatch = (text) => {
    if (!text) return "";
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

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

    if (sortOption === "priceLow") temp.sort((a, b) => a.price - b.price);
    else if (sortOption === "priceHigh") temp.sort((a, b) => b.price - a.price);
    else if (sortOption === "nameAZ") temp.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredFertilizers(temp);
    setCurrentPage(1); // ✅ Reset to first page after filtering/sorting
  }, [fertilizers, searchTerm, sortOption, categoryFilter, typeFilter, districtFilter]);

  const totalPages = Math.ceil(filteredFertilizers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredFertilizers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* ...rest of your JSX remains the same */}
      <div className="mb-6 flex gap-4">
        <FertilizerButton /> {/* ✅ Enforces login for Add/Update */}
        <Link
          to="/fertilizers/recommend"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
        >
          Get Fertilizer Recommendation
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentItems.map((f) => {
          const id = f.id || f._id;

          return (
            <div
              key={id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              {/* ...rest of your item JSX */}
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === page
                  ? "bg-green-700 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
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
          itemType={reviewType}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
