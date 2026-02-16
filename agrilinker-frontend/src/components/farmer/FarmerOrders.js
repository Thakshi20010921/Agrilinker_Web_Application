import React, { useState, useEffect } from "react";
import axios from "axios";

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal එක සඳහා state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // logged farmer email
  const farmerEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log("Fetching orders for:", farmerEmail);

        const res = await axios.get(
          `http://localhost:8081/api/orders/farmer/${farmerEmail}`,
        );

        console.log("Orders received:", res.data);

        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setLoading(false);
      }
    };

    if (farmerEmail) {
      fetchOrders();
    }
  }, [farmerEmail]);

  // Modal එක විවෘත කරන function එක
  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Modal එක වසන function එක
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const updateOrderStatus = async (newStatus) => {
    try {
      await axios.put(`http://localhost:8081/api/orders/${selectedOrder.id}`, {
        ...selectedOrder,
        status: newStatus,
      });

      alert("Order status updated");

      // update UI
      setSelectedOrder((prev) => ({
        ...prev,
        status: newStatus,
      }));
    } catch (error) {
      console.error(error);
      alert("Error updating order status");
    }
  };

  const updatePaymentStatus = async (newPaymentStatus) => {
    try {
      await axios.put(`http://localhost:8081/api/orders/${selectedOrder.id}`, {
        ...selectedOrder,
        paymentStatus: newPaymentStatus,
      });

      alert("Payment status updated");

      setSelectedOrder((prev) => ({
        ...prev,
        paymentStatus: newPaymentStatus,
      }));
    } catch (error) {
      console.error(error);
      alert("Error updating payment status");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl font-black text-emerald-950">
              Incoming Orders
            </h1>
            <p className="text-slate-70 font-medium">
              Manage your sales and deliveries
            </p>
          </header>

          {/* Loading */}
          {loading && (
            <div className="text-center py-20">
              <p className="text-slate-500 font-medium">Loading orders...</p>
            </div>
          )}

          {/* Orders List */}
          <div className="grid gap-6">
            {!loading &&
              orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white p-6 rounded-[2rem] shadow-sm border border-emerald-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  {/* Order ID */}
                  <div className="flex-1">
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      Order ID
                    </span>

                    <h3 className="text-lg font-bold text-emerald-900">
                      #{order.orderNumber} {/* .slice(-6)*/}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {order.orderDate
                        ? new Date(order.orderDate).toLocaleDateString()
                        : "No date"}
                    </p>
                  </div>

                  {/* Customer */}
                  <div className="flex-1">
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      Customer
                    </span>

                    <p className="font-bold text-slate-700">
                      {order.customer?.name || "Unknown"}
                    </p>

                    <p className="text-xs text-slate-500">
                      {order.customer?.address || "No address"}
                    </p>
                  </div>

                  {/* Items */}
                  <div className="flex-1">
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      Items
                    </span>

                    <p className="text-sm font-bold text-emerald-700">
                      {order.items?.length || 0} Products • LKR{" "}
                      {order.totalAmount}
                    </p>

                    <p className="text-xs text-slate-400">
                      Paid via {order.paymentMethod}
                    </p>
                  </div>

                  <div className="flex-1">
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      Status
                    </span>

                    <p className="font-bold text-slate-700">{order.status}</p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    {/*<button className="px-5 py-2.5 bg-emerald-100 text-emerald-700 font-bold rounded-xl hover:bg-emerald-200 transition-all text-sm">
                      Accept Order
                    </button>*/}

                    <button
                      onClick={() => openOrderDetails(order)}
                      className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}

            {/* No orders */}
            {!loading && orders.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-300">
                <p className="text-slate-400 font-medium">
                  No orders received yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* --- Detailed Order Modal --- */}
      {/* --- Professional Order Modal --- */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={closeModal}
          />

          <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-start">
              <div>
                <div className=" items-center gap-3 mb-1 w-[400px]">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Order Details
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 uppercase tracking-wide">
                    {selectedOrder.status || "Paid"}
                  </span>
                </div>
                <p className="text-sm  text-slate-900 uppercase ">
                  Order Number:{" "}
                  <span className="text-slate-900">
                    {selectedOrder.orderNumber}
                  </span>
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-8 max-h-[65vh] overflow-y-auto custom-scrollbar">
              {/* Top Info Grid */}
              <div className="grid grid-cols-2 gap-12 mb-10">
                <section>
                  <h4 className="text-[13px] uppercase tracking-widest font-bold text-slate-900 mb-3">
                    Customer Details
                  </h4>
                  <div className="space-y-1">
                    <p className=" text-slate-900">
                      {selectedOrder.customer?.name}
                    </p>
                    <p className="text-[15px] text-slate-900">
                      {selectedOrder.customer?.email}
                    </p>
                    <p className="text-[15px] text-slate-900 leading-relaxed mt-2">
                      {selectedOrder.customer?.address}
                    </p>
                  </div>
                </section>

                <section>
                  <h4 className="text-[13px] uppercase tracking-widest font-bold text-slate-900 mb-3">
                    Order Info
                  </h4>
                  <div className="space-y-2 ">
                    <div className="flex justify-between text-[15px]">
                      <span className="text-slate-900">Date</span>
                      <span className="font-medium text-slate-900">
                        {new Date(selectedOrder.orderDate).toLocaleDateString(
                          undefined,
                          { dateStyle: "medium" },
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-[15px]">
                      <span className="text-slate-900">Payment Method</span>
                      <span className="font-medium text-slate-900">
                        {selectedOrder.paymentMethod}
                      </span>
                    </div>

                    <div className="flex justify-between text-[15px]">
                      <span className="text-slate-900">Payment Status</span>
                      <span className="font-medium text-slate-900">
                        {selectedOrder.paymentStatus}
                      </span>
                    </div>
                  </div>
                </section>
              </div>

              {/* Items Section */}
              <section>
                <h4 className="text-[13px] uppercase tracking-widest font-bold text-slate-900  mb-4">
                  Purchased Items
                </h4>
                <div className="border border-slate-400 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 border-b border-slate-300">
                      <tr>
                        <th className="px-4 py-3 text-[13px]  text-slate-600">
                          Product
                        </th>
                        <th className="px-4 py-3 text-[12px]  text-slate-600 text-center">
                          Qty
                        </th>
                        <th className="px-4 py-3 text-[12px]  text-slate-600 text-right">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {selectedOrder.items?.map((item, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-slate-50/30 transition-colors"
                        >
                          <td className="px-4 py-4 text-[14px]  text-slate-800">
                            {item.name || "Product"}
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-600 text-center">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-4 text-sm font-semibold text-slate-900 text-right">
                            LKR {(item.price * item.quantity).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <div className="flex gap-3 mt-4">
                {/* ACCEPT BUTTON */}
                <button
                  onClick={() => updateOrderStatus("ACCEPTED")}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Accept
                </button>

                {/* REJECT BUTTON */}
                <button
                  onClick={() => updateOrderStatus("REJECTED")}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Reject
                </button>
                <button
                  onClick={() => updateOrderStatus("COMPLETED")}
                  className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-red-700"
                >
                  completed
                </button>

                {/* MARK AS PAID BUTTON */}
                <button
                  onClick={() => updatePaymentStatus("PAID")}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Mark Paid
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                  Total Amount
                </p>
                <p className="text-2xl font-black text-emerald-600">
                  LKR {selectedOrder.totalAmount?.toLocaleString()}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="px-8 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerOrders;
