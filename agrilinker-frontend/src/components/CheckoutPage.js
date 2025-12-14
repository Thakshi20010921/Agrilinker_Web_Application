import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const CheckoutPage = () => {
  const { cart } = useContext(CartContext);

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare order data
    const orderData = {
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address
      },
      items: cart.map(item => ({
        fertilizerId: item.id,
        name: item.name,
        quantity: item.quantity || 1,
        price: item.price
      })),
      totalAmount: totalAmount,
      paymentMethod: "cash", // Changed from "dummy" to something more common
      orderDate: new Date().toISOString()
    };

    console.log("Sending order data:", orderData); // Debug log

    try {
      const response = await fetch("http://localhost:8081/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      console.log("Response status:", response.status); // Debug log

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Order placed successfully:", data);
      
      // Clear cart after successful order
      // If you have a clearCart function in CartContext, you can add it here
      
      alert(`Order placed successfully! 🎉\nOrder ID: ${data.id || data.orderId || 'N/A'}`);
      
      // Reset form
      setForm({
        name: "",
        address: "",
        phone: "",
        email: "",
      });

    } catch (error) {
      console.error("Error placing order:", error);
      
      // More specific error messages
      if (error.message.includes("Failed to fetch")) {
        alert("Cannot connect to server. Please check if the backend is running on http://localhost:8081");
      } else if (error.message.includes("HTTP error")) {
        alert(`Server error: ${error.message}`);
      } else {
        alert("Failed to place order. Please check console for details.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Alternative API endpoint test
  const testConnection = async () => {
    try {
      console.log("Testing connection to http://localhost:8081/api/orders");
      const response = await fetch("http://localhost:8081/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log("Connection test response:", response.status, response.statusText);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Existing orders:", data);
        alert("Connection successful! API is reachable.");
      } else {
        alert(`API responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Connection test failed:", error);
      alert("Cannot connect to API. Make sure backend is running on port 8081.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-900">Checkout</h1>

      {/* Debug button */}
      <button
        onClick={testConnection}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test API Connection
      </button>

      {/* Order Summary */}
      <div className="mb-6 p-4 rounded-xl bg-white shadow">
        <h2 className="text-xl font-semibold mb-3">Order Summary</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.name} (Qty: {item.quantity || 1})</span>
                <span className="font-semibold">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
              </div>
            ))}

            <hr className="my-3" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>

      {/* Checkout Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-3 mb-3 border rounded-lg"
          disabled={cart.length === 0 || loading}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 mb-3 border rounded-lg"
          disabled={cart.length === 0 || loading}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full p-3 mb-3 border rounded-lg"
          disabled={cart.length === 0 || loading}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-lg"
          disabled={cart.length === 0 || loading}
        />

        <button
          type="submit"
          className={`bg-green-600 text-white w-full py-3 rounded-lg hover:bg-green-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={cart.length === 0 || loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Place Order"
          )}
        </button>

        {cart.length === 0 && (
          <p className="text-red-500 text-center mt-2">Add items to cart before checkout</p>
        )}
      </form>

      {/* Debug info */}
      <div className="mt-4 p-4 bg-gray-100 rounded text-sm">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <p>Cart items: {cart.length}</p>
        <p>API Endpoint: http://localhost:8081/api/orders</p>
        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CheckoutPage;