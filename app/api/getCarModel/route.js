import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import CarModel from "@/app/models/CarModel";

export async function GET(req) {
  await dbConnect();
  
  const { searchParams } = new URL(req.url);
  const make = searchParams.get("make");
  const car = searchParams.get("car");
  const model = searchParams.get("model");
  const id = searchParams.get("id"); // Also check if ID is provided

  try {
    let carData;

    if (id) {
      // Fetch by ID
      carData = await CarModel.findById(id);
    } else if (make && car && model) {
      // Fetch by make, car, and model
      carData = await CarModel.findOne({ make, car, model });
    } else {
      return NextResponse.json({ success: false, error: "Invalid request parameters" }, { status: 400 });
    }

    if (!carData) {
      return NextResponse.json({ success: false, error: "Model not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, modelUrl: carData.modelUrl });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
