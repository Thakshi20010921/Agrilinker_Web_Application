import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const farmerEmail = localStorage.getItem("email"); // දැනට login වෙලා ඉන්න ගොවියාගේ email එක

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Backend එකේ ගොවියාගේ email එකට අදාළ orders ගේන endpoint එකක් තිබිය යුතුයි
        const res = await axios.get(
          `http://localhost:8081/api/orders/farmer/${farmerEmail}`,
        );
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [farmerEmail]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl font-black text-emerald-950">
              Incoming Orders
            </h1>
            <p className="text-emerald-600 font-medium">
              Manage your sales and deliveries
            </p>
          </header>

          <div className="grid gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-[2rem] shadow-sm border border-emerald-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                {/* 1. Order ID & Date */}
                <div className="flex-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Order ID
                  </span>
                  <h3 className="text-lg font-bold text-emerald-900">
                    #{order.id.slice(-6)}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>

                {/* 2. Customer Info */}
                <div className="flex-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Customer
                  </span>
                  <p className="font-bold text-slate-700">
                    {order.customer?.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {order.customer?.address}
                  </p>
                </div>

                {/* 3. Items Summary */}
                <div className="flex-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Items
                  </span>
                  <p className="text-sm font-bold text-emerald-700">
                    {order.items.length} Products • LKR {order.totalAmount}
                  </p>
                  <p className="text-xs text-slate-400">
                    Paid via {order.paymentMethod}
                  </p>
                </div>

                {/* 4. Action Workflow Buttons */}
                <div className="flex gap-2">
                  <button className="px-5 py-2.5 bg-emerald-100 text-emerald-700 font-bold rounded-xl hover:bg-emerald-200 transition-all text-sm">
                    Accept Order
                  </button>
                  <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}

            {orders.length === 0 && !loading && (
              <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-300">
                <p className="text-slate-400 font-medium">
                  No orders received yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FarmerOrders;
