import React, { useEffect, useState } from "react";
import axios from "axios";

const SalesHistory = () => {
  const [sales, setSales] = useState([]);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Sales History
            </h1>
            <p className="text-gray-500 mt-1">
              Track and manage your farm's performance
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
            <div className="relative">
              <input
                type="number"
                placeholder="Year (YYYY)"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-32 p-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="Month (1-12)"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-32 p-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <button
              onClick={fetchSales}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-sm"
            >
              Apply Filter
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <p className="mt-4 text-gray-500 font-medium">
                Fetching your sales...
              </p>
            </div>
          ) : sales.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-300 text-6xl mb-4">📊</div>
              <p className="text-gray-500 text-lg">
                No sales records found for this period.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-uppercase tracking-wider text-gray-500 font-semibold">
                      Order No
                    </th>
                    <th className="px-6 py-4 text-xs font-uppercase tracking-wider text-gray-500 font-semibold">
                      Date
                    </th>
                    <th className="px-6 py-4 text-xs font-uppercase tracking-wider text-gray-500 font-semibold">
                      Product
                    </th>
                    <th className="px-6 py-4 text-xs font-uppercase tracking-wider text-gray-500 font-semibold">
                      Qty
                    </th>
                    <th className="px-6 py-4 text-xs font-uppercase tracking-wider text-gray-500 font-semibold">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-xs font-uppercase tracking-wider text-gray-500 font-semibold">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-xs font-uppercase tracking-wider text-gray-500 font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {sales.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-700">
                        {item.orderNumber}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {new Date(item.orderDate).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {item.product}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {item.quantity} units
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900">
                        ${Number(item.amount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-tighter">
                          {item.paymentMethod}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusStyle(item.status)}`}
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
    </div>
  );
};

export default SalesHistory;
