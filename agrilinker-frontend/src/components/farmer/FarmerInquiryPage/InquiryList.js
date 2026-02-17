import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InquiryItem from "./InquiryItem";
import ReplyModal from "./ReplyModal";

const InquiryList = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to view inquiries.");
        setLoading(false);
        return;
      }

      const res = await axios.get(
        "http://localhost:8081/api/inquiries/farmer",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setInquiries(res.data);
    } catch (err) {
      console.error("Axios Error:", err);
      setError("Unauthorized or failed to load inquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleReplyClick = (inquiry) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedInquiry(null);
  };

  const handleReplySuccess = () => {
    fetchInquiries();
  };

  if (loading)
    return (
      <div className="p-10 text-center font-bold text-emerald-600">
        Loading customer inquiries...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      {/* CENTERED WRAPPER */}
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-emerald-950">
            Customer Inquiries
          </h1>
          <p className="text-emerald-600 mt-2">
            Manage questions and messages from your buyers
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-50 text-center">
            <p className="text-lg font-semibold text-slate-600">
              Total Inquiries
            </p>
            <p className="text-4xl font-black text-emerald-600">
              {inquiries.length}
            </p>
          </div>

          <div className="bg-emerald-600 p-6 rounded-2xl shadow-lg text-white text-center">
            <p className="text-sm font-bold opacity-80">Active Conversations</p>
            <p className="text-3xl font-black">
              {inquiries.filter((i) => i.status === "OPEN").length} Pending
            </p>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* INQUIRY LIST */}
          <div className="flex-1 space-y-6 ">
            {error ? (
              <div className="bg-white p-10 rounded-2xl text-center text-red-500 font-bold">
                {error}
              </div>
            ) : inquiries.length === 0 ? (
              <div className="bg-white p-20 rounded-2xl text-center shadow-md">
                <p className="text-slate-400 text-lg">
                  No inquiries yet from customers.
                </p>
              </div>
            ) : (
              inquiries.map((inq) => (
                <div
                  key={inq.id || inq._id}
                  className="bg-slate-100 rounded-2xl p-4 shadow-md hover:scale-[1.01] transition-transform duration-300"
                >
                  <InquiryItem
                    inquiry={inq}
                    onReplyClick={() => handleReplyClick(inq)}
                  />
                </div>
              ))
            )}

            {/* Reply Modal */}
            {isModalOpen && selectedInquiry && (
              <ReplyModal
                inquiry={selectedInquiry}
                onClose={handleModalClose}
                onSuccess={handleReplySuccess}
              />
            )}
          </div>

          {/* NAVIGATION CARD */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6 border border-emerald-50">
              <h3 className="text-xl font-bold text-emerald-800 text-center">
                Quick Navigation
              </h3>

              <div className="flex flex-col space-y-9 items-center ">
                {[
                  { name: "Dashboard", path: "/farmer/dashboard" },
                  { name: "Add Product", path: "/farmer/add-product2" },
                  { name: "My Orders", path: "/farmer/orders" },
                  { name: "My Products", path: "/farmer/my-products" },
                  { name: "Sales Histoty", path: "/farmer/sales-history" },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className="w-[250px] text-lg h-[100px] bg-[#29ab87] hover:bg-emerald-700 text-white font-semibold py-3 rounded-[50px] transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryList;
