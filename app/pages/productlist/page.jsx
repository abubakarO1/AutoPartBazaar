"use client";

import React, { useState, useEffect } from "react";
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import AdvancedSearch from '@/components/ui/ListAdvancedSearch';
import ProductGrid from '@/components/ui/ListProductGrid';
import SortingOptions from '@/components/ui/ListSortingOptions';

const Home = () => {
  const [products, setProducts] = useState([]);  // Store fetched products
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productsToShow, setProductsToShow] = useState(6); // Number of products to display initially

  // Fetch products from the backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log("Fetched Products:", data.products);  // Log fetched products to verify image URL
        setProducts(data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter the products based on the selected filters
  const filteredProducts = products.filter((product) => {
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

  // Slice the products array based on the number of products to show
  const productsToDisplay = sortedProducts.slice(0, productsToShow);

  // Load more products when the "See More" button is clicked
  const handleSeeMore = () => {
    setProductsToShow((prev) => prev + 6);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

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
            <ProductGrid products={productsToDisplay} viewMode={viewMode} />
            
            {/* See More Button */}
            {productsToDisplay.length < sortedProducts.length && (
              <div className="text-right mt-6">
                <button
                  onClick={handleSeeMore}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all"
                >
                  See More 
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
