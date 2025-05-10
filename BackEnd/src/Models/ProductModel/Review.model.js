import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  userName: { type: String, required: true },
  userAvatar: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  date: { type: Date, default: Date.now },
  content: { type: String }
});

export const ProductReview = mongoose.model("ProductReview", reviewSchema);
