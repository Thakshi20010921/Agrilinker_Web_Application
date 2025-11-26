import React from "react";

function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-50 via-white to-green-100">
      <h3 className="text-4xl font-extrabold text-green-900 text-center mb-14 drop-shadow">
        How It Works
      </h3>
      <div className="flex flex-col md:flex-row gap-10 md:justify-center max-w-5xl mx-auto">
        {/* Farmers Card */}
        <div className="bg-white rounded-3xl shadow-xl p-10 flex-1 hover:shadow-2xl transition-all duration-200 border-t-4 border-green-400">
          <div className="flex justify-center items-center mb-5">
            <span className="text-4xl bg-green-100 rounded-full p-4">
              🌾
            </span>
          </div>
          <h4 className="text-2xl font-bold text-green-700 mb-6 text-center">
            For Farmers
          </h4>
          <ol className="list-decimal list-inside space-y-4 text-green-800 text-lg">
            <li>Register as a farmer on AgriLinker</li>
            <li>List your products with images and details</li>
            <li>Receive orders from buyers directly</li>
            <li>Fulfill orders and get paid</li>
          </ol>
        </div>
        {/* Buyers Card */}
        <div className="bg-white rounded-3xl shadow-xl p-10 flex-1 hover:shadow-2xl transition-all duration-200 border-t-4 border-green-400">
          <div className="flex justify-center items-center mb-5">
            <span className="text-4xl bg-green-100 rounded-full p-4">
              🛒
            </span>
          </div>
          <h4 className="text-2xl font-bold text-green-700 mb-6 text-center">
            For Buyers
          </h4>
          <ol className="list-decimal list-inside space-y-4 text-green-800 text-lg">
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
