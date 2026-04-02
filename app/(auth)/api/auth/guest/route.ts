import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { signIn } from "@/app/(auth)/auth";

// Use secure cookies when running on Vercel (v0 preview) or in production
const useSecureCookies = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

console.log("[v0] guest route module loaded - useSecureCookies:", useSecureCookies, "VERCEL:", process.env.VERCEL);

export async function GET(request: Request) {
  console.log("[v0] guest GET - useSecureCookies:", useSecureCookies);
  const { searchParams } = new URL(request.url);
  const rawRedirect = searchParams.get("redirectUrl") || "/";
  const redirectUrl =
    rawRedirect.startsWith("/") && !rawRedirect.startsWith("//")
      ? rawRedirect
      : "/";

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: useSecureCookies,
  });

  if (token) {
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    return NextResponse.redirect(new URL(`${base}/`, request.url));
  }

  return signIn("guest", { redirect: true, redirectTo: redirectUrl });
}
