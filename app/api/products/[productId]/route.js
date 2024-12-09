import dbConnect from '@/utils/db'; // Path to your DB connection utility
import Product from "@/app/models/product";
import { NextResponse } from "next/server";

// GET method to fetch product by productId
export const GET = async (req, { params }) => {
  try {
    // Ensure database connection
    await dbConnect();

    // Extract productId from dynamic params
    const { productId } = params;  // Use productId, not productID
    console.log("Fetching product with ID:", productId); 

    // Query the product by productId in the database
    const product = await Product.findOne({ productId });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Return product if found
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "An error occurred while fetching the product" }, { status: 500 });
  }
};
