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

function getNameFromEmail(email?: string | null): string | null {
  if (!email) return null;
  const localPart = email.split("@")[0]?.trim();
  if (!localPart) return null;
  return localPart;
}

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

      const email = profile.email;
      const existing = await prisma.user.findUnique({
        where: { email },
        select: { name: true },
      });

      const existingName = existing?.name?.trim();
      const derivedName = getNameFromEmail(email);
      const resolvedName =
        existingName && existingName.length > 0
          ? existingName
          : derivedName || profile.name || "";

      await prisma.user.upsert({
        where: { email },
        update: { name: resolvedName },
        create: {
          email,
          name: resolvedName,
          password: "", // Google users have no local password
        },
      });

      return true;
    },

    // Persist the user's DB id and email into the JWT
    async jwt({ token, profile }) {
      if (profile?.email) {
        const user = await prisma.user.findUnique({
          where: { email: profile.email },
          select: { id: true, email: true, name: true },
        });
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
        }
      }
      return token;
    },

    // Expose id and email on the client-side session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
};