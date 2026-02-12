//import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";

const InquiryModal = ({ product, onClose }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [buyerName, setBuyerName] = useState("");

  // Inside your InquiryModal component
  const buyerEmail = localStorage.getItem("email") || "";
  //const buyerName = localStorage.getItem("name") || "Guest User"; // It will now grab the string correctly

  useEffect(() => {
    const fetchBuyerName = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8081/api/users/by-email",
          {
            params: { email: buyerEmail },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setBuyerName(res.data.fullName); // database name  FIXED HERE
      } catch (err) {
        console.error("Failed to get buyer name:", err);
        setBuyerName("Anonymous");
      }
    };

    if (buyerEmail) fetchBuyerName();
  }, [buyerEmail]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please enter your message");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        itemId: product.id || product._id,
        itemType: "PRODUCT",
        itemName: product.name,
        farmerEmail: product.farmerEmail,
        buyerEmail,
        buyerName,
        buyerMessage: message,
      };
      await axios.post("http://localhost:8081/api/inquiries", payload);
      toast.success("Inquiry sent successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send inquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-emerald-100">
        {/* Header with Emerald/Amber Combo */}
        <div className="bg-emerald-700 p-5 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Send Inquiry</h2>
            <p className="text-emerald-100 text-xs mt-0.5">
              Direct message to the farmer
            </p>
          </div>
          <button
            onClick={onClose}
            className=" hover: text-white w-8 h-8 flex items-center justify-center rounded-full transition-all transform font-bold shadow-md"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {/* Info Card */}
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 mb-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                Product
              </span>
              <span className="font-semibold text-slate-800">
                {product.name}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                Location
              </span>
              <span className="text-slate-700 font-medium">
                {product.location}
              </span>
            </div>

            <div className="pt-2 border-t border-emerald-100 flex justify-between items-center">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                Your Identity
              </span>
              <span className="text-emerald-600 font-medium truncate ml-4 text-sm">
                {buyerEmail}
              </span>
            </div>
            <div className="pt-2 border-t border-emerald-100 flex justify-between items-center">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                Your Name
              </span>
              <span className="text-emerald-600 font-medium truncate ml-4 text-sm">
                {buyerName}
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                Your Message
              </label>
              <textarea
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about quantity, delivery, or pricing..."
                className="w-full border-2 border-slate-100 rounded-xl p-4 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all resize-none text-slate-700"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-bold rounded-xl border-2 border-slate-100 text-slate-500 hover:bg-slate-50 hover:border-slate-200 transition-colors order-2 sm:order-1"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2.5 text-sm font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 disabled:bg-slate-300 disabled:scale-100 shadow-lg shadow-emerald-200 transition-all order-1 sm:order-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Sending...
                  </span>
                ) : (
                  "Send Inquiry"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
