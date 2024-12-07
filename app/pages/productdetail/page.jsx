"use client";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import ProductCustomerSection from "@/components/ui/ProductCustomerSection";
    import { useState } from "react";

    export default function ProductDetails() {

        const [quantity, setQuantity] = useState(1);

        const increaseQuantity = () => setQuantity(quantity + 1);
        const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    const product = {
        id: 1,
        name: "Engine Oil 5W-30",
        price: 2499,
        originalPrice: 3500,
        category: "Engine",
        make: "Toyota",
        city: "Karachi",
        sale: true,
        freeShipping: false,
        image: "/images/car2.jpg",
        additionalImages: ["/images/car1.jpg", "/images/savedmodel.jpg", "/images/truck.png"],
        description: "Engine Oil 5W-30 is a high-performance synthetic lubricant designed to enhance engine efficiency and protect critical engine components. It offers excellent viscosity for smooth operation in a wide range of temperatures, ensuring reliable performance in both cold starts and high-temperature conditions. Engine Oil 5W-30 reduces friction, minimizes engine wear, and improves fuel efficiency, making it ideal for modern gasoline and diesel engines. It also meets stringent industry standards, providing superior protection against sludge, oxidation, and thermal breakdown. Suitable for a variety of car makes and models, this oil is the perfect choice for long-lasting engine health and peak performance.",
        totalRatings: 120,
        averageRating: 4.5,
        reviews: [
            { id: 1, rating: 5, text: "Excellent product, highly recommend!", username: "Muhammad Haaris" },
            { id: 2, rating: 4, text: "Good value for the price.", username: "Abubakar Sohail" },
          ],
    };

    const relatedProducts = [
        {
          id: 1,
          name: "Engine Oil 5W-30",
          price: 2499,
          originalPrice: 3500,
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
          price: 1499,
          category: "Filters",
          make: "Honda",
          city: "Lahore",
          sale: false,
          freeShipping: true,
          image: "/images/product3.jpeg",
        },
        {
          id: 3,
          name: "Brake Pads",
          price: 999,
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
          price: 12999,
          category: "Electrical",
          make: "Toyota",
          city: "Karachi",
          sale: false,
          freeShipping: false,
          image: "/images/product2.png",
        },
      ];    

    const [selectedImage, setSelectedImage] = useState(product.image);
    const [newReview, setNewReview] = useState({ text: '', rating: 0, username: 'User' });
    const [productReviews, setProductReviews] = useState(product.reviews);
    const [averageRating, setAverageRating] = useState(product.averageRating);

    // Function to recalculate average rating
    const calculateAverageRating = (reviews) => {
        const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
        return totalRatings / reviews.length || 0;
    };

    // Handle review submission
    const handleReviewSubmit = () => {
        if (newReview.text && newReview.rating > 0) {
        const updatedReviews = [...productReviews, newReview];
        setProductReviews(updatedReviews);
        setNewReview({ text: "", rating: 0,username: 'User' });

        // Recalculate the average rating after adding the review
        const newAverageRating = calculateAverageRating(updatedReviews);

        // Update the product's average rating
        setAverageRating(newAverageRating);
        }
    };

    // Function to render stars based on rating (more pointy design)
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStars = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStars;

        const stars = [];

        // Add full stars
        for (let i = 0; i < fullStars; i++) {
        stars.push(
            <svg
            key={`full-${i}`}
            className="w-5 fill-yellow-500"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
        );
        }

        // Add half star if necessary
        if (halfStars) {
        stars.push(
            <svg
            key="half"
            className="w-5 fill-yellow-500"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
        );
        }

        // Add empty stars
        for (let i = 0; i < emptyStars; i++) {
        stars.push(
            <svg
            key={`empty-${i}`}
            className="w-5 fill-gray-500"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
        );
        }

        return stars;
    };

    return (
        <>
        <Navbar />
        <div className="font-sans min-h-screen bg-[#0a0a0a] flex justify-center items-center">
        <div className="p-4 lg:max-w-7xl max-w-xl w-full mx-auto">
            <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Product Image Section */}
            <div className="min-h-[500px] lg:col-span-3 bg-[#0a0a0a] rounded-lg w-full lg:sticky top-0 text-center p-6">
                <img
                src={selectedImage}
                alt="Product"
                className="w-full max-h-[400px] object-contain rounded mx-auto py-6"
                />
                <hr className="border-white border my-6" />
                <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center mx-auto">
                {/* Display the main image as a thumbnail as well */}
                <div
                    className={`w-20 h-20 max-lg:w-16 max-lg:h-16 bg-gray-600 p-3 rounded-lg ${selectedImage === product.image ? 'border-2 border-red-500' : ''}`}
                    onClick={() => setSelectedImage(product.image)}
                >
                    <img
                    src={product.image}
                    alt="Main Product Image Thumbnail"
                    className="w-full h-full object-contain cursor-pointer"
                    />
                </div>
                {product.additionalImages.map((img, index) => (
                    <div
                    key={index}
                    className={`w-20 h-20 max-lg:w-16 max-lg:h-16 bg-gray-600 p-3 rounded-lg ${selectedImage === img ? 'border-2 border-red-500' : ''}`}
                    onClick={() => setSelectedImage(img)}
                    >
                    <img
                        src={img}
                        alt={`Product Thumbnail ${index + 1}`}
                        className="w-full h-full object-contain cursor-pointer"
                    />
                    </div>
                ))}
                </div>
            </div>

            {/* Product Details Section */}
            <div className="lg:col-span-2 text-gray-100">
                <h2 className="text-3xl font-bold">{product.name}</h2>
                <div className="flex flex-wrap gap-4 mt-4">
                <p className="text-red-500 text-xl font-bold">Rs {product.price}</p>
                <p className="text-gray-400 text-xl">
                    <strike>Rs {product.originalPrice}</strike> <span className="text-sm ml-1">Tax included</span>
                </p>
                </div>

                {/* Product Rating Section */}
                <div className="flex space-x-2 mt-4">
                {renderStars(averageRating)}
                <span className="text-yellow-500 text-xl font-bold">{averageRating.toFixed(1)}</span>
                </div>

                <div className="mt-8">
                <h3 className="text-xl font-bold">Product Description</h3>
                <p className="text-gray-300 text-sm mt-4">{product.description}</p>
                </div>

                <div className="mt-8 space-y-4">
                <p className="text-gray-300 text-sm">
                    <span className="font-bold text-gray-100">Category:</span> {product.category}
                </p>
                <p className="text-gray-300 text-sm">
                    <span className="font-bold text-gray-100">Make:</span> {product.make}
                </p>
                <p className="text-gray-300 text-sm">
                    <span className="font-bold text-gray-100">City:</span> {product.city}
                </p>
               

<div className="flex items-center gap-4 mt-6">
  <button
    onClick={decreaseQuantity}
    className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm font-semibold"
  >
    -
  </button>
  <span className="text-xl font-semibold">{quantity}</span>
  <button
    onClick={increaseQuantity}
    className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm font-semibold"
  >
    +
  </button>
</div>
                </div>

                <div className="mt-8">
                <button
                    type="button"
                    className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-md"
                >
                    Add {quantity} to Cart
                </button>
                </div>
            </div>
            </div>

            {/* Reviews Section - Darker Background */}
        <div className="mt-12 bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-100">Customer Reviews</h3>
          <div className="mt-4 space-y-6">
            {productReviews.map((review) => (
              <div key={review.id} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  {renderStars(review.rating)}
                  <span className="text-yellow-500 text-sm">{review.rating}</span>
                </div>
                <p className="text-gray-100 text-sm font-semibold">{review.username}</p>
                <p className="text-gray-300 text-sm">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

            {/* Submit Review Section */}
            <div className="mt-12 bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-100">Submit Your Review</h3>
            <div className="mt-4">
                <textarea
                className="w-full p-3 text-gray-900 bg-gray-100 rounded-md"
                rows="4"
                placeholder="Write your review here..."
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                />
            </div>
            <div className="mt-4 flex items-center">
                {[...Array(5)].map((_, index) => (
                <svg
                    key={index}
                    className={`w-5 cursor-pointer ${newReview.rating >= index + 1 ? "fill-yellow-500" : "fill-gray-500"}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => setNewReview({ ...newReview, rating: index + 1 })}
                >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                ))}
            </div>
            <div className="mt-4">
                <button
                onClick={handleReviewSubmit}
                className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-md"
                >
                Submit Review
                </button>
            </div>
            </div>
        </div>
        </div>
        <ProductCustomerSection products={relatedProducts} />
        <Footer />
        </>
    );
    }
