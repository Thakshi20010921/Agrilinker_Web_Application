import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom"; // 👈 useLocation ඇඩ් කළා
import { toast } from "react-toastify";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export default function FertilizerSupplierDashboard() {
  const [myFertilizers, setMyFertilizers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // 👈 location එක ගත්තා

  const fetchMyFertilizers = useCallback(async (email) => {
    try {
      const res = await axios.get("http://localhost:8081/api/fertilizers");
      const filtered = res.data.filter(f => f.supplierEmail === email);
      setMyFertilizers(filtered);
    } catch (err) {
      toast.error("Failed to load your fertilizers");
    }
  }, []);

  useEffect(() => {
    const emailFromStorage = localStorage.getItem("email");

    if (!emailFromStorage) {
      navigate("/loginfertilizer");
    } else {
      fetchMyFertilizers(emailFromStorage);
    }
    // ✅ Dependency array එකට location.state ඇඩ් කළා. 
    // එතකොට Update එකෙන් පස්සේ Navigate වෙලා එද්දී දත්ත auto-refresh වෙනවා.
  }, [navigate, fetchMyFertilizers, location.state]); 

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await axios.delete(`http://localhost:8081/api/fertilizers/${id}`);
        toast.success("Deleted successfully!");
        const currentEmail = localStorage.getItem("email");
        fetchMyFertilizers(currentEmail);
      } catch (err) {
        toast.error("Delete failed!");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* ... ඉතිරි UI එක කලින් වගේමයි ... */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-800">My Fertilizer Inventory</h1>
        <Link to="/fertilizers/add" className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-800 transition">
          <FiPlus className="mr-2"/> Add New Product
        </Link>
      </div>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-green-50 text-green-900">
            <tr>
              <th className="p-4 font-bold">Image</th>
              <th className="p-4 font-bold">Name</th>
              <th className="p-4 font-bold">Price</th>
              <th className="p-4 font-bold">Stock</th>
              <th className="p-4 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myFertilizers.length > 0 ? (
              myFertilizers.map((f) => (
                <tr key={f.id || f._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4">
                    <img src={f.imageUrl || "https://via.placeholder.com/50"} alt="" className="w-12 h-12 object-cover rounded-lg shadow-sm" />
                  </td>
                  <td className="p-4 font-medium text-gray-800">{f.name}</td>
                  <td className="p-4 text-green-700 font-bold">Rs. {f.price}</td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-semibold">
                      {f.stock} {f.unit}s
                    </span>
                  </td>
                  <td className="p-4 flex gap-4">
                    <Link to={`/fertilizers/edit/${f.id || f._id}`} className="text-blue-600 hover:text-blue-800 transition">
                      <FiEdit size={20}/>
                    </Link>
                    <button onClick={() => handleDelete(f.id || f._id)} className="text-red-500 hover:text-red-700 transition">
                      <FiTrash2 size={20}/>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-500 italic">
                   No fertilizers found. If you just updated, please wait a second or refresh...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}