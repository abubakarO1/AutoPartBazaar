'use client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Eye icons
import Image from 'next/image';

export default function Home() {
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    email: '',
    password: '',
    repassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [showRePassword, setShowRePassword] = useState(false); // Toggle for repassword visibility

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { fullname, phone, email, password, repassword } = formData;

    // Validation
    if (!fullname || !phone || !email || !password || !repassword) {
      setError('All fields are required.');
      return;
    }

    // **Step 1**: Check if passwords match
    if (password !== repassword) {
      setError('Passwords do not match.');
      return;
    }

    // **Step 2**: Password strength validation (only if passwords match)
    const passwordStrengthRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!passwordStrengthRegex.test(password)) {
      setError('Password must contain at least one uppercase letter, one number, and one special character.');
      return;
    }

    // **Step 3**: Phone number validation (exactly 11 digits, no country code)
    const phoneValidationRegex = /^\d{11}$/;
    if (!phoneValidationRegex.test(phone)) {
      setError('Phone number must be exactly 11 digits.');
      return;
    }

    try {
      // Check if user already exists
      const resUserExists = await fetch('/api/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError('User already exists.');
        return;
      }

      // Submit the signup data
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullname, phone, email, password }),
      });

      if (response.ok) {
        setSuccess('Signup successful! Please log in.');
        setFormData({ fullname: '', phone: '', email: '', password: '', repassword: '' });
      } else {
        const data = await response.json();
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Failed to connect to the server. Please try again later.');
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleRePasswordVisibility = () => setShowRePassword((prev) => !prev);

  return (
    <main className="bg-black h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 bg-black box-anim md:grid-cols-2">
        <div className="bg-black text-white flex items-center justify-center flex-col mr-20">
          <div className="my-4">
            <h1 className="text-3xl font-semibold">Sign Up</h1>
            <p className="mt-2 text-xs text-slate-400">
              Register yourself for an amazing experience!
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

            <Label htmlFor="fullname">Full Name*</Label>
            <Input
              className="mt-1 mb-2 bg-transparent rounded-full"
              type="text"
              id="fullname"
              placeholder="Enter your name"
              value={formData.fullname}
              onChange={handleChange}
            />

            <Label htmlFor="phone">Phone Number*</Label>
            <Input
              className="mt-1 mb-2 bg-transparent rounded-full"
              type="tel"
              id="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />

            <Label htmlFor="email">Email*</Label>
            <Input
              className="mt-1 mb-2 bg-transparent rounded-full"
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <Label htmlFor="password">Password*</Label>
            <div className="relative">
              <Input
                className="mt-1 mb-2 bg-transparent rounded-full pr-10"
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} className="text-gray-500" />
                ) : (
                  <AiFillEye size={20} className="text-gray-500" />
                )}
              </button>
            </div>

            <Label htmlFor="repassword">Re-enter Password*</Label>
            <div className="relative">
              <Input
                className="mt-1 mb-2 bg-transparent rounded-full pr-10"
                type={showRePassword ? 'text' : 'password'}
                id="repassword"
                placeholder="Re-enter password"
                value={formData.repassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={toggleRePasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
              >
                {showRePassword ? (
                  <AiFillEyeInvisible size={20} className="text-gray-500" />
                ) : (
                  <AiFillEye size={20} className="text-gray-500" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full mt-6 bg-indigo-600 rounded-full hover:bg-indigo-700"
            >
              Sign up
            </Button>
          </form>
          <p className="mt-4 text-xs text-slate-200">
            Already have an account?{' '}
            <a
              href="/pages/login"
              className="text-blue-500 hover:text-indigo-600 underline"
            >
              login
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
