"use client"; // Ensure client-side rendering

import React, { useState } from "react";
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import Link from "next/link";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Team members data
  const people = [
    {
      name: 'Abubakar Sohail',
      role: 'CEO',
      imageUrl:
        '/images/bakar.JPG',
    },
    {
      name: 'Muhammad Haaris',
      role: 'CTO',
      imageUrl:
        '/images/haaris.jpg',
    },
    {
      name: 'Ahmad Ali',
      role: 'Lead Designer',
      imageUrl:
        '/images/ahmad.webp',
    },
  ];

  const handlePrevious = () => {
    if (currentIndex === 0) {
      setCurrentIndex(people.length - 1); // Go to the last card
    } else {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex === people.length - 1) {
      setCurrentIndex(0); // Loop back to the first card
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-#2A2A2A text-white py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
            <div className="flex flex-col justify-start items-center lg:items-start gap-10">
              <div className="flex flex-col justify-start items-center lg:items-start gap-4">
                <h2 className="text-4xl font-semibold leading-normal text-center lg:text-left">
                  Revolutionizing Car Customization with AutoPartBazaar
                </h2>
                <p className="text-lg text-center lg:text-left">
                  AutoPartBazaar is a cutting-edge e-commerce platform that
                  simplifies finding and customizing car exterior spare parts.
                  With advanced 3D visualization, users can see how parts will
                  look on their vehicles in real-time, ensuring a seamless and
                  confident shopping experience.
                </p>
              </div>
              <Link href="/pages/blog">
              <button className="bg-red-600 hover:bg-gray-800 text-white py-3 px-6 rounded-lg shadow-md transition-all duration-700">
                Explore AutoPartBazaar
              </button>
              </Link>
            </div>
            <div className="relative">
              <img
                className="rounded-3xl object-cover w-full"
                src="/images/car2.jpg"
                alt="AutoPartBazaar - 3D Customization Preview"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="bg-#2A2A2A py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-xl">
            <h2 className="text-white text-3xl font-semibold tracking-tight sm:text-4xl">
              Our Team
            </h2>
            <p className="mt-6 text-lg text-gray-300">
              We're Fast CFD devs passionate to revolutionize the automotive industry, taking each step towards innovation.
            </p>
          </div>
          <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img
                    alt={person.name}
                    src={person.imageUrl}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-white text-base font-semibold tracking-tight">{person.name}</h3>
                    <p className="text-red-600 text-sm font-semibold">{person.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;