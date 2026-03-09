import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { createToken, setAuthCookie } from "@/lib/auth";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email) {
        throw new Error("No profile email");
      }

      const user = await prisma.user.upsert({
        where: {
          email: profile.email,
        },
        update: {
          name: profile.name || "",
        },
        create: {
          email: profile.email,
          name: profile.name || "",
          // Dummy password for Google accounts; they don't use email/password login
          password: "",
        },
      });

      const token = await createToken({
        userId: user.id,
        email: user.email,
      });

      await setAuthCookie(token);

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

