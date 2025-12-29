import React, { useEffect, useState, useContext } from "react";
import { FiFilter } from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { CartContext } from "../../context/CartContext";

export default function FertilizerList() {
  const [fertilizers, setFertilizers] = useState([]);
  const [filteredFertilizers, setFilteredFertilizers] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { addToCart } = useContext(CartContext);

  // LOAD DATA
  useEffect(() => {
    api.get("/api/fertilizers")
      .then(res => {
        setFertilizers(res.data);
        setFilteredFertilizers(res.data);
      })
      .catch(err => console.error("Fertilizer load error:", err));
  }, []);

  // HIGHLIGHT SEARCH
  const highlightMatch = (text) => {
    if (!text || !searchTerm) return text;
    return text.replace(
      new RegExp(`(${searchTerm})`, "gi"),
      "<mark>$1</mark>"
    );
  };

  // SEARCH + SORT
  useEffect(() => {
    let temp = [...fertilizers];
    const text = searchTerm.toLowerCase();

    if (text) {
      temp = temp.filter(f =>
        f.name?.toLowerCase().includes(text) ||
        f.fertilizerCode?.toLowerCase().includes(text) ||
        f.category?.toLowerCase().includes(text) ||
        f.type?.toLowerCase().includes(text)
      );
    }

    if (sortOption === "priceLow") temp.sort((a, b) => a.price - b.price);
    if (sortOption === "priceHigh") temp.sort((a, b) => b.price - a.price);
    if (sortOption === "nameAZ") temp.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredFertilizers(temp);
  }, [fertilizers, searchTerm, sortOption]);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-green-800">Fertilizers</h1>

        <div className="flex space-x-3 items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border p-2 rounded-lg w-64"
          />

          <button className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
            <FiFilter className="mr-2" /> Filters
          </button>

          <select
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option value="">Sort By</option>
            <option value="priceLow">Price ↑</option>
            <option value="priceHigh">Price ↓</option>
            <option value="nameAZ">Name A–Z</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFertilizers.map(f => (
          <div key={f.id} className="bg-white p-5 rounded-xl shadow">
            <img
              src={f.imageUrl || "https://via.placeholder.com/300x200"}
              alt={f.name}
              className="rounded-lg mb-4"
            />

            <h2
              className="text-2xl font-bold text-green-700"
              dangerouslySetInnerHTML={{ __html: highlightMatch(f.name) }}
            />

            <p className="text-sm text-gray-500">
              Code:
              <span
                dangerouslySetInnerHTML={{ __html: highlightMatch(f.fertilizerCode) }}
              />
            </p>

            <p className="text-sm text-gray-600">Type: {f.type}</p>
            <p className="text-sm text-gray-600">Category: {f.category}</p>

            <p className="mt-2 text-lg font-semibold">
              Rs. {f.price} / {f.unit}
            </p>

            <div className="flex justify-between mt-4">
              <Link
                to={`/fertilizers/update/${f.id}`}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </Link>

              <button
                onClick={() => addToCart(f)}
                className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
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
