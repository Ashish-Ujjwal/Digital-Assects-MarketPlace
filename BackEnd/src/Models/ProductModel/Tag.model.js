import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  tag: { type: String, required: true }
});

export const ProductTag = mongoose.model("ProductTag", tagSchema);
