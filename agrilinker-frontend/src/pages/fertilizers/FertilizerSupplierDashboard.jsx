import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEdit, FiTrash2, FiPlus, FiBox, FiDollarSign, FiPackage } from "react-icons/fi";

export default function FertilizerSupplierDashboard() {
  const [myFertilizers, setMyFertilizers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

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
  }, [navigate, fetchMyFertilizers, location.state]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      try {
        await axios.delete(`http://localhost:8081/api/fertilizers/${id}`);
        toast.success("Product deleted successfully!");
        const currentEmail = localStorage.getItem("email");
        fetchMyFertilizers(currentEmail);
      } catch (err) {
        toast.error("Delete failed!");
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 border-l-8 border-green-600 pl-4">
              Supplier Dashboard
            </h1>
            <p className="text-gray-600 mt-1 ml-6">Manage your fertilizer inventory and stock levels.</p>
          </div>
          
          <Link 
            to="/fertilizers/add" 
            className="flex items-center bg-green-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-green-800 transition transform hover:-translate-y-1 active:scale-95"
          >
            <FiPlus className="mr-2 text-xl"/> Add New Product
          </Link>
        </div>

        {/* Inventory Table Container */}
        <div className="bg-white shadow-sm rounded-3xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-green-50/50 text-green-900 border-b border-green-100">
                  <th className="p-6 font-bold uppercase text-xs tracking-wider">Product</th>
                  <th className="p-6 font-bold uppercase text-xs tracking-wider text-center">Price</th>
                  <th className="p-6 font-bold uppercase text-xs tracking-wider text-center">Stock Status</th>
                  <th className="p-6 font-bold uppercase text-xs tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-50">
                {myFertilizers.length > 0 ? (
                  myFertilizers.map((f) => (
                    <tr key={f.id || f._id} className="hover:bg-gray-50/80 transition-colors group">
                      {/* Product Info */}
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img 
                              src={f.imageUrl || "https://via.placeholder.com/60"} 
                              alt={f.name} 
                              className="w-14 h-14 object-cover rounded-xl shadow-sm border border-gray-100" 
                            />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 text-lg">{f.name}</div>
                            <div className="text-xs text-gray-400 font-mono uppercase tracking-tighter">{f.fertilizerCode || "NO-CODE"}</div>
                          </div>
                        </div>
                      </td>
{/* Price */}
<td className="p-6 text-center">
  <div className="inline-flex items-center text-green-700 font-bold bg-green-50 px-3 py-1 rounded-lg border border-green-100">
    <span className="mr-1.5 text-[10px] font-black opacity-60">LKR</span> 
   {f.price}
  </div>
</td>

                      {/* Stock */}
                      <td className="p-6 text-center">
                        <div className="flex flex-col items-center">
                          <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                            f.stock < 10 
                              ? "bg-red-100 text-red-700 border border-red-200" 
                              : "bg-blue-50 text-blue-700 border border-blue-100"
                          }`}>
                            {f.stock} {f.unit}s Left
                          </span>
                          {f.stock < 10 && (
                            <span className="text-[10px] text-red-500 mt-1 font-bold animate-pulse italic">Low Stock Alert!</span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-6">
                        <div className="flex justify-end gap-3">
                          <Link 
                            to={`/fertilizers/edit/${f.id || f._id}`} 
                            className="p-3 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-300 shadow-sm"
                            title="Edit Product"
                          >
                            <FiEdit size={18}/>
                          </Link>
                          <button 
                            onClick={() => handleDelete(f.id || f._id)} 
                            className="p-3 text-red-500 bg-red-50 hover:bg-red-600 hover:text-white rounded-xl transition-all duration-300 shadow-sm"
                            title="Delete Product"
                          >
                            <FiTrash2 size={18}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-20 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-gray-100 p-6 rounded-full mb-4">
                          <FiBox size={40} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">No Products Found</h3>
                        <p className="text-gray-500 max-w-xs mx-auto mt-2">
                          Your inventory is currently empty. Start by adding your first fertilizer product.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Stats (Optional visual element) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="bg-green-100 p-4 rounded-2xl text-green-700"><FiPackage size={24}/></div>
              <div>
                <div className="text-sm text-gray-500">Total Items</div>
                <div className="text-2xl font-black text-gray-900">{myFertilizers.length}</div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}