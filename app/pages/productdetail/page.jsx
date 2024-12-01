"use client";

import { useState, useRef } from "react";
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import ProductImageSection from '@/components/ui/ProductImageSection';
import ProductDetailsSection from '@/components/ui/ProductDetailsSection';
import ProductRatingSection from '@/components/ui/ProductRatingSection';
import CustomerProductsSection from '@/components/ui/ProductCustomerSection';

const ProductDetailsPage = () => {
  const product = {
    id: 1,
    name: "Engine Oil 5W-30",
    price: 25,
    originalPrice: 30,
    category: "Engine",
    make: "Toyota",
    city: "Karachi",
    sale: true,
    freeShipping: false,
    image: "/images/car2.jpg",
    additionalImages: ["/images/car1.jpg", "/images/bakar.jpg", "/images/truck.png"],
    description: "Premium synthetic engine oil offering superior protection and performance for Toyota vehicles.",
    totalRatings: 120,
    averageRating: 4.5,
  };

  const products = [
    {
      id: 1,
      name: "Engine Oil 5W-30",
      price: 25,
      originalPrice: 30,
      category: "Engine",
      make: "Toyota",
      city: "Karachi",
      sale: true,
      freeShipping: false,
      image: "/images/car2.jpg",
      additionalImages: [
        "/images/car1.jpg",
        "/images/bakar.jpg",
        "/images/truck.png",
      ],
    },
    {
      id: 2,
      name: "Air Filter",
      price: 12,
      category: "Filters",
      make: "Honda",
      city: "Lahore",
      sale: false,
      freeShipping: true,
      image: "/images/truck.png",
    },
    {
      id: 3,
      name: "Brake Pads",
      price: 40,
      originalPrice: 50,
      category: "Brakes",
      make: "Suzuki",
      city: "Islamabad",
      sale: true,
      freeShipping: true,
      image: "/images/car1.jpg",
    },
    {
      id: 4,
      name: "Car Battery",
      price: 90,
      category: "Electrical",
      make: "Toyota",
      city: "Karachi",
      sale: false,
      freeShipping: false,
      image: "/images/haaris.jpg",
    },
  ];

  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [currentImage, setCurrentImage] = useState(product.image);

  const swiperRef = useRef(null);

  const calculateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return { fullStars, halfStar, emptyStars };
  };

  const stars = calculateStars(product.averageRating);

  const handleRatingChange = (rating) => setUserRating(rating);
  const handleReviewChange = (event) => setUserReview(event.target.value);
  const handleSubmitReview = () => {
    console.log(`Review submitted: ${userReview}`);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-10 bg-gray-900 shadow-xl rounded-lg p-8 overflow-hidden">
          {/* Product Image Section */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <ProductImageSection
              product={product}
              currentImage={currentImage}
              setCurrentImage={setCurrentImage}
              swiperRef={swiperRef}
              className="w-full h-full object-contain" // Adjusted for better containment
            />
          </div>

          {/* Product Details Section */}
          <div className="flex-1 text-gray-100">
            <h2 className="text-3xl font-bold text-white">{product.name}</h2>
            <ProductDetailsSection product={product} stars={stars} />

            {/* Rating Section */}
            <div className="mt-8">
              <ProductRatingSection
                userRating={userRating}
                handleRatingChange={handleRatingChange}
                userReview={userReview}
                handleReviewChange={handleReviewChange}
                handleSubmitReview={handleSubmitReview}
              />
            </div>
          </div>
        </div>

        {/* Customer Products Section */}
        <div className="mt-12">
          <CustomerProductsSection products={products} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
