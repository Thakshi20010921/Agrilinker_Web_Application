import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-200 via-white to-green-300 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/csa-produce-distribution.jpg"
          alt=""
          className="w-full h-full object-cover opacity-20 blur-sm"
        />
      </div>
      <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between px-8 py-16 lg:py-24 max-w-7xl mx-auto">
        <div className="lg:w-1/2 flex flex-col items-start mb-10 lg:mb-0">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-green-900 mb-6 leading-tight drop-shadow">
            Connect Farmers & Buyers Directly
          </h2>
          <p className="text-lg text-green-800 mb-8 max-w-xl">
            AgriLinker bridges the gap between farmers and buyers, enabling
            direct trade of fresh agricultural products. No middlemen, better
            prices, fresher produce.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/marketplace"
              className="bg-gradient-to-r from-green-600 to-green-400 text-white font-bold px-6 py-3 rounded-xl shadow-xl hover:scale-105 transition transform"
            >
              Buy Products
            </Link>

            <Link
              /* to="/farmer/dashboard"
              className="bg-white text-green-700 font-bold px-6 py-3 rounded-xl shadow-xl border-2 border-green-400 hover:bg-green-50 hover:border-green-600 transition"*/
              to="/login"
              className="bg-white text-green-700 font-bold px-6 py-3 rounded-xl shadow-xl border-2 border-green-400 hover:bg-green-50 hover:border-green-600 transition"
            >
              Sell Products
            </Link>
          </div>
        </div>
        <img
          className="lg:w-1/2 w-full mb-8 lg:mb-0 rounded-3xl shadow-2xl object-cover h-72 lg:h-96 border-4 border-white"
          src="/csa-produce-distribution.jpg"
          alt="Market"
        />
      </div>
    </section>
  );
}

export default HeroSection;
