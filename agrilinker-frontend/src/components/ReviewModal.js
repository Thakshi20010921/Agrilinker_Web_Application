import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ReviewModal = ({ item, type = "auto", userId, onClose, onSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Please enter a comment!");
      return;
    }

    //  Detect IDs safely from many possible field names
    const detectedProductId = item?.productId || item?._id || item?.id || null;
    const detectedFertilizerId = item?.fertilizerId || item?.fid || item?.fertId || null;

    
    // - if parent passes "product" or "fertilizer", use it
    // - otherwise auto-detect using fertilizerId presence
    const resolvedType =
      type === "product" || type === "fertilizer"
        ? type
        : detectedFertilizerId
        ? "fertilizer"
        : "product";

   
    const targetId =
      resolvedType === "fertilizer"
        ? (detectedFertilizerId || detectedProductId) 
        : detectedProductId;

    if (!targetId) {
      toast.error("Item ID not found");
      console.log("Item received by ReviewModal:", item);
      return;
    }

   
    const uid =
  userId ||
  localStorage.getItem("userId") ||
  localStorage.getItem("email");

if (!uid) {
  toast.error("Please login first");
  return;
}


    const payload = {
      userId: uid,
      rating,
      comment,
      ...(resolvedType === "fertilizer"
        ? { fertilizerId: targetId }
        : { productId: targetId }),
    };

    setLoading(true);
    try {
  

      await axios.post("http://localhost:8081/api/reviews", payload);

      toast.success("Review submitted!");
      onSubmitted?.();
      onClose?.();
    } catch (err) {
      const status = err?.response?.status;
      const msg =
        err?.response?.data?.message || err?.message || "Failed to submit review.";

      if (status === 409) return toast.error(msg); // already reviewed
      if (status === 404) return toast.error(msg); // product/fertilizer not found
      if (status === 400) return toast.error(msg); // bad request

      toast.error("Server error. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Review: {item?.name || item?.title || "Item"}
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} ⭐
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Write your review here..."
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
