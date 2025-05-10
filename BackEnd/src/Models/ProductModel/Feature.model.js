import mongoose from "mongoose";

const productFeatureSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  feature: { type: String, required: true }
});

export const ProductFeature = mongoose.model("ProductFeature", productFeatureSchema);
