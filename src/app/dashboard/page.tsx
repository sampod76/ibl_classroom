"use client";
import { UserState } from "@/redux/features/user/userRoleSlice";
import { useAppSelector } from "@/redux/hooks";
import { AuthService } from "@/utils/local-storage";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
  const router = useRouter();
  const { data, isLoading } = useAppSelector((state) => state.userInfo);
  useEffect(() => {
    const authService = new AuthService();
    const user = authService.getDecodedUser<UserState>();

    // If no user found → redirect
    if (!user) {
      authService.logout();
      router.replace("/login");
      return;
    }
    if (user.role) {
      router.replace(`/dashboard/${user.role}`);
    }
  }, []);

  if (isLoading) {
    return <Spin size="large" spinning />;
  }
  return <div>page</div>;
}
