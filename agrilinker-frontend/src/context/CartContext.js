import { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const CartContext = createContext();

const USER_ID = "USER123"; // TEMP – later from JWT

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // LOAD CART
  useEffect(() => {
    api.get(`/cart/${USER_ID}`)
      .then(res => setCart(res.data))
      .catch(err => console.error("Load cart error:", err));
  }, []);

  // ADD TO CART
 // Inside CartContext.js
const addToCart = (item) => {
  // Normalize the item ID because some objects use 'id' and others might use '_id'
  const itemId = item.id || item._id;

  setCart(prev => {
    const exists = prev.find(p => p.productId === itemId);
    if (exists) {
      return prev.map(p =>
        p.productId === itemId ? { ...p, quantity: p.quantity + 1 } : p
      );
    }
    return [
      ...prev,
      {
        cartItemId: Math.random().toString(36).substring(2, 9),
        productId: itemId,
        name: item.name,
        price: item.price,
        quantity: 1,
        unit: item.unit || "unit",
        image: item.imageUrl || (item.product_image ? `http://localhost:8081${item.product_image}` : "/images/placeholder.png"),
      }
    ];
  });

  // API Call - Ensure the field names match your Java CartItem.java model
  api.post(`/cart/${USER_ID}`, {
    productId: itemId,
    name: item.name,
    price: item.price,
    unit: item.unit || "unit",
    image: item.imageUrl || (item.product_image ? `http://localhost:8081${item.product_image}` : "/images/placeholder.png"),
    quantity: 1
  }).catch(err => console.error("Add to cart error:", err));
};

  // INCREASE
  const increaseQty = (cartItemId) => {
    setCart(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

    api.put(`/cart/${cartItemId}?qty=1`)
      .catch(err => console.error("Update quantity error:", err));
  };

  // DECREASE
  const decreaseQty = (cartItemId) => {
    setCart(prev =>
      prev
        .map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );

    api.put(`/cart/${cartItemId}?qty=-1`)
      .catch(err => console.error("Update quantity error:", err));
  };

  // REMOVE
  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    api.delete(`/cart/${cartItemId}`)
      .catch(err => console.error("Remove from cart error:", err));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQty, decreaseQty, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
