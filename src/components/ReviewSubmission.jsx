"use client";

import { useState } from "react";
import { Star, Send, Loader2, CheckCircle2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function ReviewSubmissionForm({ productId, onReviewSubmitted }) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { user, userLoading } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return router.push("/login");
    }
    if (!comment.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productId, message: comment, rating }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit review");
      }

      setSuccess(true);
      setAuthor("");
      setComment("");
      setRating(5);
      router.refresh();
      // Trigger parent callback to update reviews list if provided
      if (onReviewSubmitted) {
        onReviewSubmitted(data.review);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 rounded-2xl shadow-sm dark:shadow-none transition-colors duration-300">
      <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">
        Leave a Review
      </h3>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-6">
        Share your experience with this handcrafted leather product.
      </p>

      {success ? (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-4 rounded-xl flex items-center gap-3 text-emerald-700 dark:text-emerald-400 text-sm">
          <CheckCircle2 size={20} className="shrink-0" />
          <span>Thank you! Your review has been successfully submitted.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Rating Picker */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5 uppercase tracking-wider">
              Rating
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className="p-1 focus:outline-none transition transform hover:scale-110 cursor-pointer"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star
                    size={22}
                    className={`${
                      (hoverRating || rating) >= star
                        ? "fill-amber-500 text-amber-500"
                        : "text-stone-300 dark:text-stone-700"
                    } transition-colors`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-medium text-amber-600 dark:text-amber-500">
                {rating} / 5 Stars
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5 uppercase tracking-wider">
              Your Review
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How was the leather quality, fitting, and delivery?"
              rows={4}
              className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-xl p-4 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-600 dark:focus:border-amber-500 transition resize-none"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-rose-600 dark:text-rose-500 font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer shadow-lg shadow-amber-600/20"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Submitting...
              </>
            ) : (
              <>
                <Send size={15} /> Submit Review
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
