import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { signIn } from "@/app/(auth)/auth";
import { isDevelopmentEnvironment } from "@/lib/constants";

export async function GET(request: Request) {
  console.log("[v0] Guest auth route called");
  const { searchParams } = new URL(request.url);
  const rawRedirect = searchParams.get("redirectUrl") || "/";
  const redirectUrl =
    rawRedirect.startsWith("/") && !rawRedirect.startsWith("//")
      ? rawRedirect
      : "/";

  console.log("[v0] Guest auth - redirectUrl:", redirectUrl);

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: !isDevelopmentEnvironment,
  });

  console.log("[v0] Guest auth - existing token:", token ? "exists" : "null");

  if (token) {
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    console.log("[v0] Guest auth - already has token, redirecting to home");
    return NextResponse.redirect(new URL(`${base}/`, request.url));
  }

  console.log("[v0] Guest auth - signing in as guest");
  return signIn("guest", { redirect: true, redirectTo: redirectUrl });
}
