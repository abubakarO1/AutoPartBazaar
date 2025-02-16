import dbConnect from '@/utils/db';
import Product from "@/app/models/product";
import { NextResponse } from "next/server";

// DELETE method to remove product by productId
export const DELETE = async (req, { params }) => {
  try {
    // Ensure DB connection
    await dbConnect();

    // Extract the productId from the request body (assuming you are passing productId in the body)
    const { productId } = await req.json();

    // Check if productId exists
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Find the product by its productId and delete it
    const deletedProduct = await Product.findOneAndDelete({ productId });

    // If the product is not found
    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Return success response
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "An error occurred while deleting the product" }, { status: 500 });
  }
};
