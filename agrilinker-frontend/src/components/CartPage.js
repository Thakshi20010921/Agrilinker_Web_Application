import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white min-h-screen py-12 font-sans">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#001233] mb-1">Your cart</h1>
          <p className="text-gray-500 font-medium">{cart.length} item ships at checkout</p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <p className="text-gray-400 mb-4">Your cart is empty</p>
            <Link to="/marketplace" className="text-[#001233] font-bold underline">Go Shopping</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* LEFT SIDE: LIST OF ITEMS */}
            <div className="lg:col-span-7 divide-y divide-gray-200">
              {cart.map((item) => (
                <div key={item.cartItemId} className="py-8 flex gap-6">
                  {/* Product Image Container */}
                  <div className="w-32 h-32 bg-[#F6F6F2] flex items-center justify-center rounded-sm flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="max-h-24 w-auto object-contain" 
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-extrabold text-[#001233] uppercase tracking-tight">
                          {item.name}
                        </h2>
                        <p className="text-sm text-gray-500 font-bold">{item.quantity} items</p>
                      </div>
                      
                      {/* Close/Remove Icon */}
                      <button 
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-[#001233] hover:text-red-600 transition"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      {/* Square Quantity Selector */}
                      <div className="flex items-center border-[2.5px] border-[#001233]">
                        <button 
                          onClick={() => decreaseQty(item.cartItemId)}
                          className="px-3 py-1 font-bold hover:bg-gray-100 transition"
                        >
                          −
                        </button>
                        <span className="px-5 py-1 font-black border-x-[2.5px] border-[#001233]">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => increaseQty(item.cartItemId)}
                          className="px-3 py-1 font-bold hover:bg-gray-100 transition"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Price */}
                      <p className="text-2xl font-black text-[#001233]">
                        Rs. {item.price.toFixed(0)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE: ORDER SUMMARY */}
            <div className="lg:col-span-5">
              <div className="bg-[#FAF9F6] p-10 sticky top-10">
                <h2 className="text-3xl font-black mb-8 text-[#001233]">Summary</h2>
                
                <div className="space-y-4 text-[#001233] font-bold">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cart.length} Items)</span>
                    <span>Rs. {totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>Rs. 0.00</span>
                  </div>
                </div>

                <div className="border-t-2 border-gray-300 mt-10 pt-6 flex justify-between items-center mb-10">
                  <span className="text-xl font-bold">Balance</span>
                  <span className="text-3xl font-black text-[#001233]">
                    Rs. {totalAmount.toFixed(2)}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="block text-center bg-[#001233] text-white py-4 text-lg font-black hover:bg-black transition uppercase tracking-widest"
                >
                  Checkout
                </Link>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;