"use client";

import React, { useState } from "react";

const RemoveProductPage = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null); // Store fetched product data
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // State to show/hide confirmation modal
  const [customAlert, setCustomAlert] = useState(null); // State for custom alert

  // Dummy product data
  const dummyProducts = {
    "101": {
      name: "Engine Oil Filter",
      price: 25,
      category: "Filters",
      make: "Toyota",
      city: "Karachi",
    },
    "102": {
      name: "Brake Pad",
      price: 50,
      category: "Brakes",
      make: "Honda",
      city: "Lahore",
    },
    "103": {
      name: "Car Battery",
      price: 100,
      category: "Electrical",
      make: "Hyundai",
      city: "Islamabad",
    },
  };

  const handleFetchProduct = () => {
    setLoading(true);
    setTimeout(() => {
      if (dummyProducts[productId]) {
        setProduct(dummyProducts[productId]); // Populate with dummy data
      } else {
        showCustomAlert("Product not found. Please check the Product ID.", "error");
        setProduct(null);
      }
      setLoading(false);
    }, 1000); // Simulating network delay
  };

  const handleRemoveProduct = () => {
    // Simulate a database delete action
    setShowConfirm(false); // Close modal
    setTimeout(() => {
      showCustomAlert("Product removed successfully! (This is a dummy delete)", "success");
      setProduct(null); // Clear product details
      setProductId(""); // Reset Product ID input
    }, 1000);
  };

  const showCustomAlert = (message, type) => {
    setCustomAlert({ message, type });
    setTimeout(() => setCustomAlert(null), 3000); // Automatically hide after 3 seconds
  };

  return (
    <div
      className="min-h-screen flex items-start justify-start p-12"
      style={{
        backgroundImage: `url('/images/car1.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Custom Alert Box */}
      {customAlert && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div
            className={`p-6 rounded-lg shadow-lg text-white ${
              customAlert.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <p className="text-lg font-bold">{customAlert.message}</p>
          </div>
        </div>
      )}

      {/* Remove Product Form */}
      <form
        className="space-y-6 text-white w-full max-w-md bg-opacity-70 bg-black p-6 rounded shadow-lg"
      >
        <h1 className="text-3xl font-bold text-gradient mb-6">Remove Product</h1>

        {/* Fetch Product by ID */}
        <div>
          <label className="block mb-2 text-lg font-medium text-gradient">
            Product ID
          </label>
          <input
            type="text"
            name="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter Product ID"
            required
          />
          <button
            type="button"
            onClick={handleFetchProduct}
            className="mt-4 w-full p-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition-all"
            disabled={loading}
          >
            {loading ? "Fetching..." : "Fetch Product"}
          </button>
        </div>

        {/* Product Details */}
        {product && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Make:</strong> {product.make}</p>
            <p><strong>City:</strong> {product.city}</p>
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="mt-6 w-full p-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition-all"
            >
              Remove Product
            </button>
          </div>
        )}
      </form>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to remove this product?</p>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={handleRemoveProduct}
                className="p-2 bg-red-500 text-white rounded font-semibold hover:bg-red-600 transition-all"
              >
                Yes, Remove
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="p-2 bg-gray-300 text-black rounded font-semibold hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemoveProductPage;
