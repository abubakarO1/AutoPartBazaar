import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";
import dbConnect from '@/utils/db';
import User from '@/app/models/User';

export async function POST(request) {
  try {
    // Parse the request body
    const { email, phone, password } = await request.json();

    // Input validation: Ensure all required fields are provided
    if (!email || !phone || !password) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // Connect to the database
    await dbConnect();

    // Check if a user exists with the same email or phone
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return NextResponse.json({ message: 'Email or phone already registered.' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save to the database
    const newUser = new User({ email, phone, password: hashedPassword });
    await newUser.save();

    // Return success response
    return NextResponse.json({ message: 'User registered successfully!' }, { status: 201 });

  } catch (error) {
    // Log and return error response
    console.error('Error during user signup:', error);
    return NextResponse.json({ message: 'Server error. Please try again later.', details: error.message }, { status: 500 });
  }
}

// import { dbConnect } from "@/lib/mongodb";
// import User from "@/models/user";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

// export async function POST(req) {
//   try {
//     const { name, email, password } = await req.json();
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await dbConnect();
//     await User.create({ name, email, password: hashedPassword });

//     return NextResponse.json({ message: "User registered." }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "An error occurred while registering the user." },
//       { status: 500 }
//     );
//   }
// }

