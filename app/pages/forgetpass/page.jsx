"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function ForgetPass() {
  const [otp, setOtp] = useState(new Array(4).fill("")); // OTP state
  const inputRefs = useRef([]); // References for inputs
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // Retrieve email from query params

  // Handle OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically move to the next input
      if (value && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle backspace key for OTP input
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // Handle form submission to verify OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.some((digit) => digit === "")) {
      setError("Please enter the complete OTP.");
      return;
    }

    setError(""); // Clear previous error
    setLoading(true); // Start loading

    try {
      const response = await fetch("/api/verifyOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: otp.join("") }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoading(false); // Stop loading
        router.push(`/pages/changepass?email=${email}`); // Redirect to password change page with email
      } else {
        setLoading(false); // Stop loading
        setError(data.error || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setLoading(false); // Stop loading
      setError("An error occurred while verifying the OTP.");
    }
  };

  // Handle resend OTP request
  const handleResend = async () => {
    setResendMessage(""); // Clear any previous messages
    setError(""); // Clear error
    setOtp(new Array(4).fill("")); // Clear OTP inputs

    try {
      const response = await fetch("/api/resendOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setResendMessage("A new OTP has been sent to your email.");
      } else {
        setError(data.error || "Failed to resend OTP. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while resending the OTP.");
    }
  };

  return (
    <main className="bg-[#2f3030] h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 bg-white box-anim md:grid-cols-2">
        {/* Left Section */}
        <div className="bg-black text-white flex items-center justify-center flex-col">
          <div className="my-4 text-center">
            <h1 className="text-3xl font-semibold">OTP Verification</h1>
            <p className="mt-2 text-xs text-slate-400">
              Enter the 4-digit code sent to <span className="font-bold">{email}</span>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center space-x-2 my-4">
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-12 h-12 text-center border rounded-full bg-transparent text-white border-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg"
                />
              ))}
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {/* Resend Message */}
            {resendMessage && <p className="text-green-500 text-sm mt-2">{resendMessage}</p>}

            {/* Loading Spinner */}
            {loading ? (
              <div className="w-full flex justify-center mt-4">
                <div className="w-8 h-8 border-4 border-t-4 border-indigo-600 border-solid rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                <button
                  type="submit"
                  className="w-full mt-6 bg-indigo-600 rounded-full py-2 text-white font-medium hover:bg-indigo-700"
                >
                  Verify OTP
                </button>
                <button
                  type="button"
                  onClick={handleResend}
                  className="w-full mt-4 py-2 text-indigo-600 bg-transparent border border-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white"
                >
                  Resend OTP
                </button>
              </>
            )}
          </form>
        </div>

        {/* Right Section */}
        <div className="relative hidden md:block">
          <Image
            className="object-cover"
            fill={true}
            src="/images/updated.jpg" // Ensure this path points to a valid image
            alt="Background"
          />
        </div>
      </div>
    </main>
  );
}
