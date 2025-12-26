import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import Benefits from "./components/Benefits";
import Footer from "./components/Footer";
import Marketplace from "./components/Marketplace";

// Fertilizer Pages
import FertilizerList from "./components/Fertilizers/FertilizerList";
import AddFertilizer from "./components/Fertilizers/AddFertilizer";
import UpdateFertilizer from "./components/Fertilizers/UpdateFertilizer";

// Auth Pages (YOUR PART)
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./styles/App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartProvider } from "./context/CartContext";

function App() {
  const location = useLocation();

  // Hide Header & Footer on auth pages
  const hideLayout =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <CartProvider>
      <ToastContainer position="top-right" autoClose={3000} />

      {!hideLayout && <Header />}

      <Routes>
        {/* Auth / Welcome */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Home */}
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

        {/* Marketplace */}
        <Route path="/marketplace" element={<Marketplace />} />

        {/* Fertilizers */}
        <Route path="/fertilizers" element={<FertilizerList />} />
        <Route path="/fertilizers/add" element={<AddFertilizer />} />
        <Route path="/fertilizers/update/:id" element={<UpdateFertilizer />} />
      </Routes>

      {!hideLayout && <Footer />}
    </CartProvider>
  );
}

export default App;
