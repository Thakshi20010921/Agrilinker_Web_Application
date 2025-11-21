import React from "react";

function Footer() {
  return (
    <footer className="bg-green-900 text-white py-8 flex flex-col items-center">
      <p className="mb-4 text-center text-lg font-medium max-w-xl">
        Join thousands of farmers and buyers already using AgriLinker for direct agricultural trade.
      </p>
      <button className="bg-white text-green-900 px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-100 transition">
        Explore Marketplace
      </button>
    </footer>
  );
}

export default Footer;
