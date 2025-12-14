
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="mb-6">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-green-900">Order Confirmed!</h1>
        <p className="text-gray-600 mt-2">Thank you for your purchase</p>
      </div>

      {order && (
        <div className="bg-white shadow rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="text-left space-y-2">
            <p><span className="font-medium">Order ID:</span> {order.id}</p>
            <p><span className="font-medium">Total:</span> ${order.totalAmount.toFixed(2)}</p>
            <p><span className="font-medium">Payment Method:</span> {order.paymentMethod}</p>
            <p><span className="font-medium">Estimated Delivery:</span> 3-5 business days</p>
          </div>
        </div>
      )}

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => navigate('/products')}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => navigate('/orders')}
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300"
        >
          View My Orders
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;