import React from "react";
import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">AgriLinker</div>
      <nav>
        <a href="#home">Home</a>
        <a href="#marketplace">Marketplace</a>
      </nav>
      <div className="actions">
        <span className="icon">🛒</span>
        <span className="icon">👤</span>
      </div>
    </header>
  );
}

export default Header;
