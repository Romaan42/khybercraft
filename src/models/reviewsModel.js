import mongoose from "mongoose";

const reviewsModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    stars: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true },
);

const Review = mongoose.models.Review || mongoose.model("Review", reviewsModel);
export default Review;
