'use client';
import { useRouter } from 'next/router';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

    if (password !== repassword) {
      setError('Passwords do not match.');
      return;
    }

    try {

      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

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

// export default function RegisterForm() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password) {
//       setError("All fields are necessary.");
//       return;
//     }

//     try {
//       const resUserExists = await fetch("api/userExists", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       const { user } = await resUserExists.json();

//       if (user) {
//         setError("User already exists.");
//         return;
//       }

//       const res = await fetch("api/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//         }),
//       });

//       if (res.ok) {
//         const form = e.target;
//         form.reset();
//         router.push("/");
//       } else {
//         console.log("User registration failed.");
//       }
//     } catch (error) {
//       console.log("Error during registration: ", error);
//     }
//   };

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
            <Input
              className="mt-1 mb-2 bg-transparent rounded-full"
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <Label htmlFor="repassword">Re-enter Password*</Label>
            <Input
              className="mt-1 mb-2 bg-transparent rounded-full"
              type="password"
              id="repassword"
              placeholder="Re-enter password"
              value={formData.repassword}
              onChange={handleChange}
            />

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
