"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AuthService } from "@/utils/local-storage";
import { setUserRole, UserState } from "@/redux/features/user/userRoleSlice";
import { Spin } from "antd";
import { authKey } from "@/constants/storageKey";

export default function Layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { data, isLoading } = useAppSelector((state) => state.userInfo);

  const token = searchParams.get("ct");

  useEffect(() => {
    const authService = new AuthService();

    // Save token from URL
    if (token) {
      authService.setToken(authKey, token);
    }

    const user = authService.getDecodedUser<UserState>();

    // No user → logout → redirect
    if (!user) {
      dispatch(
        setUserRole({
          isError: true,
          isLoading: false,
          errorMessage: "User not found",
        })
      );

      authService.logout();
      router.replace("/login");
      return;
    }

    // Set user
    dispatch(
      setUserRole({
        data: user,
        isLoading: false,
      })
    );

    // Remove ct from URL (history-safe)
    if (token) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("ct");

      const cleanUrl = `${pathname}/${
        user.role
      }?${newParams.toString()}`.replace(/\?$/, "");

      window.history.replaceState(null, "", cleanUrl);
    }
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" spinning />
      </div>
    );
  }

  return <>{children}</>;
}

// import React from "react";

// export default function layout({ children }: { children: React.ReactNode }) {
//   return <div>{children}</div>;
// }
