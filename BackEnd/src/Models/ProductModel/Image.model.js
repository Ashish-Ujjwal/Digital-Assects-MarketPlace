import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  imageUrl: { type: String, required: true }
});

export const ProductImage = mongoose.model("ProductImage", imageSchema);
