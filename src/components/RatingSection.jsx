"use client";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function RatingSection({ id }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/review/${id}`);
      const result = await res.json();
      if (result.success) {
        setReviews(result.reviews);
      }
    })();
  }, [id]);

  const rating =
    reviews?.length > 0
      ? (
          reviews.reduce((total, review) => total + review.stars, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";
  return (
    <div className="flex items-center gap-2 text-amber-500">
      <Star size={14} fill="currentColor" />
      <span className="text-sm font-semibold">{rating}</span>
      <span className="text-xs text-stone-500">({reviews.length})</span>
    </div>
  );
}
