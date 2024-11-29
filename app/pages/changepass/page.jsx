"use client";
import Image from "next/image"; // Import the Image component
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for page navigation

export default function NewPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // State to manage error messages
  const [loading, setLoading] = useState(false); // State to manage loading
  const router = useRouter(); // Next.js router for navigation

  // Handle change in new password field
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  // Handle change in confirm password field
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // You can add more password validation (length, complexity) if needed
    if (newPassword.length < 8) {
      setError("Password should be at least 8 characters.");
      return;
    }

    setError(""); // Clear any previous error messages
    setLoading(true); // Start loading when resetting the password

    // Simulate password reset process (replace with actual API call)
    setTimeout(() => {
      setLoading(false); // Stop loading
      alert("Password successfully updated!"); // Show success message
      router.push("/pages/login"); // Redirect to the login page after successful reset
    }, 2000); // Simulate a delay of 2 seconds for password reset
  };

  return (
    <main className="bg-[#2f3030] h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 bg-white box-anim md:grid-cols-2">
        {/* Left Section */}
        <div className="bg-black text-white flex items-center justify-center flex-col">
          <div className="my-4 text-center">
            <h1 className="text-3xl font-semibold">Set New Password</h1>
            <p className="mt-2 text-xs text-slate-400">
              Enter your new password and confirm it to reset
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            {/* New Password Input */}
            <div className="my-4">
              <label htmlFor="newPassword" className="text-sm font-medium">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="mt-2 w-full p-3 rounded-full bg-transparent border border-gray-500 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter new password"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="my-4">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="mt-2 w-full p-3 rounded-full bg-transparent border border-gray-500 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Confirm your new password"
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {/* Show loading spinner while resetting password */}
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
                  Reset Password
                </button>
              </>
            )}
          </form>
        </div>

        {/* Right Section (Optional Image) */}
        <div className="relative hidden md:block">
          <Image
            className="object-cover"
            fill={true}
            src="/images/updated.jpg" // Update to your valid image path
            alt="Background"
          />
        </div>
      </div>
    </main>
  );
}
