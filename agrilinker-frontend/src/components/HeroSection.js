import React from "react";
import "../styles/HeroSection.css";

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>Connect Farmers & Buyers Directly</h2>
        <p>
          AgriLinker bridges the gap between farmers and buyers, enabling direct trade of fresh agricultural products. No middlemen, better prices, fresher produce.
        </p>
        <div className="hero-buttons">
          <button>Buy Products</button>
          <button className="secondary">Sell Products</button>
        </div>
      </div>
      <img className="hero-image" src="/csa-produce-distribution.jpg" alt="Market" />
    </section>
  );
}

export default HeroSection;
