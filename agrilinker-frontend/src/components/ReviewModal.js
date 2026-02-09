import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ReviewModal = ({ product, onClose }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comment) {
      toast.error("Please enter a comment!");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8081/api/reviews", {
  productId: product.id,
  rating,
  comment
});

      toast.success("Review submitted!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review. Try again.");
    }
    setLoading(false);
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

        <h2 className="text-xl font-semibold mb-4">Review: {product.name}</h2>

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
          ></textarea>
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
