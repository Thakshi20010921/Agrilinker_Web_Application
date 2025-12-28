import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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

// Farmer Pages (Fixes: FarmerDashboard, AddProduct, MyProducts errors)
import FarmerDashboard from "./components/Farmer/FarmerDashboard"; 
import AddProduct from "./components/Farmer/AddProduct";
import MyProducts from "./components/Farmer/MyProducts";

// Cart & Checkout Pages (Fixes: CartPage, CheckoutPage errors)
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";

// NEW: Order History & Success Pages
import OrderHistory from "./components/OrderHistory";
import OrderSuccess from "./components/OrderSuccess";

// Auth Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartProvider } from "./context/CartContext";

function App() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <CartProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />

      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <>
              <HeroSection />
              <HowItWorks />
              <Benefits />
            </>
          }
        />

        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/fertilizers" element={<FertilizerList />} />
        <Route path="/fertilizers/add" element={<AddFertilizer />} />
        <Route path="/fertilizers/update/:id" element={<UpdateFertilizer />} />

        {/* Farmer Routes */}
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        <Route path="/farmer/add-product" element={<AddProduct />} />
        <Route path="/farmer/my-products" element={<MyProducts />} />

        {/* Cart & Checkout Routes */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>

      {!hideLayout && <Footer />}
    </CartProvider>
  );
}

export default App;