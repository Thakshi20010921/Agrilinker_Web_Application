import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/orders/${orderId}`)
      .then((res) => setOrder(res.data))
      .catch(() => console.error("Failed to load order"));
  }, [orderId]);

  if (!order) {
    return <p className="text-center mt-10">Loading order details...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="mb-6">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-green-900">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase
        </p>
      </div>

     <div className="bg-white shadow rounded-xl p-6 mb-6 text-left">
  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
  <p><b>Order ID:</b> {order._id}</p>
  <p><b>Total Amount:</b> Rs. {order.totalAmount}</p>
  <p><b>Status:</b> {order.status}</p>
  <p><b>Order Date:</b> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</p>
</div>


      <div className="flex gap-4 justify-center">
        <button
          onClick={() => navigate("/marketplace")}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => navigate("/orders")}
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300"
        >
          View My Orders
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
