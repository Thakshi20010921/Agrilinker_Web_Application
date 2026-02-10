import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FiFilter } from "react-icons/fi";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ReviewModal from "../../components/ReviewModal"; // ✅ adjust path if needed

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

  /* ===================== PAGINATION ===================== */
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  /* ====================================================== */

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
    setCurrentPage(1);
  }, [fertilizers, searchTerm, sortOption, categoryFilter, typeFilter, districtFilter]);

  const totalPages = Math.ceil(filteredFertilizers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredFertilizers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 md:gap-0">
        <h1 className="text-4xl font-extrabold text-green-800">Fertilizers</h1>

        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Search by name, code, type, category, district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded-lg w-64"
          />

          <button className="flex items-center bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
            <FiFilter className="mr-2 text-lg" /> Filters
          </button>

          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="border p-2 rounded-lg">
            <option value="">Sort By</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
            <option value="nameAZ">Name: A → Z</option>
          </select>

          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="border p-2 rounded-lg">
            <option value="">All Categories</option>
            <option value="Organic">Organic</option>
            <option value="Chemical">Chemical</option>
          </select>

          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border p-2 rounded-lg">
            <option value="">All Types</option>
            <option value="Liquid">Liquid</option>
            <option value="Granular">Granular</option>
            <option value="Water-Soluble">Water-Soluble</option>
            <option value="Powder">Powder</option>
            <option value="Slow-Release">Slow-Release</option>
          </select>

          <select value={districtFilter} onChange={(e) => setDistrictFilter(e.target.value)} className="border p-2 rounded-lg">
            <option value="">All Districts</option>
            <option>Colombo</option>
            <option>Gampaha</option>
            <option>Kalutara</option>
            <option>Kandy</option>
            <option>Matale</option>
            <option>Nuwara Eliya</option>
            <option>Galle</option>
            <option>Matara</option>
            <option>Hambantota</option>
            <option>Jaffna</option>
            <option>Kilinochchi</option>
            <option>Mannar</option>
            <option>Vavuniya</option>
            <option>Mullaitivu</option>
            <option>Batticaloa</option>
            <option>Ampara</option>
            <option>Trincomalee</option>
            <option>Kurunegala</option>
            <option>Puttalam</option>
            <option>Anuradhapura</option>
            <option>Polonnaruwa</option>
            <option>Badulla</option>
            <option>Moneragala</option>
            <option>Ratnapura</option>
          </select>
        </div>
      </div>

      <div className="mb-6 flex gap-4">
        <Link to="/fertilizers/add" className="bg-green-700 text-white px-5 py-3 rounded-lg font-semibold shadow hover:bg-green-800 transition">
          + Add Fertilizer
        </Link>

        <Link to="/fertilizers/recommend" className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition">
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
        <div>
          <img
            src={f.imageUrl || "https://via.placeholder.com/300x200"}
            alt="Fertilizer"
            className="rounded-lg mb-4 w-full h-48 object-cover"
          />

          <h2
            className="text-2xl font-bold text-green-700"
            dangerouslySetInnerHTML={{ __html: highlightMatch(f.name) }}
          />

          {/* Review */}
          <button
            onClick={() => {
              setSelectedItem(f);
              setReviewType("fertilizer");
            }}
            className="text-green-700 underline text-sm mt-2"
          >
            Write a review
          </button>

          <p className="text-sm text-gray-500 mb-1 mt-2">
            Code:{" "}
            <span
              className="font-semibold"
              dangerouslySetInnerHTML={{ __html: highlightMatch(f.fertilizerCode) }}
            />
          </p>

          <p className="text-sm text-gray-600 mb-1">
            Type:{" "}
            <span
              className="font-semibold"
              dangerouslySetInnerHTML={{ __html: highlightMatch(f.type) }}
            />
          </p>

          <p className="text-sm text-gray-600 mb-1">
            Category:{" "}
            <span
              className="font-semibold"
              dangerouslySetInnerHTML={{ __html: highlightMatch(f.category) }}
            />
          </p>

          <p className="text-sm text-gray-600 mb-2">
            District: <span className="font-semibold">{f.district}</span>
          </p>

          <p className="text-gray-600 mb-2 line-clamp-2">{f.description}</p>

          <p className="text-lg font-semibold">
            Rs. {f.price} / {f.unit}
            {(f.unit === "bottle" || f.unit === "bag") && f.quantityInside
              ? ` (${f.quantityInside} ${f.unit === "bag" ? "kg" : "L"})`
              : ""}
          </p>
        </div>

        <div className="flex justify-between mt-4">
          <Link
            to={`/fertilizers/edit/${id}`}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Edit
          </Link>

          <button
            onClick={() => handleBuy(f)}
            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
          >
            Buy
          </button>
        </div>
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
                currentPage === page ? "bg-green-700 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
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
          itemType={reviewType}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
