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
    <div className=" min-h-screen bg-white">
      {" "}
      {/*flex*/}
      {/* 1. SIDEBAR  bg-slate-50*/}
      {/* <Sidebar />*/}
      {/* 2. MAIN CONTENT AREA */}
      <main className=" flex flex-col min-w-0 overflow-hidden">
        {/* Top Header / Progress Bar */}
        <header className="bg-white border-none border-emerald-100 px-8 py-8">
          <div className=" flex items-center justify-between">
            <h2 className="text-5xl font-extrabold text-emerald-950">
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
          <h6 className="text-emerald-600 font-medium pt-3 text-lg">
            Fill the details to put your products on market
          </h6>
        </header>

        {/* 3. SCROLLABLE FORM CONTAINER */}
        <div className="flex-1 overflow-y-auto p-8 md:pt-0 custom-scrollbar">
          {/*<div className="max-w-3xl mx-auto">*/}
          <div className="max-w-full ml-0 flex flex-col lg:flex-row gap-12">
            {/* --- NEW LEFT INFO CARD --- */}
            <div className="lg:w-1/3 h-fit   bg-emerald-900 text-white rounded-[0.5rem] text-justify p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">
                Listing Tips with 3 steps
              </h3>
              <ul className="space-y-6">
                {/* Step 01 */}
                <li className="pb-6 border-b border-emerald-800/50 last:border-0 last:pb-0">
                  <div className="flex gap-4">
                    <span className="text-3xl font-bold text-white leading-none">
                      01
                    </span>
                    <div>
                      <h4 className="text-xl font-bold mb-2">
                        Product Details
                      </h4>
                      <p className="text-emerald-100/80 text-[15px] leading-relaxed">
                        Use a clear, specific name and select the right category
                        for your harvest.
                      </p>
                    </div>
                  </div>
                </li>

                {/* Step 02 */}
                <li className="pb-6 border-b border-emerald-800/50 last:border-0 last:pb-0">
                  <div className="flex gap-4">
                    <span className="text-3xl font-bold text-white leading-none">
                      02
                    </span>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Upload Images</h4>
                      <p className="text-emerald-100/80 text-[15px] leading-relaxed">
                        Take natural, well-lit photos to showcase your produce
                        accurately.
                      </p>
                    </div>
                  </div>
                </li>

                {/* Step 03 */}
                <li className="pb-6 border-b border-emerald-800/50 last:border-0 last:pb-0">
                  <div className="flex gap-4">
                    <span className="text-3xl font-bold text-white leading-none">
                      03
                    </span>
                    <div>
                      <h4 className="text-xl font-bold mb-2">
                        Pricing & Stock
                      </h4>
                      <p className="text-emerald-100/80 text-[15px] leading-relaxed">
                        Set competitive prices and update your stock levels
                        regularly.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="mt-8 pt-8 border-t border-emerald-800">
                <p className="text-s text-emerald-600 uppercase tracking-widest font-bold">
                  Current Progress
                </p>
                <p className="text-lg">Step {step} of 3</p>
              </div>
            </div>{" "}
            {/* Form Card */}
            <div className="w-full bg-white  rounded-[2rem]   overflow-hidden">
              <div className="p-0 w-full md:p-0">
                {/* Step Content */}
                <div className="min-h-[400px] w-full transition-all duration-500 ease-in-out  ">
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
                <div className="mt-12 pt-0 border-t border-emerald-50 flex items-center gap-x-6">
                  <div>
                    {step > 1 && (
                      <button
                        className="  justify-center w-[200px] h-[54px] rounded-xl font-bold bg-emerald-100 text-emerald-600 hover:bg-emerald-50 transition-colors"
                        onClick={handlePrevious}
                      >
                        Back
                      </button>
                    )}
                  </div>

                  <button
                    className={`px-10 py-3.5  w-[200px] rounded-0 font-bold text-white transition-all shadow-lg active:scale-95 ${
                      step === 3
                        ? "bg-emerald-900 hover:bg-emerald-900 shadow-emerald-200"
                        : "bg-emerald-900 hover:bg-emerald-500 shadow-slate-200"
                    }`}
                    onClick={step === 3 ? handleSubmit : handleNext}
                  >
                    {step === 3 ? "List Product" : "Continue"}
                  </button>
                </div>
                <p className="text-center mt-8 text-slate-400 text-sm">
                  Need help? Contact{" "}
                  <span className="text-emerald-600 font-medium">
                    Farmer Support
                  </span>
                </p>
              </div>
            </div>
            {/* --- NEW RIGHT NAVIGATION CARD --- */}
            <div className="lg:w-1/4 h-fit space-y-4">
              <div className="bg-white rounded-[0.5rem] pb-6 pt-0 ">
                <div className="flex flex-col space-y-[50px]">
                  {[
                    {
                      name: "Dashboard",
                      icon: "",
                      path: "/farmer-dashboard",
                    },
                    { name: "Analytics", icon: "", path: "/analytics" },
                    { name: "My Orders", icon: "", path: "/orders" },
                    { name: "My Products", icon: "", path: "/products" },
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.path)}
                      className="flex bg-[#DAEDE6] items-center h-[100px] space-x-4 s p-4 w-full rounded-2xl hover:bg-emerald-50 text-emerald-900 font-semibold transition-all duration-300 group active:scale-95 shadow-xl shadow-emerald-900/5 border border-transparent hover:border-emerald-100"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddProductPage;
