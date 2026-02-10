import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { order } = location.state || {};

  const orderId =
    order?.orderNumber || order?.id || order?._id || order?.orderId || "N/A";

  const total =
    typeof order?.totalAmount === "number" ? order.totalAmount : null;

  // ✅ 1) ADD THIS FUNCTION (inside component, before return)
  const downloadInvoice = async () => {
    const orderNumber = order?.orderNumber;
    if (!orderNumber) {
      alert("Order number not found");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8081/api/orders/${orderNumber}/invoice`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // change if you store token elsewhere
          },
        }
      );

      if (!res.ok) {
        alert("Invoice download failed");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${orderNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Error downloading invoice");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="mb-6">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-green-900">Order Confirmed!</h1>
        <p className="text-gray-600 mt-2">Thank you for your purchase</p>
      </div>

      {order ? (
        <div className="bg-white shadow rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="text-left space-y-2">
            <p>
              <span className="font-medium">Order ID:</span> {orderId}
            </p>
            <p>
              <span className="font-medium">Total:</span>{" "}
              {total !== null ? `Rs. ${total.toFixed(2)}` : "Rs. N/A"}
            </p>
            <p>
              <span className="font-medium">Payment Method:</span>{" "}
              {order.paymentMethod || "N/A"}
            </p>
            <p>
              <span className="font-medium">Payment Status:</span>{" "}
              {order.paymentStatus || "N/A"}
            </p>
            <p>
              <span className="font-medium">Estimated Delivery:</span> 3–5 business
              days
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6 text-left">
          <p className="font-semibold text-yellow-800">
            Order created, but details were not passed to this page.
          </p>
          <p className="text-yellow-700 text-sm mt-2">
            Click “View My Orders” to see it.
          </p>
        </div>
      )}

      <div className="flex gap-4 justify-center flex-wrap">
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

        {/* ✅ 2) ADD THIS BUTTON */}
        {order?.orderNumber && (
          <button
            onClick={downloadInvoice}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Download Receipt
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmation;
