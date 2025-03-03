'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Eye icon imports
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Manage password visibility
  
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === 'AutoPartBazaar21@gmail.com') {
      // Redirect to the special login page
      router.push('/pages/admindashboard');
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("/pages/home");
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle the password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the state value
  };

  return (
    <main className="bg-black h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 bg-white box-anim md:grid-cols-2">
        <div className="bg-black text-white flex items-center justify-center flex-col">
          <div className="my-4">
            <h1 className="text-3xl font-semibold">Login</h1>
            <p className="mt-2 text-xs text-slate-400">
              Log in to customize your ride and explore premium car parts
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="email">Email*</Label>
            <Input
              className="mt-2 mb-4 bg-transparent rounded-full"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Label htmlFor="password">Password*</Label>
            <div className="relative">
              <Input
                className="mt-2 mb-4 bg-transparent rounded-full pr-10" // Add padding to the right for the icon
                type={showPassword ? 'text' : 'password'} // Conditionally change the type based on visibility state
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility} // Toggle visibility on button click
                className="absolute top-1/2 right-3 transform -translate-y-1/2" // Position the eye icon inside the input field
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} className="text-gray-500" />
                ) : (
                  <AiFillEye size={20} className="text-gray-500" />
                )}
              </button>
            </div>

            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              className="w-full mt-6 bg-indigo-600 rounded-full hover:bg-indigo-700"
            >
              Login
            </Button>
          </form>
          <p className="text-xs text-slate-200">
            Don't have an account?{' '}
            <a
              href="/pages/signup"
              className="text-blue-500 hover:text-indigo-600 underline"
            >
              Sign up
            </a>
          </p>
          <p className="text-xs text-slate-200">
            <a
              href="/pages/EnterEmail"
              className="text-blue-500 hover:text-indigo-600 underline"
            >
              Forget password
            </a>
          </p>
        </div>
        <div className="relative hidden md:block">
          <Image
            className="object-cover"
            fill={true}
            src="/images/updated.jpg"
            alt="bg-image"
          />
        </div>
      </div>
    </main>
  );
}
