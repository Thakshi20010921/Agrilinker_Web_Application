import React from "react";

function HowItWorks() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <h3 className="text-3xl font-bold text-green-800 text-center mb-10">
        How It Works
      </h3>
      <div className="flex flex-col md:flex-row gap-8 md:justify-center max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8 flex-1">
          <h4 className="text-xl font-semibold text-green-700 mb-4 text-center">
            For Farmers
          </h4>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Register as a farmer on AgriLinker</li>
            <li>List your products with images and details</li>
            <li>Receive orders from buyers directly</li>
            <li>Fulfill orders and get paid</li>
          </ol>
        </div>
        <div className="bg-white rounded-xl shadow-md p-8 flex-1">
          <h4 className="text-xl font-semibold text-green-700 mb-4 text-center">
            For Buyers
          </h4>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
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
