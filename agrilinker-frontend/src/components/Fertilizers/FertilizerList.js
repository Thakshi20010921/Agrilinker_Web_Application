import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FiFilter } from "react-icons/fi";
import { CartContext } from "../../context/CartContext";


export default function FertilizerList() {
  const [fertilizers, setFertilizers] = useState([]);
  const [filteredFertilizers, setFilteredFertilizers] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ CartContext
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/fertilizers")
      .then((res) => {
        setFertilizers(res.data);
        setFilteredFertilizers(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // SAFE highlight function
  const highlightMatch = (text) => {
    if (!text) return "";
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  // APPLY SEARCH + FILTER + SORT
  useEffect(() => {
    let temp = [...fertilizers];

    if (searchTerm.trim() !== "") {
      const text = searchTerm.toLowerCase();
      temp = temp.filter(
        (f) =>
          (f.fertilizerCode && f.fertilizerCode.toLowerCase() === text) ||
          (f.name && f.name.toLowerCase().includes(text)) ||
          (f.category && f.category.toLowerCase().includes(text)) ||
          (f.type && f.type.toLowerCase().includes(text))
      );
    }

    if (categoryFilter) {
      temp = temp.filter((f) => f.category === categoryFilter);
    }

    if (typeFilter) {
      temp = temp.filter((f) => f.type === typeFilter);
    }

    if (sortOption === "priceLow") {
      temp.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHigh") {
      temp.sort((a, b) => b.price - a.price);
    } else if (sortOption === "nameAZ") {
      temp.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredFertilizers(temp);
  }, [fertilizers, searchTerm, sortOption, categoryFilter, typeFilter]);

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Header + Search + Filters */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-green-800">Fertilizers</h1>

        <div className="flex space-x-3 items-center">
          <input
            type="text"
            placeholder="Search by name, code, type, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded-lg w-64"
          />

          <button className="flex items-center bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
            <FiFilter className="mr-2 text-lg" /> Filters
          </button>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option value="">Sort By</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
            <option value="nameAZ">Name: A → Z</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="Organic">Organic</option>
            <option value="Chemical">Chemical</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option value="">All Types</option>
            <option value="Liquid">Liquid</option>
            <option value="Granular">Granular</option>
            <option value="Water-Soluble">Water-Soluble</option>
            <option value="Powder">Powder</option>
            <option value="Slow-Release">Slow-Release</option>
          </select>
        </div>
      </div>

      {/* Add Button */}
      <div className="mb-6">
        <a
          href="/fertilizers/add"
          className="bg-green-700 text-white px-5 py-3 rounded-lg font-semibold shadow hover:bg-green-800 transition"
        >
          + Add Fertilizer
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFertilizers.map((f) => (
          <div
            key={f.id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={f.imageUrl || "https://via.placeholder.com/300x200"}
              alt="Fertilizer"
              className="rounded-lg mb-4"
            />

            <h2
              className="text-2xl font-bold text-green-700"
              dangerouslySetInnerHTML={{ __html: highlightMatch(f.name) }}
            />

            <p className="text-sm text-gray-500 mb-1">
              Code:{" "}
              <span
                className="font-semibold"
                dangerouslySetInnerHTML={{
                  __html: highlightMatch(f.fertilizerCode),
                }}
              ></span>
            </p>

            <p className="text-sm text-gray-600 mb-1">
              Type:{" "}
              <span
                className="font-semibold"
                dangerouslySetInnerHTML={{ __html: highlightMatch(f.type) }}
              ></span>
            </p>

            <p className="text-sm text-gray-600 mb-2">
              Category:{" "}
              <span
                className="font-semibold"
                dangerouslySetInnerHTML={{ __html: highlightMatch(f.category) }}
              ></span>
            </p>

            <p className="text-gray-600 mb-2">{f.description}</p>

            <p className="text-lg font-semibold">
              Rs. {f.price} / {f.unit}
              {(f.unit === "bottle" || f.unit === "bag") && f.quantityInside
                ? ` (${f.quantityInside} ${f.unit === "bag" ? "kg" : "L"})`
                : ""}
            </p>

            <div className="flex justify-between mt-4">
              <a
                href={`/fertilizers/update/${f.id}`}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Edit
              </a>

              {/* ✅ BUY BUTTON NOW WORKS WITH CART */}
              <button
  onClick={() =>
    addToCart({
      _id: f.id,  // consistent with CartContext
      name: f.name,
      price: f.price,
      unit: f.unit,
      image: f.imageUrl,
    })
  }
  className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
>
  Buy
</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
