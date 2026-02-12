import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ReplyModal = ({ inquiry, onClose, onSuccess }) => {
  const [replyMessage, setReplyMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!replyMessage.trim()) {
      toast.warning("Please type a reply before sending.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Assuming your backend expects a PUT request to update the inquiry
      // Adjust the URL to match your Spring Boot @PutMapping
      const response = await axios.put(
        `http://localhost:8081/api/inquiries/${inquiry.id}/farmerReply`,
        {
          farmerReply: replyMessage,
          status: "REPLIED",
          repliedAt: new Date().toISOString(),
        },
      );

      if (response.status === 200 || response.status === 204) {
        toast.success("Reply sent successfully!");
        onSuccess(); // Re-fetches the list in the parent component
        onClose(); // Closes the modal
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error("Failed to send reply. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-emerald-700 p-4 text-white flex justify-between items-center">
          <h3 className="font-bold text-lg ">Reply to : {inquiry.buyerName}</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 font-bold  "
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              Buyer's Inquiry:
            </label>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg italic border">
              "{inquiry.buyerMessage}"
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Your Message:
            </label>
            <textarea
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
              rows="4"
              placeholder="Type your answer here..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              disabled={isSubmitting}
            ></textarea>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg text-white font-medium transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-700 hover:bg-green-500"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Reply"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReplyModal;
