import mongoose from "mongoose";

const CarModelSchema = new mongoose.Schema({
  make: { type: String, required: true },
  car: { type: String, required: true },
  model: { type: Number, required: true },  // Change Double to Number
  modelUrl: { type: String, default: "" },
});

export default mongoose.models.CarModel || mongoose.model("CarModel", CarModelSchema);
