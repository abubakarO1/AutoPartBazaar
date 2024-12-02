import crypto from "crypto";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const mongoClient = new MongoClient(process.env.MONGODB_URI);
    await mongoClient.connect();

    const users = mongoClient.db().collection("users");
    const user = await users.findOne({ email });

    if (!user) {
      await mongoClient.close();
      return NextResponse.json({ error: "Email not found." }, { status: 404 });
    }

    // Generate a 4-digit OTP
    const otp = crypto.randomInt(1000, 9999); // Generates a 4-digit OTP
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);

    const otps = mongoClient.db().collection("otps");
    await otps.updateOne(
      { email },
      { $set: { otp: hashedOtp, expiry: Date.now() + 10 * 60 * 1000 } }, // Expires in 10 minutes
      { upsert: true }
    );

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });

    await mongoClient.close();
    return NextResponse.json({ success: true, message: "OTP sent successfully." });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "An error occurred while processing the request." }, { status: 500 });
  }
}
