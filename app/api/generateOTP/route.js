import crypto from "crypto";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // Connect to MongoDB
    const mongoClient = new MongoClient(process.env.MONGODB_URI);
    await mongoClient.connect();

    const users = mongoClient.db().collection("users");
    const user = await users.findOne({ email });

    if (!user) {
      await mongoClient.close();
      return NextResponse.json({ error: "Email not found." }, { status: 404 });
    }

    // Generate a 4-digit OTP
    const otp = crypto.randomInt(1000, 9999);  // Generates a 4-digit OTP (between 1000 and 9999)
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);

    // Store OTP in the database with expiry
    const otps = mongoClient.db().collection("otps");
    await otps.insertOne({
      email,
      otp: hashedOtp,
      expiry: Date.now() + 10 * 60 * 1000, // Expires in 10 minutes
    });

    // Configure Nodemailer for Zoho Mail
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com", // SMTP host for Zoho
      port: 465, // Secure port for Zoho
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USER, // Your Zoho email
        pass: process.env.EMAIL_PASS, // Your Zoho email password or app password
      },
    });

    // Send OTP email
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
