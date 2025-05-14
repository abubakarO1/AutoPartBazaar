import dbConnect from '@/utils/db';
import User from '@/app/models/User';
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const ADMIN_EMAIL = "AutoPartBazaar21@gmail.com"; // Replace with your specific admin email

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await dbConnect();
          const user = await User.findOne({ email });

          // If user doesn't exist, return null
          if (!user) {
            return null;
          }

          // Check if password matches
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            return null;
          }

          // Assign role based on email
          const role = email === ADMIN_EMAIL ? "admin" : "user";

          // Return user with role
          return {
            id: user._id,
            email: user.email,
            role: role, // Set role as admin for the specific email, else user
          };
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/pages/home", // SignIn page
    error: '/pages/error',  // Customize error page if needed
  },
  callbacks: {
    // Store role in the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Add role to the JWT token
      }
      return token;
    },
    // Include role in the session object
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role; // Add role to session
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
