import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;
        const { email, password } = parsedCredentials.data;
        console.log("Parsed credentials:", { email, password });

        const user = await prisma.user.findUnique({
          where: { email: email.toLocaleLowerCase() },
        });
        if (!user) return null;

        if (!bcrypt.compareSync(password, user.password)) return null;

        const { password: _, ...rest } = user;
        console.log(rest);
        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth } = NextAuth(authConfig);
