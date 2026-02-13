import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import Benefits from "./components/Benefits";

import FertilizerList from "./components/Fertilizers/FertilizerList";
import AddFertilizer from "./components/Fertilizers/AddFertilizer";
import UpdateFertilizer from "./components/Fertilizers/UpdateFertilizer";
import FertilizerSupplierDashboard from "./pages/fertilizers/FertilizerSupplierDashboard";
import FertilizerRecommendation from "./components/Fertilizers/FertilizerRecommendation";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Loginfertilizer from "./pages/Loginfertilizer";
import Profile from "./components/Profile";
import Marketplace from "./components/Marketplace";

import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";
import { AuthProvider } from "./context/AuthContext";

import FarmerDashboard from "./components/farmer/FarmerDashboard";
import AddProduct from "./components/farmer/AddProduct";
import MyProducts from "./components/farmer/MyProducts";
import EditProductPage from "./components/farmer/EditProductPage";

function App() {
  const location = useLocation();

  // Header සහ Footer හංගන්න ඕන පේජ් ටික
  const hideLayout =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/loginfertilizer";

  return (
    <AuthProvider>
      <NotificationProvider>
      <CartProvider>
        {/* ✅ Toast system (GLOBAL) */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
        
        


        {!hideLayout && <Header />}

        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginfertilizer" element={<Loginfertilizer />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />

          {/* Home Route */}
          <Route path="/home" element={<><HeroSection /><HowItWorks /><Benefits /></>} />

          {/* Marketplace */}
          <Route path="/marketplace" element={<Marketplace />} />

          {/* 🌿 FERTILIZER ROUTES */}
          <Route path="/fertilizer-dashboard" element={<FertilizerSupplierDashboard />} />
          <Route path="/fertilizers" element={<FertilizerList />} />
          <Route path="/fertilizers/add" element={<AddFertilizer />} />
          <Route path="/fertilizers/edit/:id" element={<UpdateFertilizer />} />
          <Route path="/fertilizers/recommend" element={<FertilizerRecommendation />} />

          {/* Farmer Routes */}
          <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
          <Route path="/farmer/add-product" element={<AddProduct />} />
          <Route path="/farmer/my-products" element={<MyProducts />} />
          <Route path="/edit-product/:id" element={<EditProductPage />} />
        </Routes>

        {!hideLayout && <Footer />}
      </CartProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;