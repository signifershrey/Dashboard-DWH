// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const users = [
//   {
//     id: 1,
//     name: "Admin User",
//     email: "admin@example.com",
//     password: "adminpass",
//     role: "admin",
//   },
//   {
//     id: 2,
//     name: "Regular User",
//     email: "user@example.com",
//     password: "userpass",
//     role: "user",
//   },
// ];

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const user = users.find(
//           (u) =>
//             u.email === credentials.email && u.password === credentials.password
//         );
//         return user || null; // Return user object if found
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role; // Attach role to the token
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.role = token.role; // Attach role to the session
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login", // Redirect to login page
//     error: "/login?error=CredentialsSignIn", // Redirect to login page on error
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });


// // 
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { connectToDatabase } from "../../../lib/mongodb";
// import User from "../../../app/models/User";
// import bcrypt from "bcryptjs";

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         await connectToDatabase(); // Connect to MongoDB

//         const user = await User.findOne({ email: credentials.email });
//         if (user && bcrypt.compareSync(credentials.password, user.password)) {
//           return {
//             id: user._id,
//             email: user.email,
//             role: user.role,
//           };
//         }

//         return null; // Return null if authentication failed
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role; // Add role to the token
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.role = token.role; // Add role to the session
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//     error: "/login?error=CredentialsSignIn",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });


import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../lib/mongodb";
import User from "../../../app/models/User";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase(); // Connect to MongoDB

        const user = await User.findOne({ email: credentials.email });
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            id: user._id,
            email: user.email,
            role: user.role, // Ensure role is passed here
          };
        }

        return null; // Return null if authentication failed
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add role to the token if user is available
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Ensure session user role is set from token
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Redirect to login page
    error: "/login?error=CredentialsSignIn", // Error redirect
    // Optionally, you can add a redirect to a custom page on successful login
    // callbackUrl: "/dashboard"
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Using JWT for session
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  events: {
    async signIn(message) {
      // You can add any custom logic here if needed on signIn event
      console.log("User signed in:", message);
    },
    async redirect({ url, baseUrl }) {
      // Redirect to /dashboard if user is an admin after sign in
      if (url === "/login" && baseUrl !== "/login") {
        return baseUrl + "/dashboard"; // Custom redirection
      }
      return url;
    },
  },
});
