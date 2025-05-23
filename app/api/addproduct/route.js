// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'; // Import S3 SDK
// import multer from 'multer';
// import Product from '@/app/models/product';  // Product model import
// import dbConnect from '@/utils/db';  // DB connection utility

// // Connect to MongoDB
// dbConnect();

// // AWS S3 Configuration using SDK v3
// const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// // Multer setup to handle image uploads (store in memory)
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage }).single('image'); // Handle single image upload from 'image' field in form

// export async function POST(req) {
//   try {
//     console.log('Processing POST request...');

//     // Parse multipart form data for file uploads (images)
//     const formData = await req.formData();
//     const productId = formData.get('productId');
//     const name = formData.get('name');
//     const price = formData.get('price');
//     const originalPrice = formData.get('originalPrice');
//     const category = formData.get('category');
//     const make = formData.get('make');
//     const city = formData.get('city');
//     const sale = formData.get('sale') === 'true';
//     const freeShipping = formData.get('freeShipping') === 'true';
//     const imageFile = formData.get('image');  // Image file from the form

//     // Log received form data
//     console.log('Received form data:', { productId, name, price, category, imageFile });

//     // Validate required fields
//     if (!productId || !name || !price || !category) {
//       return new Response(JSON.stringify({ error: 'Please fill in all required fields.' }), { status: 400 });
//     }

//     // Check if a product with the same productId already exists in the database
//     const existingProduct = await Product.findOne({ productId });
//     if (existingProduct) {
//       return new Response(JSON.stringify({ error: 'A product with this ID already exists.' }), { status: 400 });
//     }

//     // Check if image file is provided and log its size and type for debugging
//     let imageUrl = '';
//     if (imageFile) {
//       console.log(`Uploading image with size: ${imageFile.size} bytes and type: ${imageFile.type}`);
      
//       // Convert the image buffer to a Buffer object (from memory storage)
//       const buffer = Buffer.from(await imageFile.arrayBuffer());  // Convert the ArrayBuffer to Buffer

//       // Upload the image to S3
//       const uploadParams = {
//         Bucket: process.env.AWS_BUCKET_NAME,  // S3 bucket name
//         Key: `${Date.now()}_${imageFile.name}`,  // Unique key for the file
//         Body: buffer,  // Pass the Buffer here
//         ContentType: imageFile.type,  // Content-Type of the file
//       };

//       try {
//         console.log('Starting image upload to S3...');
        
//         // Create the upload command using the PutObjectCommand
//         const putObjectCommand = new PutObjectCommand(uploadParams);

//         // Execute the upload
//         const data = await s3.send(putObjectCommand);

//         // After successful upload, generate the image URL
//         imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
//         console.log('Image uploaded successfully. Image URL:', imageUrl);
//       } catch (error) {
//         console.error('Error uploading image to S3:', error);
//         return new Response(JSON.stringify({ error: 'Error uploading image to S3.' }), { status: 500 });
//       }
//     } else {
//       console.log('No image file provided');
//     }

//     // Create a new product object
//     const newProduct = new Product({
//       productId,
//       name,
//       price,
//       originalPrice,
//       category,
//       make,
//       city,
//       sale,
//       freeShipping,
//       imageUrl,  // Store the URL of the uploaded image
//     });

//     // Save the product to the database
//     await newProduct.save();
//     console.log('Product added to database:', newProduct);

//     // Respond with a success message
//     return new Response(JSON.stringify({ message: 'Product added successfully!', product: newProduct }), { status: 201 });
    
//   } catch (error) {
//     console.error('Error in POST request:', error);
//     return new Response(JSON.stringify({ error: 'An error occurred while adding the product.' }), { status: 500 });
//   }
// }

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import Product from '@/app/models/product';
import dbConnect from '@/utils/db';

// Connect to MongoDB
await dbConnect();

// AWS S3 Configuration
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  try {
    const formData = await req.formData();

    // Extract fields (do NOT get productId from client)
    const name = formData.get('name');
    const price = formData.get('price');
    const originalPrice = formData.get('originalPrice') || null;
    const category = formData.get('category');
    const make = formData.get('make') || '';
    const city = formData.get('city') || '';
    const sale = formData.get('sale') === 'true';
    const freeShipping = formData.get('freeShipping') === 'true';
    const imageFile = formData.get('image');

    // Validate required fields
    if (!name || !price || !category) {
      return new Response(JSON.stringify({ error: 'Please fill in all required fields.' }), { status: 400 });
    }

    if (Number(price) <= 0) {
      return new Response(JSON.stringify({ error: 'Price must be greater than 0.' }), { status: 400 });
    }

    if (originalPrice && Number(price) > Number(originalPrice)) {
      return new Response(JSON.stringify({ error: 'Price must be <= original price.' }), { status: 400 });
    }

    // Generate productId automatically (find max and add 1)
    const lastProduct = await Product.findOne().sort({ productId: -1 }).lean();
    const productId = lastProduct ? String(Number(lastProduct.productId) + 1) : '1';
    
    // Upload image to S3
    let imageUrl = '';
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const key = `products/${Date.now()}_${imageFile.name}`;

      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: imageFile.type,
      };

      try {
        await s3.send(new PutObjectCommand(uploadParams));
        imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
      } catch (err) {
        console.error('S3 Upload Error:', err);
        return new Response(JSON.stringify({ error: 'Image upload failed.' }), { status: 500 });
      }
    }

    // Save new product
    const newProduct = new Product({
      productId,
      name,
      price,
      originalPrice,
      category,
      make,
      city,
      sale,
      freeShipping,
      imageUrl,
    });

    await newProduct.save();

    return new Response(JSON.stringify({ message: 'Product added successfully!', product: newProduct }), { status: 201 });
  } catch (err) {
    console.error('Add Product Error:', err);
    return new Response(JSON.stringify({ error: 'An error occurred while adding the product.' }), { status: 500 });
  }
}




