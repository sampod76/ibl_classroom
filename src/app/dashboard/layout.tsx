"use client";

import DashboardLayoutClient from "@/components/shared/Dashboard/DashboardLayoutClient";
import { authKey } from "@/constants/storageKey";
import { getSession } from "@/lib/session";
import { setUserRole } from "@/redux/features/user/userRoleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AuthService } from "@/utils/local-storage";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  // console.log("🚀 ~ SessionProvider ~ initialSession:", initialSession);

  const { data, isLoading, isLogout } = useAppSelector(
    (state) => state.userInfo
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      const session = await getSession();

      if (session?.user) {
        const newAuthService = new AuthService();
        dispatch(
          setUserRole({
            data: {
              role: session?.user?.role,
              email: session?.user?.email,
              name: session?.user?.name,
              id: session?.user?.id,
              roleBaseUserId: session?.user?.roleBaseUserId,
              userId: session?.user?.userId,
              exp: session?.user?.exp,
              iat: session?.user?.iat,
              accessToken: session?.accessToken,
            },
            isLoading: false,
            isError: false,
            isLogout: false,
          })
        );
        newAuthService.setToken(authKey, session?.accessToken);
      }
    })();
  }, [data?.id]);
  // useEffect(() => {
  //   if (isLogout) {
  //     (async () => {
  //       await signoutSession();
  //       router.push("/login");
  //     })();
  //   }
  // }, [isLogout]);
  if (isLoading) {
    return <Spin></Spin>;
  }

  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
