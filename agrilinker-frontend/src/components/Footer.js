import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 text-white py-10 flex flex-col items-center shadow-inner mt-12">
      <hr className="border-t border-green-700 w-1/2 mb-8 opacity-30" />
      <p className="mb-6 text-center text-xl font-semibold max-w-2xl drop-shadow">
        Join thousands of farmers and buyers already using AgriLinker for direct agricultural trade.
      </p>
      <button className="bg-white text-green-800 px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-green-100 hover:scale-105 transition-all text-lg">
        Explore Marketplace
      </button>
      <div className="mt-8 text-sm text-green-300 opacity-80">
        © {new Date().getFullYear()} AgriLinker. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
