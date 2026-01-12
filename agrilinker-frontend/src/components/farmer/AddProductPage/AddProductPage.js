import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";
import Step3Form from "./Step3Form";
import ProgressBar from "./ProgressBar";
import "./AddProductPage.css";

function AddProductPage() {
  const [step, setStep] = useState(1);
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    description: "",
    location: "",
    images: [],
    purchasePrice: "",
    quantity: "",
    unit: "",
    availability: false,
  });

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handlePrevious = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleSubmit = () => {
    console.log("Final Product Data:", productData);
  };

  return (
    <div className="add-product-container">
      <Sidebar /> {/* This will be fixed on the left */}
      <main className="main-content">
        <Header /> {/* Header at the top of the scrollable area */}
        <div className="scrollable-form-container">
          <div className="form-card">
            <ProgressBar step={step} />

            <div className="step-content">
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

            <div className="form-footer">
              {step > 1 && (
                <button className="btn-prev" onClick={handlePrevious}>
                  Back
                </button>
              )}
              <button
                className="btn-next"
                onClick={step === 3 ? handleSubmit : handleNext}
              >
                {step === 3 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddProductPage;
