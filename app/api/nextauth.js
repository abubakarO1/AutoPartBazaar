// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import dbConnect from '@/utils/db';
// import User from '@/app/models/User';
// import bcrypt from 'bcryptjs';

// export default NextAuth({
//   session: {
//     strategy: 'jwt', // Use JSON Web Tokens for session management
//   },
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         const { email, password } = credentials;

//         // Connect to the database
//         await dbConnect();

//         // Check if the user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//           throw new Error('User not found');
//         }

//         // Compare the provided password with the stored hashed password
//         const isValidPassword = await bcrypt.compare(password, user.password);
//         if (!isValidPassword) {
//           throw new Error('Invalid credentials');
//         }

//         // Return the user object on successful authentication
//         return { id: user._id, email: user.email, phone: user.phone };
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/auth/signin', // Custom sign-in page
//     error: '/auth/error',   // Error redirect page
//   },
// });

// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import dbConnect from '@/utils/db';
// import User from '@/app/models/User';
// import bcrypt from 'bcryptjs';

// export default NextAuth({
    
//   session: {
//     strategy: 'jwt', // Use JSON Web Tokens for session management
//   },
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         const { email, password } = credentials;

//         // Connect to the database
//         await dbConnect();

//         // Check if the user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//           console.error('Login error: User not found');
//           throw new Error('User not found');
//         }

//         // Compare the provided password with the stored hashed password
//         const isValidPassword = await bcrypt.compare(password, user.password);
//         if (!isValidPassword) {
//           console.error('Login error: Invalid credentials');
//           throw new Error('Invalid credentials');
//         }

//         // Return the user object on successful authentication
//         return { id: user._id, email: user.email, phone: user.phone, name: user.name };
//       },
//     }
// ),
//   ],
//   pages: {
//     signIn: '/auth/signin', // Custom sign-in page
//     error: '/auth/error',   // Error redirect page
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//         token.phone = user.phone;
//         token.name = user.name;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id;
//       session.user.email = token.email;
//       session.user.phone = token.phone;
//       session.user.name = token.name;  // Ensure user.name is also set
//       return session;
//     },
//   },
  
//   secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your .env file
// });
