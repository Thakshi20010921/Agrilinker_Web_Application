import React from "react";
import "../styles/Benefits.css";

const benefits = [
  {
    icon: "🔗",
    title: "Direct Connection",
    description: "Connect directly with farmers, eliminating middlemen and ensuring fair prices for everyone."
  },
  {
    icon: "🌿",
    title: "Fresh & Organic",
    description: "Get access to fresh, locally grown produce directly from the source."
  },
  {
    icon: "🛡️",
    title: "Secure & Reliable",
    description: "Safe transactions and quality assurance for every order placed on our platform."
  },
  {
    icon: "💸",
    title: "Better Prices",
    description: "Farmers earn more, buyers pay less by cutting out intermediaries."
  },
  {
    icon: "⏱️",
    title: "Quick Delivery",
    description: "Fast and efficient delivery system ensuring products reach you fresh."
  },
  {
    icon: "🛒",
    title: "Easy Ordering",
    description: "Simple and intuitive platform for browsing, ordering, and tracking products."
  }
];

function Benefits() {
  return (
    <section className="benefits">
      {benefits.map((benefit, i) => (
        <div className="benefit-card" key={i}>
          <div className="benefit-icon">{benefit.icon}</div>
          <h4>{benefit.title}</h4>
          <p>{benefit.description}</p>
        </div>
      ))}
    </section>
  );
}

export default Benefits;
