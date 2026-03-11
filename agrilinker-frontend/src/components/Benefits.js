import React from "react";

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
    <section className="bg-gradient-to-r from-green-50 to-green-100 py-16 px-4">
      <h3 className="text-3xl font-bold text-center text-green-900 mb-12">Why Choose AgriLinker?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border-t-4 border-green-400 hover:border-green-600 hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-6xl mb-6 animate-bounce">{benefit.icon}</div>
            <h4 className="text-xl font-semibold text-green-700 mb-3">{benefit.title}</h4>
            <p className="text-gray-700 text-base">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Benefits;
