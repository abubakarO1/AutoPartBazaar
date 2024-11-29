"use client"; // Marking as client-side

import Image from "next/image";
import Link from "next/link"; // Import Link component from Next.js
import ProductCard from "@/components/ui/productCards";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState({
    partName: "",
    carName: "",
    carModel: "",
  });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    console.log(searchQuery); // Search logic here
  };

  const products = [
    {
      id: "1",
      image: "/images/product1.png",
      title: "Honda City Bumper",
      description: "Premium quality bumper designed for Honda City.",
      price: 2500,
    },
    {
      id: "2",
      image: "/images/product2.png",
      title: "Honda City Headlight",
      description: "High-intensity headlight for Honda City.",
      price: 3000,
    },
    {
      id: "3",
      image: "/images/product3.jpeg",
      title: "Honda City Headlight",
      description: "Energy-efficient headlight with superior brightness.",
      price: 3500,
    },
    {
      id: "4",
      image: "/images/product4.jpeg",
      title: "Toyota Grande Rim",
      description: "Stylish alloy rim for Toyota Grande.",
      price: 3000,
    },
    {
      image: "/images/product5.jpeg",
      title: "Honda City Rims",
      description: "Durable and lightweight rims for Honda City.",
      price: 4000,
    },
    {
      image: "/images/product6.jpeg",
      title: "Toyota Back Bumper",
      description: "Top-quality rear bumper for Toyota vehicles.",
      price: 3500,
    },
    {
      image: "/images/product7.jpeg",
      title: "Toyota Grande Headlight",
      description: "Clear and bright headlight for Toyota Grande.",
      price: 3500,
    },
    {
      image: "/images/product8.jpeg",
      title: "Toyota Grande Front Bumper",
      description: "Sleek and sturdy front bumper for Toyota Grande.",
      price: 3500,
    },
  ];

  return (
    <div className="font-[sans-serif] bg-black">
      <Navbar />
      {/* Search Bar Section */}
      <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
        <h2 className="text-4xl font-extrabold text-gray-200 mb-8">Search Products</h2>

        {/* Unified Search Bar */}
        <div className="flex mb-8">
          <input
            type="text"
            name="partName"
            placeholder="Spare Part Name"
            value={searchQuery.partName}
            onChange={handleSearchChange}
            className="p-3 rounded-l-lg border border-gray-500 bg-black text-white placeholder-gray-400 focus:outline-none w-1/3"
          />

          <select
            name="carName"
            value={searchQuery.carName}
            onChange={handleSearchChange}
            className="p-3 border border-gray-500 bg-black text-white placeholder-gray-400 focus:outline-none w-1/3"
          >
            <option value="">Select Car Name</option>
            <option value="Honda City">Honda City</option>
            <option value="Toyota Grande">Toyota Grande</option>
            <option value="Honda Civic">Honda Civic</option>
          </select>

          <select
            name="carModel"
            value={searchQuery.carModel}
            onChange={handleSearchChange}
            className="p-3 rounded-r-lg border border-gray-500 bg-black text-white placeholder-gray-400 focus:outline-none w-1/3"
          >
            <option value="">Select Car Model</option>
            <option value="2023">2023</option>
            <option value="2021">2021</option>
            <option value="2018">2018</option>
          </select>

          <button
            onClick={handleSearch}
            className="p-3 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-all"
          >
            Search
          </button>
        </div>
      </div>

      {/* Products Section */}
      
      <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
        <h2 className="text-4xl font-extrabold text-gray-200 mb-12">Car Accessories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
  {products.map((product) => (
    <Link href={"/pages/productdetail"} passHref>
      <div className="cursor-pointer">
        <ProductCard
          image={product.image}
          title={product.title}
          description={product.description}
          price={product.price}
        />
      </div>
    </Link>
  ))}
</div>
      </div>

      <Footer />
    </div>
  );
}
