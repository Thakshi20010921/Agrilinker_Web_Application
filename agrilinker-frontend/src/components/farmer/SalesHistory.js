import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SalesHistory = () => {
  const [sales, setSales] = useState([]);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const farmerEmail = localStorage.getItem("email");

  const fetchSales = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8081/api/orders/sales-history/${farmerEmail}`,
        {
          params: {
            year: year || undefined,
            month: month || undefined,
          },
        },
      );
      setSales(res.data);
    } catch (error) {
      console.error("Error fetching sales:", error);
      alert("Failed to fetch sales history");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSales();
  }, [year, month]);

  // Helper for Status Badge styling
  const getStatusStyle = (status) => {
    const s = status?.toLowerCase();
    if (s === "completed" || s === "delivered")
      return "bg-green-100 text-green-700";
    if (s === "pending") return "bg-yellow-100 text-yellow-700";
    if (s === "cancelled") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-8xl mx-auto">
        {/* PAGE HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-black text-emerald-950">
            Sales History
          </h1>
          <p className="text-emerald-600">
            Track and manage your farm's performance
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 bg-slate-100 p-6 md:p-10 rounded-[20px]">
          {/* MAIN CONTENT AREA */}
          <div className="flex-1 ">
            <p className="m-3 text-black font-bold text-[25px]">
              Serch your harvest data...
            </p>
            {/* FILTERS BAR */}
            <div className="flex flex-wrap items-center gap-4 bg-white p-5 rounded-3xl shadow-sm border border-emerald-50 mb-8">
              <div className="relative flex-1 min-w-[150px]">
                <input
                  type="number"
                  placeholder="Year (YYYY)"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 rounded-2xl border-none bg-slate-50 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                />
              </div>
              <div className="relative flex-1 min-w-[150px]">
                <input
                  type="number"
                  placeholder="Month (1-12)"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 rounded-2xl border-none bg-slate-50 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                />
              </div>
              <button
                onClick={fetchSales}
                className="bg-emerald-600 w-[200px] hover:bg-emerald-700 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-100 active:scale-95"
              >
                Apply Filter
              </button>
            </div>

            {/* DATA TABLE SECTION */}
            <div className="bg-white rounded-[10px] shadow-xl shadow-slate-200/50 border border-emerald-50 overflow-hidden">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24">
                  <div className="animate-spin rounded-[10px] h-12 w-12 border-b-4 border-emerald-600"></div>
                  <p className="mt-4 text-emerald-600 font-bold">
                    Fetching your harvest data...
                  </p>
                </div>
              ) : sales.length === 0 ? (
                <div className="text-center py-24">
                  <div className="text-6xl mb-4 opacity-20">📊</div>
                  <p className="text-slate-400 text-lg font-medium">
                    No sales records found for this period.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white border-b border-emerald-100">
                        <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-emerald-800">
                          Order No
                        </th>
                        <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-emerald-800">
                          Date
                        </th>
                        <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-emerald-800">
                          Product
                        </th>
                        <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-emerald-800">
                          Qty
                        </th>
                        <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-emerald-800">
                          Amount
                        </th>
                        <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-emerald-800">
                          Payment
                        </th>
                        <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-emerald-800">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {sales.map((item, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-emerald-50/30 transition-colors"
                        >
                          <td className="px-6 py-5 font-bold text-slate-700">
                            #{item.orderNumber}
                          </td>
                          <td className="px-6 py-5 text-slate-600 font-medium">
                            {new Date(item.orderDate).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </td>
                          <td className="px-6 py-5 text-slate-600 font-medium">
                            {item.product}
                          </td>
                          <td className="px-6 py-5 text-slate-600 font-medium">
                            {item.quantity} units
                          </td>
                          <td className="px-6 py-5 text-slate-600 font-medium">
                            LKR {Number(item.amount).toLocaleString()}
                          </td>
                          <td className="px-6 py-5">
                            <span className=" text-slate-600 font-medium  tracking-tighter bg-slate-100 px-2 py-1 rounded">
                              {item.paymentMethod}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <span
                              className={`px-4 py-1.5 rounded-full  font-medium uppercase shadow-sm ${getStatusStyle(item.status)}`}
                            >
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT NAVIGATION SIDEBAR */}
          <div className="lg:w-1/4 h-fit space-y-4">
            <div className="flex flex-col items-center space-y-6">
              {[
                { name: "Dashboard", path: "/farmer/dashboard" },
                { name: "Add Product", path: "/farmer/add-product2" },
                { name: "My Orders", path: "/farmer/orders" },
                { name: "My Products", path: "/farmer/my-products" },
                { name: "My request", path: "/farmer/inquiries" },
                { name: "Sales History", path: "/farmer/sales-history" },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center justify-center w-full max-w-[240px] h-[90px] text-lg rounded-full font-bold transition-all duration-300 active:scale-95 shadow-lg border 
                  ${
                    item.name === "Sales History"
                      ? "bg-emerald-800 text-white border-transparent shadow-emerald-200"
                      : "bg-[#29ab87] text-white hover:bg-emerald-400 border-transparent shadow-emerald-100"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesHistory;
