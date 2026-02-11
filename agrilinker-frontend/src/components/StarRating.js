import React from "react";

export default function StarRating({ value = 0 }) {
  const rating = Math.max(0, Math.min(5, Number(value) || 0));
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <span className="inline-flex items-center">
      {Array.from({ length: full }).map((_, i) => (
        <span key={"f" + i} className="text-yellow-400">★</span>
      ))}
      {half && <span className="text-yellow-400">☆</span>}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={"e" + i} className="text-gray-300">★</span>
      ))}
    </span>
  );
}
