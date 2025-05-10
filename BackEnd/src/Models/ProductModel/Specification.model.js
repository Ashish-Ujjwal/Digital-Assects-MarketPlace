import mongoose from "mongoose";

const specificationSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  key: { type: String, required: true },
  value: { type: String, required: true }
});

export const ProductSpecification = mongoose.model("ProductSpecification", specificationSchema);
