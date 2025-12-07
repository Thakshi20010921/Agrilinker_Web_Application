import React from "react";
import { Routes, Route } from "react-router-dom";

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

import "./styles/App.css";

// ✅ Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Cart Context
import { CartProvider } from "./context/CartContext";

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
      </Routes>

      <Footer />
    </CartProvider>
  );
}

export default App;
