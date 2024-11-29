"use client";

import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa"; // Import icons
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

const Home = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.phone) newErrors.phone = "Phone Number is required";
    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validate()) {
      console.log("Form Submitted:", formData);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="bg-2A2A2A text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-6">Contact Us</h2>
          <p className="text-center mb-8 text-gray-300">
            We use an agile approach to test assumptions and connect with the needs of your audience early and often.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Form Section */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="Tahir"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-2 w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Farooq"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-2 w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@google.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+92 3456789"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2 w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Leave a comment..."
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-2 w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                <p className="text-sm text-gray-400">
                  By submitting this form you agree to our{' '}
                  <a href="#" className="text-red-500 hover:underline">
                    terms and conditions
                  </a>{' '}
                  and our{' '}
                  <a href="#" className="text-red-500 hover:underline">
                    privacy policy
                  </a>
                  .
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-red-600 hover:bg-gray-900 text-white font-bold rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Information Section */}
            <div className="space-y-8 mt-32">
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt className="text-red-500 text-2xl" />
                <div>
                  <h3 className="text-lg font-bold">Address</h3>
                  <p>FAST Chiniot Faislabad</p>
                  <p>Sargodha road, Zip Code: 35400</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FaPhoneAlt className="text-red-500 text-2xl" />
                <div>
                  <h3 className="text-lg font-bold">Call Us</h3>
                  <p>Call us to speak to a member of our team. We are always happy to help.</p>
                  <p className="text-red-500 font-bold">+92-3096107599</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
