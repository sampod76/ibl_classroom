"use client";
import { UserState } from "@/redux/features/user/userRoleSlice";
import { useAppSelector } from "@/redux/hooks";
import { AuthService } from "@/utils/local-storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  return router.replace("/dashboard");
}
