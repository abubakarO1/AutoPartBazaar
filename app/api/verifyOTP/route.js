import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, otp } = body;

    if (!email || !otp || otp.length !== 4) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Connect to MongoDB
    const mongoClient = new MongoClient(process.env.MONGODB_URI);
    await mongoClient.connect();

    const otps = mongoClient.db().collection("otps");

    // Find the OTP record for the given email
    const otpRecord = await otps.findOne({ email });

    if (!otpRecord) {
      await mongoClient.close();
      return NextResponse.json({ error: "OTP not found." }, { status: 404 });
    }

    // Check if OTP has expired
    if (otpRecord.expiry < Date.now()) {
      await mongoClient.close();
      return NextResponse.json({ error: "OTP has expired." }, { status: 400 });
    }

    // Verify OTP by comparing the hashed OTP with the provided one
    const isOtpValid = await bcrypt.compare(otp, otpRecord.otp);
    
    if (!isOtpValid) {
      await mongoClient.close();
      return NextResponse.json({ error: "Invalid OTP." }, { status: 400 });
    }

    // OTP verified, now delete the OTP record from the database
    await otps.deleteOne({ email });  // Delete the OTP from the database

    // Close MongoDB connection
    await mongoClient.close();

    // Respond with success
    return NextResponse.json({ success: true, message: "OTP verified successfully." });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "An error occurred while processing the request." }, { status: 500 });
  }
}
