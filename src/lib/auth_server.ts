/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { cookies } from "next/headers";

export async function signoutSession() {
  (await cookies()).delete("session");
}
