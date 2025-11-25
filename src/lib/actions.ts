"use server";

import { cookies } from "next/headers";

export async function createSession(token: string) {
  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function clearSession() {
  (await cookies()).delete("session");
}
