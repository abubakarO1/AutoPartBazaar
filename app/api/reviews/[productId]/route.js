import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Review from "@/app/models/Review"; // Ensure the Review model is correctly imported

// ✅ GET Reviews for a product
export async function GET(req, { params }) {
  await dbConnect();

  try {
    const productId = params?.productId?.toString(); // Ensure it's a string
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Fetch reviews where productId matches
    const reviews = await Review.find({ productId: productId });

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Error fetching reviews" }, { status: 500 });
  }
}

// ✅ POST a new Review
export async function POST(req, { params }) {
  await dbConnect();

  try {
    const productId = params?.productId?.toString(); // Ensure it's a string
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const { text, rating } = await req.json(); //, username

    // Validate required fields
    if (!text || !rating ) { //|| !username
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Create a new review
    const review = new Review({
      text,
      rating,
      //username,
      productId, // Ensure it's stored as a string, not ObjectId
    });

    await review.save();

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error saving review:", error);
    return NextResponse.json({ error: "Error saving review" }, { status: 500 });
  }
}
