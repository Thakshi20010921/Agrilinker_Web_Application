import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

const API_URL = "http://localhost:8081/cart";
const USER_ID = "USER123"; // later from JWT

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ STEP 1: Load cart from backend
  useEffect(() => {
    axios.get(`${API_URL}/${USER_ID}`)
      .then(res => setCart(res.data))
      .catch(err => console.error(err));
  }, []);

  // ✅ ADD TO CART (Optimistic)
  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(p => p.productId === item.id);
      if (exists) {
        return prev.map(p =>
          p.productId === item.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [
        ...prev,
        {
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          unit: item.unit,
          image: item.image
        }
      ];
    });

    axios.post(`${API_URL}/${USER_ID}`, {
      productId: item.id,
      name: item.name,
      price: item.price,
      unit: item.unit,
      image: item.image
    });
  };

  // ✅ INCREASE
  const increaseQty = (cartItemId, qty) => {
    setCart(prev =>
      prev.map(item =>
        item.id === cartItemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

    axios.put(`${API_URL}/${cartItemId}?qty=${qty + 1}`);
  };

  // ✅ DECREASE
  const decreaseQty = (cartItemId, qty) => {
    if (qty <= 1) return removeFromCart(cartItemId);

    setCart(prev =>
      prev.map(item =>
        item.id === cartItemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

    axios.put(`${API_URL}/${cartItemId}?qty=${qty - 1}`);
  };

  // ✅ REMOVE
  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    axios.delete(`${API_URL}/${cartItemId}`);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQty, decreaseQty, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
