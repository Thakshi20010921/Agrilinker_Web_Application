import React from "react";

function Step3Form({ productData, setProductData }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div>
      <h3>Step 3: Pricing & Availability</h3>
      <input
        type="number"
        name="purchasePrice"
        placeholder="Purchase Price"
        value={productData.purchasePrice}
        onChange={handleChange}
      />
      <input
        type="number"
        name="sellingPrice"
        placeholder="Selling Price"
        value={productData.sellingPrice}
        onChange={handleChange}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={productData.quantity}
        onChange={handleChange}
      />
      <input
        type="text"
        name="unit"
        placeholder="Unit (kg, L, etc.)"
        value={productData.unit}
        onChange={handleChange}
      />
      <label>
        <input
          type="checkbox"
          name="availability"
          checked={productData.availability}
          onChange={handleChange}
        />
        Available
      </label>
    </div>
  );
}

export default Step3Form;
