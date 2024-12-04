"use client";

import React, { useState } from "react";

const AddProductPage = () => {
  const [product, setProduct] = useState({
    productId: "",
    name: "",
    price: "",
    originalPrice: "",
    category: "",
    make: "",
    city: "",
    sale: false,
    freeShipping: false,
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert("Product added successfully!");
        setProduct({
          productId: "",
          name: "",
          price: "",
          originalPrice: "",
          category: "",
          make: "",
          city: "",
          sale: false,
          freeShipping: false,
          image: "",
        });
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
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
      <form
        onSubmit={handleSubmit}
        className="space-y-6 text-white w-full max-w-md bg-opacity-70 bg-black p-6 rounded shadow-lg"
      >
        <h1 className="text-3xl font-bold text-gradient mb-6">
          Add Product
        </h1>
        <div>
          <label className="block mb-2 text-lg font-medium text-gradient">
            Product ID
          </label>
          <input
            type="text"
            name="productId"
            value={product.productId}
            onChange={handleChange}
            className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter product ID"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-lg font-medium text-gradient">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter product name"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-lg font-medium text-gradient">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter price"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-lg font-medium text-gradient">
            Original Price (Optional)
          </label>
          <input
            type="number"
            name="originalPrice"
            value={product.originalPrice}
            onChange={handleChange}
            className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter original price"
          />
        </div>
        <div>
          <label className="block mb-2 text-lg font-medium text-gradient">
            Category
          </label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="" className="text-black">
              Select Category
            </option>
            <option value="Engine" className="text-black">
              Engine
            </option>
            <option value="Filters" className="text-black">
              Filters
            </option>
            <option value="Brakes" className="text-black">
              Brakes
            </option>
            <option value="Electrical" className="text-black">
              Electrical
            </option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-lg font-medium text-gradient">
            Make
          </label>
          <input
            type="text"
            name="make"
            value={product.make}
            onChange={handleChange}
            className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter make"
          />
        </div>
        <div>
          <label className="block mb-2 text-lg font-medium text-gradient">
            City
          </label>
          <input
            type="text"
            name="city"
            value={product.city}
            onChange={handleChange}
            className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter city"
          />
        </div>
        <div>
          <label className="block mb-2 text-lg font-medium flex items-center text-gradient">
            <input
              type="checkbox"
              name="sale"
              checked={product.sale}
              onChange={handleChange}
              className="mr-2"
            />
            On Sale
          </label>
        </div>
        <div>
          <label className="block mb-2 text-lg font-medium flex items-center text-gradient">
            <input
              type="checkbox"
              name="freeShipping"
              checked={product.freeShipping}
              onChange={handleChange}
              className="mr-2"
            />
            Free Shipping
          </label>
        </div>
        <div>
          <label className="block mb-2 text-lg font-medium text-gradient">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter image URL"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition-all"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
