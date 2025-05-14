import dbConnect from "@/utils/db";
import Product from "@/app/models/product";
import mongoose from "mongoose";

export async function PUT(req) {
    try {
        await dbConnect();

        let productData;
        try {
            productData = await req.json();
        } catch (err) {
            return new Response(
                JSON.stringify({ error: "Invalid JSON input" }),
                { status: 400 }
            );
        }

        const {
            productId,
            name,
            price,
            originalPrice,
            category,
            make,
            city,
            sale,
            freeShipping,
        } = productData;

        if (!productId) {
            return new Response(
                JSON.stringify({ error: "Product ID is required" }),
                { status: 400 }
            );
        }

        // Determine search condition: _id (MongoDB ObjectId) or productId (custom ID)
        let query = {};
        if (mongoose.Types.ObjectId.isValid(productId)) {
            query._id = productId;
        } else {
            query.productId = productId.toString();
        }

        // Update only provided fields
        const updateFields = {};
        if (name) updateFields.name = name;
        if (price) updateFields.price = price;
        if (originalPrice) updateFields.originalPrice = originalPrice;
        if (category) updateFields.category = category;
        if (make) updateFields.make = make;
        if (city) updateFields.city = city;
        if (typeof sale === "boolean") updateFields.sale = sale;
        if (typeof freeShipping === "boolean") updateFields.freeShipping = freeShipping;

        // Find and update the product
        const updatedProduct = await Product.findOneAndUpdate(
            query,
            updateFields,
            { new: true, runValidators: true } // Return updated product and apply validation
        );

        if (!updatedProduct) {
            return new Response(
                JSON.stringify({ error: "Product not found" }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                message: "Product updated successfully!",
                product: updatedProduct,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating product:", error);
        return new Response(
            JSON.stringify({ error: "Failed to update product" }),
            { status: 500 }
        );
    }
}
