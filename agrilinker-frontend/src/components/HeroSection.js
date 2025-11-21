import React from "react";

function HeroSection() {
  return (
    <section className="bg-green-100 flex flex-col-reverse lg:flex-row items-center justify-between px-8 py-16 lg:py-24">
      <div className="lg:w-1/2 flex flex-col items-start mb-10 lg:mb-0">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-green-900 mb-6 leading-tight">
          Connect Farmers & Buyers Directly
        </h2>
        <p className="text-lg text-green-800 mb-8 max-w-xl">
          AgriLinker bridges the gap between farmers and buyers, enabling direct trade of fresh agricultural products. No middlemen, better prices, fresher produce.
        </p>
        <div className="flex space-x-4">
          <button className="bg-green-700 text-white font-bold px-6 py-3 rounded-lg shadow hover:bg-green-800 transition">
            Buy Products
          </button>
          <button className="bg-white text-green-700 font-bold px-6 py-3 rounded-lg shadow border border-green-700 hover:bg-green-50 transition">
            Sell Products
          </button>
        </div>
      </div>
      <img
        className="lg:w-1/2 w-full mb-8 lg:mb-0 rounded-lg shadow-lg object-cover h-72 lg:h-96"
        src="/csa-produce-distribution.jpg"
        alt="Market"
      />
    </section>
  );
}

export default HeroSection;
