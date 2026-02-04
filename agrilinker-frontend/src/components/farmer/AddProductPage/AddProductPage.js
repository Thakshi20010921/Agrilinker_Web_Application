import React, { useState } from "react";
//import Sidebar from "../Sidebar";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";
import Step3Form from "./Step3Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddProductPage() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    description: "",
    location: "",
    images: [],
    purchasePrice: "",
    sellingPrice: "", // Added to match previous step
    quantity: "",
    unit: "kg",
    availability: true,
  });

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handlePrevious = () => setStep((prev) => Math.max(prev - 1, 1));

  //handel submit
  const handleSubmit = async () => {
    // 1. Create a FormData object
    const formData = new FormData();

    // 2. Prepare the product JSON (matching your Spring Boot Model)
    const productBlob = new Blob(
      [
        JSON.stringify({
          name: productData.name,
          category: productData.category,
          description: productData.description,
          location: productData.location,
          purchasePrice: productData.purchasePrice,
          sellingPrice: productData.sellingPrice,
          quantity: productData.quantity,
          unit: productData.unit,
          //availability: productData.availability,
          status: productData.availability ? "IN_STOCK" : "OUT_OF_STOCK",
          farmerEmail: localStorage.getItem("email"), // Link it to the logged-in farmer
        }),
      ],
      { type: "application/json" },
    );

    // 3. Append the parts (names must match @RequestPart in your Java Controller)
    formData.append("product", productBlob);

    // Append the first image from the array
    if (productData.images && productData.images.length > 0) {
      formData.append("image", productData.images[0]);
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/api/products/with-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        alert("Success! Your harvest is now listed.");
        navigate("/farmer-dashboard"); // Redirect back to dashboard
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alert("Oops! Something went wrong while saving.");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 1. SIDEBAR */}
      {/* <Sidebar />*/}

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header / Progress Bar */}
        <header className="bg-white border-b border-emerald-100 px-8 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h2 className="text-xl font-bold text-emerald-950">
              Add New Product
            </h2>

            {/* Visual Stepper */}
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      step >= num
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-100 text-emerald-400"
                    }`}
                  >
                    {num}
                  </div>
                  {num < 3 && (
                    <div
                      className={`w-8 h-1 mx-2 rounded ${step > num ? "bg-emerald-600" : "bg-emerald-100"}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* 3. SCROLLABLE FORM CONTAINER */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-3xl mx-auto">
            {/* Form Card */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-emerald-900/5 border border-emerald-50 overflow-hidden">
              <div className="p-8 md:p-12">
                {/* Step Content */}
                <div className="min-h-[400px] transition-all duration-500 ease-in-out">
                  {step === 1 && (
                    <Step1Form
                      productData={productData}
                      setProductData={setProductData}
                    />
                  )}
                  {step === 2 && (
                    <Step2Form
                      productData={productData}
                      setProductData={setProductData}
                    />
                  )}
                  {step === 3 && (
                    <Step3Form
                      productData={productData}
                      setProductData={setProductData}
                    />
                  )}
                </div>

                {/* Form Footer / Navigation */}
                <div className="mt-12 pt-8 border-t border-emerald-50 flex items-center justify-between">
                  <div>
                    {step > 1 && (
                      <button
                        className="px-8 py-3.5 rounded-xl font-bold text-emerald-700 hover:bg-emerald-50 transition-colors"
                        onClick={handlePrevious}
                      >
                        Back
                      </button>
                    )}
                  </div>

                  <button
                    className={`px-10 py-3.5 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95 ${
                      step === 3
                        ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200"
                        : "bg-emerald-900 hover:bg-black shadow-slate-200"
                    }`}
                    onClick={step === 3 ? handleSubmit : handleNext}
                  >
                    {step === 3 ? "List Product" : "Continue"}
                  </button>
                </div>
              </div>
            </div>

            <p className="text-center mt-8 text-slate-400 text-sm">
              Need help? Contact{" "}
              <span className="text-emerald-600 font-medium">
                Farmer Support
              </span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddProductPage;
