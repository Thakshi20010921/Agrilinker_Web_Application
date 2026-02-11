import React from "react";

const InquiryItem = ({ inquiry, onReplyClick }) => {
  const { itemName, buyerName, buyerMessage, farmerReply, status, createdAt } =
    inquiry;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[40px] p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row justify-between gap-6">
      {/* LEFT SECTION */}
      <div className="flex-1 space-y-3">
        {/* Top Row */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-[20px] font-semibold text-emerald-900 bg-emerald-50 px-3 py-1 rounded-md">
            {itemName}
          </span>

          <span className="text-[19px] text-slate-500">
            {formatDate(createdAt)}
          </span>
        </div>

        {/* Buyer Info */}
        <div>
          <h4 className="font-semibold text-slate-800 text-base text-[19px]">
            {buyerName}
          </h4>

          <p className="text-slate-600 mt-2 leading-relaxed text-[17px]">
            "{buyerMessage}"
          </p>
        </div>

        {/* Farmer Reply */}
        {status === "REPLIED" && (
          <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-[15px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Your Response
            </p>
            <p className="text-[15px] text-slate-700">{farmerReply}</p>
          </div>
        )}
      </div>

      {/* RIGHT SECTION */}
      <div className="flex md:flex-col justify-between md:items-end items-center gap-4 md:min-w-[140px]">
        {/* Status Badge */}
        <span
          className={`px-3 py-1 rounded-full text-xl font-semibold border flex items-center justify-centerw-[950px] h-[50px] ${
            status === "OPEN"
              ? "bg-amber-50 text-amber-600 border-amber-200"
              : "bg-emerald-50 text-emerald-600 border-emerald-200"
          }`}
        >
          {status}
        </span>

        {/* Reply Button */}
        {status === "OPEN" && (
          <button
            onClick={onReplyClick}
            className="bg-emerald-600  font-bold hover:bg-emerald-700 text-white text-[19px] font-medium px-4 py-2 rounded-lg transition duration-200"
          >
            Reply
          </button>
        )}
      </div>
    </div>
  );
};

export default InquiryItem;
