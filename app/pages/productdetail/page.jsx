"use client"; 
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import { useState } from "react";

export default function ProductDetails() {
  const [mainImage, setMainImage] = useState(
    "/images/product1.png"
  );

  const thumbnails = [];

  return (
    // Here is the code for product details
    <div className="bg-black">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Product Images */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={mainImage}
              alt="Toyota Grande Front Bumper"
              className="w-full h-auto rounded-lg shadow-md mb-4"
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {thumbnails.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() => setMainImage(src)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2 text-white">Toyota Grande Front Bumper</h2>
            <p className="text-gray-400 mb-4">SKU: TGRB2023</p>
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2 text-white">Rs. 74,999</span>
              <span className="text-gray-500 line-through">Rs. 84,999</span>
            </div>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <span className="ml-2 text-gray-400">4.7 (85 reviews)</span>
            </div>
            <p className="text-gray-300 mb-6">
              Enhance the look and functionality of your Toyota Grande with this premium front bumper. Designed for durability and a perfect fit, it ensures safety and style for your vehicle.
            </p>

            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                defaultValue="1"
                className="w-12 text-center text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div className="flex space-x-4 mb-6">
              <button className="bg-red-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                Add to Cart
              </button>
              <button className="bg-red-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                <a href="/pages/checkout"> Buy Now </a>
                
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">Key Features:</h3>
              <ul className="list-disc list-inside text-gray-300">
                <li>Perfect fit for Toyota Grande 2023 model</li>
                <li>High-impact ABS material for durability</li>
                <li>Pre-drilled holes for easy installation</li>
                <li>Aerodynamic design for enhanced performance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

                {/* {product section} */}
                


      <Footer />
    </div>
  );
}
