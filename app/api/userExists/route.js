// import { NextResponse } from "next/server";
// import User from "@/app/models/User";

// export async function POST(request) {
//     try {
//         // Parse the request body
//         const { email, phone, password } = await request.json();

//         // Input validation: Ensure all required fields are provided
//         if (!email || !phone || !password) {
//             return NextResponse.json({ error: "Email, phone, and password are required" }, { status: 400 });
//         }

//         // Check if a user with the same email or phone already exists
//         const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
//         if (existingUser) {
//             return NextResponse.json({ error: "Email or phone already registered" }, { status: 400 });
//         }

//         // Create a new user and save to the database
//         const newUser = new User({ email, phone, password });
//         await newUser.save();

//         // Return success response
//         return NextResponse.json({ msg: "User registered successfully", user: { email, phone } }, { status: 201 });

//     } catch (e) {
//         // Log and return a server error if something goes wrong
//         console.error("Error during user signup:", e);
//         return NextResponse.json({ error: "Server error. Please try again later.", details: e.message }, { status: 500 });
//     }
// }

// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import dbConnect from '@/utils/db';
// import User from '@/app/models/User';

// const SECRET_KEY = process.env.JWT_SECRET; // Set a strong secret in your environment variables

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     // Parse the request body
//     const { email, password } = req.body;

//     // Input validation
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required.' });
//     }

//     // Connect to the database
//     await dbConnect();

//     // Find the user in the database
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password.' });
//     }

//     // Compare the provided password with the stored hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: 'Invalid email or password.' });
//     }

//     // Generate a JWT token
//     const token = jwt.sign(
//       { id: user._id, email: user.email, name: user.name },
//       SECRET_KEY,
//       { expiresIn: '1h' } // Token expires in 1 hour
//     );

//     // Return success response with the token
//     res.status(200).json({ message: 'Login successful', token });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// }
import dbConnect from '@/utils/db';
import User from '@/app/models/User';
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
