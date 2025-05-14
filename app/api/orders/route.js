import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Order from "@/app/models/Order";
import { getServerSession } from "next-auth";

export async function POST(req) {
  await dbConnect();
  
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { items, totalAmount, shippingAddress } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }

    const newOrder = await Order.create({
      user: session.user.id,
      items,
      totalAmount,
      shippingAddress,
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
