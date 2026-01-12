import React, { useState, useEffect } from "react";
import axios from "axios";

const FarmerDashboard = () => {
  const [products, setProducts] = useState([]);
  const farmerId = localStorage.getItem("email"); // or use stored farmerId

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/api/products/farmer/${farmerId}`
        );
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [farmerId]);

  return (
    <div>
      <h2>Total Products: {products.length}</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.quantity} {p.unit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FarmerDashboard;
