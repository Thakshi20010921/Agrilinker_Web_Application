import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

const API_URL = "http://localhost:8081/cart";
const USER_ID = "USER123"; // later from JWT

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Load cart from backend first, then fallback to localStorage
  useEffect(() => {
    axios
      .get(`${API_URL}/${USER_ID}`)
      .then((res) => {
        setCart(res.data);
        localStorage.setItem("cart", JSON.stringify(res.data)); // save to localStorage
      })
      .catch((err) => {
        console.error(err);
        // fallback: load from localStorage
        const savedCart = localStorage.getItem("cart");
        if (savedCart) setCart(JSON.parse(savedCart));
      });
  }, []);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.productId === item._id);
      if (exists) {
        const updated = prev.map((p) =>
          p.productId === item._id
            ? { ...p, quantity: (p.quantity || 1) + 1 }
            : p
        );

        // update backend
        axios.put(`${API_URL}/${USER_ID}/${item._id}`, {
          quantity: exists.quantity + 1,
        }).catch(console.error);

        return updated;
      }

      const newItem = {
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: 1,
        unit: item.unit,
        image: item.image,
      };

      // add to backend
      axios.post(`${API_URL}/${USER_ID}`, newItem).catch(console.error);

      return [...prev, newItem];
    });
  };

  const increaseQty = (productId) => {
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );

      const item = prev.find((i) => i.productId === productId);
      if (item) {
        axios.put(`${API_URL}/${USER_ID}/${productId}`, {
          quantity: item.quantity + 1,
        }).catch(console.error);
      }

      return updated;
    });
  };

  const decreaseQty = (productId) => {
    setCart((prev) => {
      const updated = prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: (item.quantity || 1) - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      const item = prev.find((i) => i.productId === productId);
      if (item) {
        if (item.quantity - 1 > 0) {
          axios.put(`${API_URL}/${USER_ID}/${productId}`, {
            quantity: item.quantity - 1,
          }).catch(console.error);
        } else {
          axios.delete(`${API_URL}/${USER_ID}/${productId}`).catch(console.error);
        }
      }

      return updated;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
    axios.delete(`${API_URL}/${USER_ID}/${productId}`).catch(console.error);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    axios.delete(`${API_URL}/${USER_ID}/all`).catch(console.error); // delete all from backend
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
