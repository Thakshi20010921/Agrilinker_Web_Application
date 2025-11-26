import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import Benefits from "./components/Benefits";
import Footer from "./components/Footer";
import Marketplace from "./components/Marketplace";
import "./styles/App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Home Page */}
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
        {/* Marketplace Page */}
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;