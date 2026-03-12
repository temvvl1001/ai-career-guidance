import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const isGoogleClientIdValid =
  typeof googleClientId === "string" &&
  /^[0-9]+-[a-z0-9-]+\.apps\.googleusercontent\.com$/.test(googleClientId);
const isGoogleClientSecretValid =
  typeof googleClientSecret === "string" &&
  /^GOCSPX-/.test(googleClientSecret);
const hasGoogleOAuth = isGoogleClientIdValid && isGoogleClientSecretValid;

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: hasGoogleOAuth
    ? [
        GoogleProvider({
          clientId: googleClientId!,
          clientSecret: googleClientSecret!,
        }),
      ]
    : [],
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email) {
        throw new Error("No profile email");
      }

      await prisma.user.upsert({
        where: {
          email: profile.email,
        },
        update: {
          name: profile.name || "",
        },
        create: {
          email: profile.email,
          name: profile.name || "",
          // Google users don't log in with local password.
          password: "",
        },
      });

      return true;
    },
  },
};
