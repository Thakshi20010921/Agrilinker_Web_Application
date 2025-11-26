import React from "react";
import { Link } from "react-router-dom"; // Import Link

function Header() {
  return (
    <header className="bg-gradient-to-r from-green-800 via-green-700 to-green-600 shadow-md flex items-center justify-between px-8 py-6">
      <div className="flex items-center space-x-3">
        <span className="rounded-full bg-white p-2 shadow-md">
          <span className="text-green-700 text-2xl font-extrabold">A</span>
        </span>
        <Link to="/" className="text-white text-3xl font-extrabold tracking-wide drop-shadow-lg">
          AgriLinker
        </Link>
      </div>
      <nav className="flex space-x-8">
        <Link
          to="/"
          className="text-white text-lg font-semibold px-3 py-2 rounded hover:bg-green-900 hover:text-green-300 transition duration-150"
        >
          Home
        </Link>
        <Link 
          to="/marketplace"
          className="text-white text-lg font-semibold px-3 py-2 rounded hover:bg-green-900 hover:text-green-300 transition duration-150"
        >
          Marketplace
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        <span className="text-3xl text-white hover:text-green-300 hover:scale-110 transition cursor-pointer">🛒</span>
        <span className="text-3xl text-white hover:text-green-300 hover:scale-110 transition cursor-pointer">👤</span>
      </div>
    </header>
  );
}

export default Header;