import React, { useState } from "react";

function InquiryForm({ product }) {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h2>Product Inquiry</h2>

      <label>Product</label>
      <input value={product.productName} disabled />

      <label>Farmer</label>
      <input value={product.farmerName} disabled />

      <label>Location</label>
      <input value={product.location} disabled />

      <label>Your Message</label>
      <textarea placeholder="Type your inquiry..." />

      <button>Send Inquiry</button>
    </div>
  );
}
