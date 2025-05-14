import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { type: String, required: true },
  make: { type: String },
  city: { type: String },
  sale: { type: Boolean, default: false },
  freeShipping: { type: Boolean, default: false },
  imageUrl: { type: String }, // Image URL from S3
  modelUrl: { type: String, default: null }, // New attribute (can be null)
});

productSchema.index({ productId: 1 });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
