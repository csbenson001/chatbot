import type { NextAuthConfig } from "next-auth";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Use secure cookies when running on Vercel (v0 preview) or in production
// VERCEL=1 is set in .env.development.local for the v0 preview environment
// This ensures cookies work over HTTPS even when NODE_ENV=development
const useSecureCookies = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

console.log("[v0] auth.config - useSecureCookies:", useSecureCookies, "VERCEL:", process.env.VERCEL);

export const authConfig = {
  basePath: "/api/auth",
  trustHost: true,
  useSecureCookies,
  pages: {
    signIn: `${base}/login`,
    newUser: `${base}/`,
  },
  providers: [],
  callbacks: {},
} satisfies NextAuthConfig;
