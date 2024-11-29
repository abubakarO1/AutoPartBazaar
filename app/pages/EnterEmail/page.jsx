"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EnterEmail() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerifyEmail = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(""); // Clear errors

    setLoading(true); // Show loading state

    try {
      // Call API to verify email and send OTP
      const response = await fetch("/api/generateOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });      
      console.log(response)
      const data = await response.json();

      if (response.ok) {
        // Redirect to ForgetPassPage with email in query
        router.push(`/pages/forgetpass?email=${encodeURIComponent(email)}`);
      } else {
        setError(data.error || "Failed to verify email.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <main className="bg-[#f3f4f6] h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center">Enter Your Email</h1>
        <form onSubmit={handleVerifyEmail} className="mt-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Loading Spinner */}
          {loading ? (
            <div className="w-full flex justify-center mt-4">
              <div className="w-8 h-8 border-4 border-t-4 border-indigo-600 border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="mt-4 w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
            >
              Verify Email
            </button>
          )}
        </form>
      </div>
    </main>
  );
}
