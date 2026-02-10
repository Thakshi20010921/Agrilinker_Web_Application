import React from "react";

function Step1Form({ productData, setProductData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Reusable Tailwind classes for consistent styling
  const labelStyle = "block text-xl font-semibold text-emerald-600 mb-1.5 ml-1";
  const inputStyle = `
    w-full bg-white backdrop-blur-md border border-emerald-100 
    rounded-2xl px-4 py-3.5 text-emerald-950 text-lg placeholder:text-slate-400
    outline-none transition-all duration-300
    focus:bg-white focus:border-emerald-50 focus:ring-4 focus:ring-emerald-500/10
    shadow-sm hover:border-emerald-200
  `;

  return (
    <div className="w-full p-10 mx-auto border rounded-2xl bg-[#E6F5EA]">
      {/* Form Header */}
      <div className="mb-10">
        <div className="flex items-center space-x-3 mb-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold">
            1
          </span>
          <h3 className="text-3xl font-extrabold text-emerald-900 tracking-tight">
            Basic Information
          </h3>
        </div>
        <p className="text-emerald-1000 text-sm ml-11">
          Tell us what you're harvesting today.
        </p>
      </div>
      {/* Form Fields */}
      <form>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="group">
              <label className={labelStyle}>Product Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Organic Cavendish Bananas"
                className={inputStyle}
                value={productData.name}
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div className="group">
              <label className={labelStyle}>Category</label>
              <div className="relative">
                <select
                  name="category"
                  className={`${inputStyle} appearance-none cursor-pointer`}
                  value={productData.category}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Grains">Grains</option>
                  <option value="Dairy">Dairy</option>
                </select>
                {/* Custom Arrow for Select */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Description */}
            <div className="group">
              <label className={labelStyle}>Description</label>
              <textarea
                name="description"
                rows="4"
                required
                placeholder="How was it grown? Is it organic? Describe the quality..."
                className={`${inputStyle} resize-none`}
                value={productData.description}
                onChange={handleChange}
              />
            </div>

            {/* Location */}
            <div className="group">
              <label className={labelStyle}>Farm Location</label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="e.g. Colombo, Western Province"
                  className={`${inputStyle} pl-11`}
                  value={productData.location}
                  onChange={handleChange}
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Step1Form;
