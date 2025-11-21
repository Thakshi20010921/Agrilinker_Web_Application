import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import Benefits from "./components/Benefits";
import Footer from "./components/Footer";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <HowItWorks />
      <Benefits />
      <Footer />
    </div>
  );
}

export default App;
