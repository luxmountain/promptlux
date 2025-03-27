import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user.uid, // Sử dụng uid thay vì id
          name: user.username,
          email: user.email,
          image: user.avatar_image,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              first_name: profile.name.split(" ")[0],
              last_name: profile.name.split(" ").slice(1).join(" "),
              avatar_image: user.image,
              username: profile.login,
              password: "", // Tài khoản GitHub không có password
            },
          });
        }
      }
      return true;
    },
    async session({ session }) {
      if (!session.user?.email) return session;
    
      try {
        // Fetch the user from the database based on the email
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
        });
    
        if (user) {
          session.user.uid = user.uid; // Add the UID to the session
          session.user.name = user.username; // Override the name with the username
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
