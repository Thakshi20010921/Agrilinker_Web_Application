import React from "react";

function Step1Form({ productData, setProductData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  return (
    <div>
      <h3>Step 1: Basic Info</h3>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={productData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={productData.category}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={productData.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={productData.location}
        onChange={handleChange}
      />
    </div>
  );
}

export default Step1Form;
