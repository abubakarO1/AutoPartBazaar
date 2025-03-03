
// import mongoose from "mongoose";
// import { NextResponse } from "next/server";
// import dbConnect from "@/utils/db";
// import Product from "@/app/models/product";


// export async function GET(req, { params }) {
//   try {
//     await dbConnect();
//     const { productId } = params;

//     if (!productId) {
//       return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
//     }

//     // Find by productId stored as a string
//     const product = await Product.findOne({ productId: productId });

//     console.log("Product Query Result:", product); // Debugging

//     if (!product) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     return NextResponse.json(product, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Product from "@/app/models/product";

export async function GET(req) {
  try {
    await dbConnect();

    // Extract productId from URL
    const urlParts = req.nextUrl.pathname.split("/");
    const productId = urlParts[urlParts.length - 1]; // Get last part of URL as productId

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Find product in database
    const product = await Product.findOne({ productId });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    console.log("Product Query Result:", product); // Debugging

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
