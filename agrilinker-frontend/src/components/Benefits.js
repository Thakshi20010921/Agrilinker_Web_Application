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
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {benefits.map((benefit, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition duration-200"
        >
          <div className="text-4xl mb-4">{benefit.icon}</div>
          <h4 className="text-xl font-semibold text-green-700 mb-2">{benefit.title}</h4>
          <p className="text-gray-600 text-sm">{benefit.description}</p>
        </div>
      ))}
    </section>
  );
}

export default Benefits;
