"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AuthService } from "@/utils/local-storage";
import { authKey } from "@/constants/storageKey";
import { getSession } from "@/lib/session";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const redirectUser = async () => {
      const { user } = await getSession();

      if (user?.role) {
        const role = user.role === "seller" ? "teacher" : user.role;

        router.replace(`/dashboard/${role}`);
      } else {
        router.replace("/login");
      }
    };

    redirectUser();
  }, [router]);

  return null;
}
