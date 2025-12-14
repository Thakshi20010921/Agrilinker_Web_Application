import React from "react";
import { Routes, Route } from "react-router-dom";

// Common Layout
import Header from "./components/Header";
import Footer from "./components/Footer";

// Home Sections
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import Benefits from "./components/Benefits";
import Marketplace from "./components/Marketplace";

// Fertilizer Pages
import FertilizerList from "./components/Fertilizers/FertilizerList";
import AddFertilizer from "./components/Fertilizers/AddFertilizer";
import UpdateFertilizer from "./components/Fertilizers/UpdateFertilizer";

// Auth Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Styles & Utilities
import "./styles/App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* ---------- AUTH PAGES (NO HEADER / FOOTER) ---------- */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ---------- MAIN APPLICATION PAGES ---------- */}
        <Route
          path="/home"
          element={
            <>
              <Header />
              <HeroSection />
              <HowItWorks />
              <Benefits />
              <Footer />
            </>
          }
        />

        <Route
          path="/marketplace"
          element={
            <>
              <Header />
              <Marketplace />
              <Footer />
            </>
          }
        />

        <Route
          path="/fertilizers"
          element={
            <>
              <Header />
              <FertilizerList />
              <Footer />
            </>
          }
        />

        <Route
          path="/fertilizers/add"
          element={
            <>
              <Header />
              <AddFertilizer />
              <Footer />
            </>
          }
        />

        <Route
          path="/fertilizers/update/:id"
          element={
            <>
              <Header />
              <UpdateFertilizer />
              <Footer />
            </>
          }
        />
      </Routes>
    </CartProvider>
  );
}

export default App;
