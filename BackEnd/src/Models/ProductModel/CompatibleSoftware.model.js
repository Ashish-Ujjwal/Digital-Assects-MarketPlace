import mongoose from "mongoose";

const compatibleSoftwareSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  software: { type: String, required: true }
});

export const CompatibleSoftware = mongoose.model("CompatibleSoftware", compatibleSoftwareSchema);
