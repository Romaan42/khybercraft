import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: {
    type: String,
  },
  slug: String,
  sku: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  description: String,
  price: Number,
  stock: Number,
  discount: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      message: String,
      stars: {
        type: Number,
        min: 1,
        max: 5,
      },
      timestamps: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  images: [String],
  sizes: [String],
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
