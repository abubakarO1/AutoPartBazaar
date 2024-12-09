import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

export async function POST(req) {
  try {
    const { email, newPassword, confirmPassword } = await req.json();

    // Validate input fields
    if (!email || !newPassword || !confirmPassword) {
      return new Response(JSON.stringify({ error: "All fields are required." }), {
        status: 400,
      });
    }

    if (newPassword !== confirmPassword) {
      return new Response(
        JSON.stringify({ error: "Passwords do not match." }),
        { status: 400 }
      );
    }

    // Create MongoDB connection
    const mongoClient = new MongoClient(process.env.MONGODB_URI);
    await mongoClient.connect();
    const usersCollection = mongoClient.db().collection("users");

    // Check if user exists
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found." }),
        { status: 404 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    const result = await usersCollection.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ error: "Failed to update password." }),
        { status: 500 }
      );
    }

    // Close MongoDB connection
    await mongoClient.close();

    return new Response(
      JSON.stringify({ success: true, message: "Password updated successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
