import dbConnect from '@/utils/db'; // Correct path to dbConnect utility
import Product from "@/app/models/product";
export async function PUT(req) {
    try {
        // Connect to MongoDB
        await dbConnect();

        // Get the updated product data from the request body
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
        } = await req.json();

        // Validate productId
        if (!productId) {
            return new Response(
                JSON.stringify({ error: 'Product ID is required' }),
                { status: 400 }
            );
        }

        // Find and update the product by productId
        const updatedProduct = await Product.findOneAndUpdate(
            { productId }, // Searching by productId instead of _id
            {
                name,
                price,
                originalPrice,
                category,
                make,
                city,
                sale,
                freeShipping,
            },
            { new: true } // Return the updated product
        );

        // If product not found
        if (!updatedProduct) {
            return new Response(
                JSON.stringify({ error: 'Product not found' }),
                { status: 404 }
            );
        }

        // Respond with success and updated product data
        return new Response(
            JSON.stringify({
                message: 'Product updated successfully!',
                product: updatedProduct,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: 'Failed to update product' }),
            { status: 500 }
        );
    }
}