import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } =
    useContext(CartContext);

  
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-900">Your Cart</h1>

      
      {cart.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-lg">
          Your cart is empty 🛒
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
  <div
    key={item.productId}
    className="border p-4 rounded-xl flex justify-between items-center bg-white shadow-sm"
  >
    <div>
      <h2 className="text-lg font-semibold">{item.name}</h2>
      <p className="text-green-600 font-bold">Rs. {item.price}</p>
    </div>

    <div className="flex items-center space-x-4">
      <button
        className="px-3 py-1 bg-gray-300 rounded"
        onClick={() => decreaseQty(item.productId)}
      >
        −
      </button>

      <span className="text-lg font-semibold">{item.quantity}</span>

      <button
        className="px-3 py-1 bg-gray-300 rounded"
        onClick={() => increaseQty(item.productId)}
      >
        +
      </button>
    </div>

    <button
      onClick={() => removeFromCart(item.productId)}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
    >
      Remove
    </button>
  </div>
))}


          
          <div className="mt-8 p-4 border rounded-xl bg-gray-100">
            <h2 className="text-xl font-bold text-gray-800">
              Total: ${totalAmount}
            </h2>

            
            <Link
              to="/checkout"
              className="mt-4 inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
