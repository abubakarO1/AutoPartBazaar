import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import dbConnect from "./db.js";
import CarModel from "../app/models/CarModel.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function insertData() {
  try {
    await dbConnect(); // Connect to the database

    const cars = [
      { make: "Honda", car: "Civic", model: "2023", modelUrl: "https://auto-part-bazaar.s3.eu-north-1.amazonaws.com/civic2.glb" },
      { make: "Toyota", car: "Corolla", model: "2022", modelUrl: "https://auto-part-bazaar.s3.eu-north-1.amazonaws.com/corolla2.glb" },
    ];

    await CarModel.insertMany(cars);
    console.log("✅ Data inserted successfully!");
    mongoose.connection.close(); // Close connection after inserting
  } catch (error) {
    console.error("❌ Error inserting data:", error);
  }
}

insertData();
