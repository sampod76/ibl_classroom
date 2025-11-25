import { decrypt } from "@/lib/session";
import { SessionUser } from "@/types";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const roleBasedAccess: { [key: string]: string[] } = {
  "/dashboard/teacher": ["teacher"],
  "/dashboard/student": ["student"],
};

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // --------------------------------------
  // 1. Receive ct token from query (?ct=)
  // --------------------------------------
  const ct = searchParams.get("ct");
  console.log("🚀 ~ middleware ~ ct:", ct);

  if (ct) {
    // Save cookie
    (await cookies()).set("session", ct, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      expires: new Date(Date.now() + 99999 * 60 * 60 * 1000),
    });

    // Optional: remove ct from URL for clean redirect
    const cleanUrl = new URL(req.url);
    cleanUrl.searchParams.delete("ct");

    return NextResponse.redirect(cleanUrl);
  }

  // --------------------------------------
  // 2. Read existing cookie
  // --------------------------------------
  const cookie = req.cookies.get("session")?.value;
  let session: SessionUser | null = null;

  if (cookie) {
    try {
      session = await decrypt(cookie);
      console.log("🚀 ~ middleware ~ session:", session);
    } catch (err) {
      console.log("❌ Token decode failed:", err);
    }
  }

  // --------------------------------------
  // 3. Public route: /auth/*
  // --------------------------------------
  if (!session?.id) {
    if (pathname.startsWith("/auth")) {
      return NextResponse.next();
    }

    return NextResponse.redirect(
      new URL(`/login?type=signin&redirect=${pathname}`, req.url)
    );
  }

  // If logged-in user enters /auth → redirect home
  if (session?.id && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  console.log("🚀 ~ middleware ~ session:", session);
  if (session?.id && pathname === "/dashboard") {
    return NextResponse.redirect(
      new URL(
        `/dashboard/${session.role === "seller" ? "teacher" : session.role}`,
        req.url
      )
    );
  }

  // --------------------------------------
  // 4. Role-based access control
  // --------------------------------------
  const restricted = Object.keys(roleBasedAccess).find((route) =>
    pathname.startsWith(route)
  );

  if (restricted) {
    const allowedRoles = roleBasedAccess[restricted];
    const role = session.role === "seller" ? "teacher" : session.role;
    if (!allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // --------------------------------------
  // 5. Allow route
  // --------------------------------------
  return NextResponse.next();
}

// ------------------------------------------
// ⭐ FIXED MATCHER — now /dashboard works ⭐
// ------------------------------------------
export const config = {
  matcher: [
    "/dashboard", // <-- IMPORTANT, REQUIRED
    "/dashboard/:path*", // sub paths
    "/auth/:path*", // public auth routes
  ],
};
