import React, { useState } from "react";

function Step2Form({ productData, setProductData }) {
  const [previews, setPreviews] = useState([]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    setProductData({ ...productData, images: files });

    // Generate quick previews for the farmer to see what they uploaded
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  return (
    <div className="w-full max-w-xl mx-auto border rounded-2xl p-10 bg-[#E6F5EA]">
      {/* Form Header */}
      <div className="mb-10 ">
        <div className="flex items-center space-x-3 mb-2 ">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold">
            2
          </span>
          <h3 className="text-3xl font-extrabold text-emerald-950 tracking-tight">
            Product Images
          </h3>
        </div>
        <p className="text-emerald-600/80 text-base ml-11">
          Upload clear photos of your harvest to attract more buyers.
        </p>
      </div>

      {/* Upload Zone */}
      <div className="relative group">
        <input
          type="file"
          multiple
          onChange={handleUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        <div
          className={`
          border-2 border-dashed border-emerald-200 rounded-3xl p-10
          flex flex-col items-center justify-center transition-all duration-300
          bg-white group-hover:bg-emerald-50 group-hover:border-emerald-400
          ${productData.images.length > 0 ? "border-emerald-500 bg-emerald-50/50" : ""}
        `}
        >
          {/* Icon */}
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 text-emerald-500 group-hover:scale-110 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          <p className="text-emerald-900 font-bold text-lg">
            Click or Drag photos here
          </p>
          <p className="text-emerald-600/60 text-sm mt-1">
            PNG, JPG up to 10MB
          </p>
        </div>
      </div>

      {/* Image Previews Grid */}
      {previews.length > 0 && (
        <div className="mt-8 grid grid-cols-3 gap-4">
          {previews.map((src, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-2xl overflow-hidden border border-emerald-100 shadow-sm"
            >
              <img
                src={src}
                alt="preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1 right-1 bg-emerald-600 text-white rounded-full p-1 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          ))}

          {/* Status Indicator */}
          <div className="col-span-3 mt-2 flex items-center text-emerald-700 text-sm font-medium italic">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></span>
            {productData.images.length} image(s) ready for upload
          </div>
        </div>
      )}
    </div>
  );
}

export default Step2Form;
