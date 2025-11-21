import React from "react";

function Header() {
  return (
    <header className="bg-green-800 flex items-center justify-between px-8 py-4">
      <div className="text-white text-2xl font-bold tracking-wide">AgriLinker</div>
      <nav className="flex space-x-8">
        <a
          href="#home"
          className="text-white text-lg font-medium hover:text-green-300 transition"
        >
          Home
        </a>
        <a
          href="#marketplace"
          className="text-white text-lg font-medium hover:text-green-300 transition"
        >
          Marketplace
        </a>
      </nav>
      <div className="flex items-center space-x-4">
        <span className="text-2xl text-white hover:text-green-300 transition cursor-pointer">🛒</span>
        <span className="text-2xl text-white hover:text-green-300 transition cursor-pointer">👤</span>
      </div>
    </header>
  );
}

export default Header;
