import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // --- Logic & State ---
  const [form, setForm] = useState({ name: "", address: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for mock card details
  const [cardDetails, setCardDetails] = useState({ cardNumber: "", expiry: "", cvv: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleCardChange = (e) => setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });

  const totalAmount = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === "card") {
      setIsModalOpen(true);
    } else {
      processOrder("PENDING");
    }
  };

  const processOrder = async (payStatus) => {
    if (cart.length === 0) return;

    setLoading(true);

    const orderData = {
      customer: { ...form },
      items: cart.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity || 1,
        price: item.price,
      })),
      totalAmount,
      paymentMethod,
      paymentStatus: payStatus,
      orderDate: new Date().toISOString(),
    };

    try {
      // ✅ Create order (token included because api has interceptor)
      const res = await api.post("/api/orders", orderData);

      // ✅ Clear backend cart items
      await Promise.all(
  cart
    .map((i) => i.cartItemId)
    .filter(Boolean)
    .map((id) => api.delete(`/cart/${id}`))
);


      // ✅ Clear frontend cart state
      clearCart();

      // ✅ Close modal and go to success page with order
      setIsModalOpen(false);
navigate("/order-confirmation", { state: { order: res.data || orderData } });
    } catch (error) {
      alert("Error: Connection failed to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 pt-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Forms */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                <span className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center mr-3 text-sm">
                  1
                </span>
                Shipping Details
              </h2>

              <div className="grid grid-cols-1 gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-green-500 focus:bg-white transition-all outline-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-green-500 focus:bg-white transition-all outline-none"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Shipping Address"
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-green-500 focus:bg-white transition-all outline-none"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-green-500 focus:bg-white transition-all outline-none"
                />
              </div>

              <h2 className="text-xl font-bold mt-10 mb-6 text-gray-800 flex items-center">
                <span className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center mr-3 text-sm">
                  2
                </span>
                Payment Method
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                    paymentMethod === "cash" ? "border-green-500 bg-green-50" : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <span className="text-2xl">💵</span>
                  <span className="font-bold text-gray-700">Cash</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                    paymentMethod === "card" ? "border-green-500 bg-green-50" : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <span className="text-2xl">💳</span>
                  <span className="font-bold text-gray-700">Card</span>
                </button>
              </div>

              <button
                type="submit"
                disabled={cart.length === 0 || loading}
                className="w-full bg-green-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-green-700 shadow-lg shadow-green-100 transition-all active:scale-[0.98]"
              >
                {loading ? "Processing..." : "Complete Order"}
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-10">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h2>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.productId} className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-gray-700">
                      Rs. {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-gray-200 mt-6 pt-6">
                <div className="flex justify-between text-2xl font-black text-green-900">
                  <span>Total</span>
                  <span>Rs. {totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MOCK PAYMENT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Card Payment</h2>
            <p className="text-gray-400 text-center mb-8 text-sm uppercase tracking-widest">Secure Mock Transaction</p>

            <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-2xl text-white mb-8 shadow-xl">
              <p className="text-[10px] font-bold opacity-60 mb-1">PAYABLE AMOUNT</p>
              <p className="text-3xl font-black mb-6">Rs. {totalAmount.toFixed(2)}</p>
              <div className="flex justify-between items-end">
                <p className="text-sm tracking-widest font-mono">**** **** **** 1234</p>
                <div className="w-10 h-6 bg-yellow-400/20 rounded-md"></div>
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                maxLength="16"
                onChange={handleCardChange}
                className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  maxLength="5"
                  onChange={handleCardChange}
                  className="w-1/2 p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  maxLength="3"
                  onChange={handleCardChange}
                  className="w-1/2 p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
              </div>
            </div>

            <button
              onClick={() => processOrder("PAID")}
              className="w-full bg-green-600 text-white py-4 rounded-2xl mt-8 font-bold text-lg hover:bg-green-700 shadow-lg shadow-green-200"
              disabled={loading}
            >
              {loading ? "Processing..." : "Verify & Pay"}
            </button>

            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full py-3 mt-2 text-gray-400 hover:text-gray-600 font-medium transition-colors text-sm"
              disabled={loading}
            >
              Return to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
