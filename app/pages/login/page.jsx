// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { FcGoogle } from 'react-icons/fc';
// import Image from 'next/image';
// export default function Home() {

//   return (
//     <main className="bg-black h-screen flex items-center justify-center p-10">
//       <div className="grid w-full h-full grid-cols-1 bg-white box-anim md:grid-cols-2">
//         <div className="bg-black text-white flex items-center justify-center flex-col  ">
//           <div className="my-4">
//             <h1 className="text-3xl font-semibold  ">Login</h1>
//             <p className="mt-2 text-xs text-slate-400">
//             Log in to customize your ride and explore premium car parts
//             </p>
//           </div>
//           <form>
            
//             <Label htmlFor="email">Email*</Label>
//             <Input
//               className="mt-2 mb-4 bg-transparent rounded-full"
//               type="email"
//               id="email"
//               placeholder="Email"
//             />
//             <Label htmlFor="password">Password*</Label>
//             <Input
//               className="mt-2 bg-transparent rounded-full"
//               type="password"
//               id="password"
//               placeholder="password"
//             />

//             <Button
//               type="submit"
//               className="w-full mt-6 bg-indigo-600 rounded-full hover:bg-indigo-700"
//             >
//               Login
//             </Button>
//             <Button
//               className="flex items-center w-full gap-4 px-12 mb-4 bg-transparent rounded-full mt-5"
//               variant="outline"
//             >
//               {' '}
//               <FcGoogle size="25" />
//               Sign In With Google
//             </Button>
//           </form>
//           <p className=" text-xs text-slate-200">
//           Don't have an account? <a href="/pages/signup" className="text-blue-500 hover:text-indigo-600 underline">Sign up</a>
//           </p>
//           <p className=" text-xs text-slate-200">
//             <a href="/pages/forgetpass" className="text-blue-500 hover:text-indigo-600 underline">Forget password</a>
//           </p>
//         </div>
//         <div className="relative hidden md:block">
//           <Image
//             className="object-cover "
//             fill={true}
//             src="/images/updated.jpg"
//             alt="bg-image"
//           />
//         </div>
//       </div>
//     </main>
//   );
// }
'use client';

import { useState } from 'react';
import  {useRouter}  from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';

// export default function Home() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   // Call the next-auth `signIn` function
  //   const result = await signIn('credentials', {
  //     redirect: false,
  //     email,
  //     password,
  //   });
  
  //   // Check for errors
  //   if (result?.error) {
  //     setError(result.error);  // Show the error
  //     console.error('Login error:', result.error);  // Log error to console
  //   } else {
  //     if (result?.ok) {
  //       // Redirect to home page on success
  //       router.push('/');
  //     }
  //   }
  // };
  
  export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
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
            <Input
              className="mt-2 bg-transparent rounded-full"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              className="w-full mt-6 bg-indigo-600 rounded-full hover:bg-indigo-700"
            >
              Login
            </Button>
            <Button
              className="flex items-center w-full gap-4 px-12 mb-4 bg-transparent rounded-full mt-5"
              variant="outline"
              onClick={() => signIn('google')}
            >
              <FcGoogle size="25" />
              Sign In With Google
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
