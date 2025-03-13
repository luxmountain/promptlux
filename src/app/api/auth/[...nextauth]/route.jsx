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
          select: {
            uid: true,
            email: true,
            first_name: true,
            last_name: true,
            avatar_image: true,
            password: true,
          },
        });
      
        if (!user) {
          throw new Error("User not found");
        }
      
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
      
        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }
      
        // Đảm bảo first_name và last_name không bị undefined/null
        const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ") || "No Name";
      
        return {
          id: user.uid.toString(), // NextAuth yêu cầu ID là string
          name: fullName, // Đã xử lý lỗi nếu thiếu tên
          email: user.email,
          image: user.avatar_image || "/default-avatar.png", // Đảm bảo luôn có ảnh mặc định
        };
      }      
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
