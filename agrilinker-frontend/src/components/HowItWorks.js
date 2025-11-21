import React from "react";
import "../styles/HowItWorks.css";

function HowItWorks() {
  return (
    <section className="how-it-works">
      <h3>How It Works</h3>
      <div className="how-container">
        <div className="step-list">
          <h4>For Farmers</h4>
          <ol>
            <li>Register as a farmer on AgriLinker</li>
            <li>List your products with images and details</li>
            <li>Receive orders from buyers directly</li>
            <li>Fulfill orders and get paid</li>
          </ol>
        </div>
        <div className="step-list">
          <h4>For Buyers</h4>
          <ol>
            <li>Browse fresh products from local farmers</li>
            <li>Add products to cart and place order</li>
            <li>Make secure payment</li>
            <li>Receive fresh products at your doorstep</li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
