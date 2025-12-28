import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import Benefits from "./components/Benefits";
import Footer from "./components/Footer";
import Marketplace from "./components/Marketplace";
import OrderConfirmation from "./components/OrderConfirmation";

// Fertilizer Pages
import FertilizerList from "./components/Fertilizers/FertilizerList";
import AddFertilizer from "./components/Fertilizers/AddFertilizer";
import UpdateFertilizer from "./components/Fertilizers/UpdateFertilizer";

import "./styles/App.css";

// ✅ Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Cart Context
import { CartProvider } from "./context/CartContext";
import CartPage from "./components/CartPage";

import CheckoutPage from "./components/CheckoutPage";

//  Farmer Pages
import FarmerDashboard from "./components/farmer/FarmerDashboard";
import AddProduct from "./components/farmer/AddProduct";
import MyProducts from "./components/farmer/MyProducts";

function App() {
  return (
    <CartProvider>
      {/* Toast popup container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Header />

      <Routes>
        {/* ------------ HOME PAGE ------------ */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <HowItWorks />
              <Benefits />
            </>
          }
        />

        {/* ------------ MARKETPLACE ------------ */}
        <Route path="/marketplace" element={<Marketplace />} />

        {/* ------------ FERTILIZER PAGES ------------ */}
        <Route path="/fertilizers" element={<FertilizerList />} />
        <Route path="/fertilizers/add" element={<AddFertilizer />} />
        <Route path="/fertilizers/update/:id" element={<UpdateFertilizer />} />

        {/* ------------ FARMER PAGES ------------ */}
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        <Route path="/farmer/add-product" element={<AddProduct />} />
        <Route path="/farmer/my-products" element={<MyProducts />} />

        {/* ------------ CART & CHECKOUT ------------ */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />

      </Routes>

      <Footer />
    </CartProvider>
  );
}

export default App;