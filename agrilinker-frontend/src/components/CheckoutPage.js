import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", address: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setLoading(true);

    const orderData = {
      customer: { ...form },
      items: cart.map(i => ({ fertilizerId: i.productId, name: i.name, quantity: i.quantity, price: i.price })),
      totalAmount,
      paymentMethod: "cash",
      orderDate: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:8081/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) throw new Error("Failed to place order");

      const data = await response.json();

      clearCart(); // ✅ clear cart after order
      navigate("/order-confirmation", { state: { order: data } }); // ✅ redirect
    } catch (err) {
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-900">Checkout</h1>

      {/* Order Summary */}
      <div className="mb-6 p-4 rounded-xl bg-white shadow">
        <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
        {cart.length === 0 ? <p className="text-gray-500">Your cart is empty</p> : (
          <>
            {cart.map(item => (
              <div key={item.productId} className="flex justify-between mb-2">
                <span>{item.name} (Qty: {item.quantity})</span>
                <span className="font-semibold">Rs. {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr className="my-3"/>
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>Rs. {totalAmount.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>

      {/* Shipping Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required
               className="w-full p-3 mb-3 border rounded-lg" disabled={cart.length===0 || loading}/>
        <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required
               className="w-full p-3 mb-3 border rounded-lg" disabled={cart.length===0 || loading}/>
        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required
               className="w-full p-3 mb-3 border rounded-lg" disabled={cart.length===0 || loading}/>
        <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required
               className="w-full p-3 mb-4 border rounded-lg" disabled={cart.length===0 || loading}/>

        <button type="submit"
                disabled={cart.length===0 || loading}
                className="bg-green-600 text-white w-full py-3 rounded-lg hover:bg-green-700 disabled:opacity-50">
          {loading ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
