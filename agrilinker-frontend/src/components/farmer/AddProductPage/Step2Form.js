import React from "react";

function Step2Form({ productData, setProductData }) {
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    setProductData({ ...productData, images: files });
  };

  return (
    <div>
      <h3>Step 2: Upload Images</h3>
      <input type="file" multiple onChange={handleUpload} />
      <p>{productData.images.length} image(s) selected</p>
    </div>
  );
}

export default Step2Form;
