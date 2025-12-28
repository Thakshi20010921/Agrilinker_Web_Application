import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const USER_ID = "USER123"; // Matching your current CartContext

  useEffect(() => {
    // Fetching from your Spring Boot API
    axios.get(`http://localhost:8081/api/orders/user/${USER_ID}`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-10">Loading your history...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-900 mb-8">My Purchase History</h1>

      {orders.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
          <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-hover hover:shadow-md">
              <div className="flex flex-col md:flex-row justify-between border-b pb-4 mb-4">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID</p>
                  <p className="font-mono text-sm text-gray-700">{order.id || order._id}</p>
                </div>
                <div className="mt-2 md:mt-0 md:text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Date</p>
                  <p className="text-sm text-gray-700">{new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium">{item.name} <span className="text-gray-400 text-sm">x{item.quantity}</span></span>
                    <span className="text-gray-600">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${order.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {order.paymentStatus} {/* PAID or PENDING */}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase">
                    {order.paymentMethod} {/* cash or card */}
                  </span>
                </div>
                <div className="text-xl font-black text-green-900">
                  Total: Rs. {order.totalAmount.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;