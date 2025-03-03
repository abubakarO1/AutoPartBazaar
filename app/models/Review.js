import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  productId: { type: String, required: true }, // Ensure it's stored as a string
  text: { type: String, required: true },
  rating: { type: Number, required: true },
  //username: { type: String, required: true },
});

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
