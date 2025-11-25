"use server";

import { USER_ROLE } from "@/constants/role";
import { SessionUser, TSession } from "@/types/TSession";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import "server-only";

export async function decrypt(session: string | undefined = "") {
  try {
    if (!session) {
      throw new Error("No session token provided");
    }
    const payload = jwtDecode<SessionUser>(session);
    // ম্যানুয়ালি টোকেনের মেয়াদ চেক করা
    if (payload.exp * 1000 < Date.now()) {
      throw new Error("Session token expired");
    }
    return payload;
  } catch (error) {
    console.log("Failed to decode session:", error);
    return null;
  }
}

export async function getSession(): Promise<TSession> {
  const cookie = (await cookies()).get("session")?.value;
  if (cookie) {
    const session = await decrypt(cookie);

    if (session?.userId) {
      return {
        isAuth: true,
        accessToken: cookie,
        user: {
          userId: session.userId,
          roleBaseUserId: session.roleBaseUserId,
          email: session.email,
          role: session.role,
          name: "",
          id: session.id,
          exp: 0,
          iat: 0,
        },
      };
    }
  }

  return { isAuth: false, user: null, accessToken: "" };
}
