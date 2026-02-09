import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  // ✅ Build a stable userId from whatever your backend returns
  // (works even if your user object is {email: "..."} )
const USER_ID = user?.id || user?.userId || user?.email || localStorage.getItem("email") || null;


  // ✅ load cart from backend
  const loadCart = async () => {
    if (!USER_ID) {
      setCart([]); // not logged in
      return;
    }
    try {
      const res = await api.get(`/cart/${USER_ID}`);

      // normalize cart item id (handles id/_id/cartItemId)
      const data = Array.isArray(res.data) ? res.data : [];
      const normalized = data.map((x) => ({
        ...x,
        cartItemId: x.cartItemId || x.id || x._id,
      }));

      setCart(normalized);
    } catch (err) {
      console.error("Load cart error:", err);
    }
  };

  // ✅ reload cart when user changes (login/logout)
  useEffect(() => {
    loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER_ID]);

  // ✅ add to cart
  const addToCart = async (item) => {
    if (!USER_ID) return;

    const itemId = item.id || item._id;

    const payload = {
      productId: itemId,
      name: item.name,
      price: item.price,
      unit: item.unit || "unit",
      image:
        item.imageUrl ||
        (item.product_image ? `http://localhost:8081${item.product_image}` : "/images/placeholder.png"),
      quantity: 1,
    };

    try {
      await api.post(`/cart/${USER_ID}`, payload);
      await loadCart();
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  // ✅ increase
  const increaseQty = async (cartItemId) => {
    if (!cartItemId) return;

    try {
      await api.put(`/cart/${cartItemId}?qty=1`);
      await loadCart();
    } catch (err) {
      console.error("Update quantity error:", err);
    }
  };

  // ✅ decrease
  const decreaseQty = async (cartItemId) => {
    if (!cartItemId) return;

    try {
      await api.put(`/cart/${cartItemId}?qty=-1`);
      await loadCart();
    } catch (err) {
      console.error("Update quantity error:", err);
    }
  };

  // ✅ remove one item
  const removeFromCart = async (cartItemId) => {
    if (!cartItemId) return;

    try {
      await api.delete(`/cart/${cartItemId}`);
      await loadCart();
    } catch (err) {
      console.error("Remove from cart error:", err);
    }
  };

  // ✅ clear cart locally (used after checkout)
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQty, decreaseQty, removeFromCart, clearCart, loadCart }}>
      {children}
    </CartContext.Provider>
  );
};
