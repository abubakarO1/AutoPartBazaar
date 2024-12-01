"use client";

import React, { useState } from "react";
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import AdvancedSearch from '@/components/ui/ListAdvancedSearch';
import ProductGrid from '@/components/ui/ListProductGrid';
import SortingOptions from '@/components/ui/ListSortingOptions';

const initialProducts = [
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

const Home = () => {
  const [filters, setFilters] = useState({
    keyword: "",
    sale: false,
    freeShipping: false,
    category: "",
    minPrice: 0,
    maxPrice: 0,
    make: "",
    city: "",
  });
  const [sortBy, setSortBy] = useState("priceLow");
  const [viewMode, setViewMode] = useState("grid");

  const filteredProducts = initialProducts.filter((product) => {
    return (
      (!filters.keyword || product.name.toLowerCase().includes(filters.keyword.toLowerCase())) &&
      (!filters.sale || product.sale) &&
      (!filters.freeShipping || product.freeShipping) &&
      (!filters.category || product.category === filters.category) &&
      (!filters.make || product.make === filters.make) &&
      (!filters.city || product.city === filters.city) &&
      (filters.minPrice === 0 || product.price >= filters.minPrice) &&
      (filters.maxPrice === 0 || product.price <= filters.maxPrice)
    );
  });

  // Apply sorting based on the selected sortBy value
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "priceLow") {
      return a.price - b.price;
    } else if (sortBy === "priceHigh") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex space-x-6">
          <div className="w-1/4">
            <AdvancedSearch filters={filters} setFilters={setFilters} />
          </div>
          <div className="flex-1">
            <SortingOptions sortBy={sortBy} setSortBy={setSortBy} setViewMode={setViewMode} viewMode={viewMode} />
            <ProductGrid products={sortedProducts} viewMode={viewMode} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
