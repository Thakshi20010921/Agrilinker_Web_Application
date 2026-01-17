import React from "react";

function Step3Form({ productData, setProductData }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const labelStyle = "block text-lg font-bold text-emerald-900 mb-1.5 ml-1";
  const inputStyle = `
    w-full bg-white/60 backdrop-blur-md border border-emerald-100 
    rounded-2xl px-4 py-3.5 text-emerald-950 placeholder:text-emerald-300
    outline-none transition-all duration-300
    focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10
    shadow-sm
  `;

  // Calculate potential profit for the farmer
  const profit = productData.sellingPrice - productData.purchasePrice;

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Form Header */}
      <div className="mb-10">
        <div className="flex items-center space-x-3 mb-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold">
            3
          </span>
          <h3 className="text-2xl font-extrabold text-emerald-950 tracking-tight">
            Pricing & Availability
          </h3>
        </div>
        <p className="text-emerald-600/80 text-sm ml-11">
          Set your rates and manage your stock levels.
        </p>
      </div>

      <div className="space-y-6">
        {/* Pricing Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Cost Price (Your Cost)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 font-bold">
                $
              </span>
              <input
                type="number"
                name="purchasePrice"
                placeholder="0.00"
                className={`${inputStyle} pl-8`}
                value={productData.purchasePrice}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Selling Price (Buyer Sees)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 font-bold">
                $
              </span>
              <input
                type="number"
                name="sellingPrice"
                placeholder="0.00"
                className={`${inputStyle} pl-8`}
                value={productData.sellingPrice}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Profit Insight Card */}
        {productData.sellingPrice > 0 && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between">
            <span className="text-emerald-800 text-sm font-medium">
              Estimated Profit per Unit:
            </span>
            <span
              className={`font-bold ${profit >= 0 ? "text-emerald-600" : "text-red-500"}`}
            >
              {profit >= 0 ? `+$${profit}` : `-$${Math.abs(profit)}`}
            </span>
          </div>
        )}

        {/* Quantity and Unit Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Total Quantity</label>
            <input
              type="number"
              name="quantity"
              placeholder="e.g. 100"
              className={inputStyle}
              value={productData.quantity}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={labelStyle}>Measurement Unit</label>
            <select
              name="unit"
              className={`${inputStyle} cursor-pointer`}
              value={productData.unit}
              onChange={handleChange}
            >
              <option value="kg">Kilograms (kg)</option>
              <option value="g">Grams (g)</option>
              <option value="L">Liters (L)</option>
              <option value="pcs">Pieces (pcs)</option>
              <option value="bunch">Bunch</option>
            </select>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="pt-4">
          <label className="flex items-center cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                name="availability"
                className="sr-only"
                checked={productData.availability}
                onChange={handleChange}
              />
              <div
                className={`block w-14 h-8 rounded-full transition-colors ${productData.availability ? "bg-emerald-500" : "bg-gray-300"}`}
              ></div>
              <div
                className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${productData.availability ? "translate-x-6" : ""}`}
              ></div>
            </div>
            <div className="ml-4">
              <span className="text-emerald-950 font-bold block">
                Currently Available
              </span>
              <span className="text-emerald-600/70 text-xs">
                If turned off, buyers cannot see this product.
              </span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Step3Form;
