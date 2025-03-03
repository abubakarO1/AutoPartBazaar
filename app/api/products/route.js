// import dbConnect from '@/utils/db';
// import Product from '@/app/models/product';
// import { NextResponse } from 'next/server';

// // GET method handler
// export const GET = async () => {
//   try {
//     // Connect to the database
//     await dbConnect();

//     // Fetch all products from the database
//     const products = await Product.find();

//     // If no products found, respond with an empty array
//     return NextResponse.json({ products }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
//   }
// };


import dbConnect from "@/utils/db";
import Product from "@/app/models/product"; 
 // Ensure this is correct
import { NextResponse } from "next/server";
export const GET = async () => {
  try {
    await dbConnect();
    const products = await Product.find();

    if (!products || products.length === 0) {
      return NextResponse.json({ error: "No products found" }, { status: 404 });
    }

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
};
