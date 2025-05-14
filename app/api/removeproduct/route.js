import dbConnect from "@/utils/db";
import Product from "@/app/models/product";
import { NextResponse } from "next/server";

export const DELETE = async (req) => {
  try {
    await dbConnect();
    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // If your productId is numeric (not an ObjectId), use findOneAndDelete
    const deletedProduct = await Product.findOneAndDelete({ productId });

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "An error occurred while deleting the product" }, { status: 500 });
  }
};
