import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom"; // Import this for navigation
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const FarmerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    totalProductsSold: 0,
    pendingPayments: 0,
  });
  const [paymentData, setPaymentData] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [farmerEmail, setFarmerEmail] = useState(localStorage.getItem("email"));

  useEffect(() => {
    const fetchProducts = async () => {
      const email = localStorage.getItem("email"); // always latest
      if (!email) return;

      try {
        const res = await axios.get(
          `http://localhost:8081/api/products/farmer/${email}`,
        );
        setProducts(res.data);

        // fetch stats
        const statsRes = await axios.get(
          `http://localhost:8081/api/orders/farmer-stats/${email}`,
        );
        setStats(statsRes.data);

        // ✅ add this payment breakdown fetch
        axios
          .get(
            `http://localhost:8081/api/orders/farmer/payment-breakdown/${email}`,
          )
          .then((res) => {
            // Transform if res.data is object
            const data = Object.entries(res.data).map(([key, value]) => ({
              name: key,
              value: value,
            }));
            setPaymentData(data);
          })
          .catch((err) => console.error(err));

        setFarmerEmail(email); // update state if needed
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts(); // initial fetch

    // Listen for login changes
    window.addEventListener("farmerChanged", fetchProducts);
    return () => window.removeEventListener("farmerChanged", fetchProducts);
  }, []);

  /*useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8081/api/products/my-products", // new endpoint
          {
            headers: {
              Authorization: `Bearer ${token}`, // send the JWT
            },
          },
        );
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [token]); // run when token changes*/

  return (
    <div className="relative min-h-screen bg-slate-50 p-8">
      {/* --- HEADER SECTION --- */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-emerald-950">
          Farmer Dashboard
        </h1>
        <p className="text-emerald-600 font-medium">
          Manage your harvests and listings
        </p>
      </div>

      {/* --- STATS CARD --- */}

      <button
        type="button"
        onClick={() => navigate("/farmer/add-product2")}
        className="w-[110px] h-[110px] bg-white p-6 rounded-full shadow-sm border border-emerald-100 mb-8 inline-block text-left"
      >
        <h2 className="text-sm font-bold text-emerald-800 uppercase tracking-wider">
          Add Products
        </h2>
      </button>

      <button
        type="button"
        onClick={() => navigate("/farmer/my-products")}
        className="w-[110px] h-[110px] bg-white p-6 rounded-full shadow-sm border border-emerald-100 mb-8 inline-block text-left"
      >
        <h2 className="text-sm font-bold text-emerald-800 uppercase tracking-wider">
          My Products
        </h2>
      </button>

      <button
        type="button"
        onClick={() => navigate("/farmer/inquiries")}
        className="w-[110px] h-[110px] bg-white p-6 rounded-full shadow-sm border border-emerald-100 mb-8 inline-block text-left"
      >
        <h2 className="text-sm font-bold text-emerald-800 uppercase tracking-wider">
          My Requests
        </h2>
      </button>

      <button
        type="button"
        onClick={() => navigate("/farmer/orders")}
        className="w-[110px] h-[110px] bg-white p-6 rounded-full shadow-sm border border-emerald-100 mb-8 inline-block text-left"
      >
        <h2 className="text-sm font-bold text-emerald-800 uppercase tracking-wider">
          My orders
        </h2>
      </button>

      <button
        type="button"
        onClick={() => navigate("/farmer/sales-history")}
        className="w-[110px] h-[110px] bg-white p-6 rounded-full shadow-sm border border-emerald-100 mb-8 inline-block text-left"
      >
        <h2 className="text-sm font-bold text-emerald-800 uppercase tracking-wider">
          Sales History
        </h2>
      </button>

      <br></br>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 mb-8 inline-block">
        <h2 className="text-sm font-bold text-emerald-800 uppercase tracking-wider">
          Total Products
        </h2>
        <p className="text-4xl font-black text-emerald-600">
          {products.length}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {/* Total Sales */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
          <h2 className="text-sm font-bold text-emerald-800 uppercase">
            Total Sales
          </h2>
          <p className="text-2xl font-black text-emerald-600">
            Rs. {stats.totalSales.toFixed(2)}
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
          <h2 className="text-sm font-bold text-emerald-800 uppercase">
            Total Orders
          </h2>
          <p className="text-2xl font-black text-emerald-600">
            {stats.totalOrders}
          </p>
        </div>

        {/* Average Order Value */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
          <h2 className="text-sm font-bold text-emerald-800 uppercase">
            Avg Order Value
          </h2>
          <p className="text-2xl font-black text-emerald-600">
            Rs. {stats.averageOrderValue.toFixed(2)}
          </p>
        </div>

        {/* Total Products Sold */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
          <h2 className="text-sm font-bold text-emerald-800 uppercase">
            Products Sold
          </h2>
          <p className="text-2xl font-black text-emerald-600">
            {stats.totalProductsSold}
          </p>
        </div>

        {/* Pending Payments */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100">
          <h2 className="text-sm font-bold text-red-800 uppercase">
            Pending Payments
          </h2>
          <p className="text-2xl font-black text-red-600">
            Rs. {stats.pendingPayments.toFixed(2)}
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={paymentData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#10b981"
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FarmerDashboard;
