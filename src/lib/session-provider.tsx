"use client";

import { setUserRole } from "@/redux/features/user/userRoleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TSession } from "@/types/TSession";
import React, { createContext, useContext, useEffect, useState } from "react";
import { signoutSession } from "./auth_server";
import { useRouter } from "next/navigation";

const SessionProvider = ({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: TSession;
}) => {
  const router = useRouter();
  const { isLogout } = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (initialSession?.user?.id) {
      dispatch(
        setUserRole({
          data: {
            role: initialSession?.user?.role,
            email: initialSession?.user?.email,
            name: initialSession?.user?.name,
            id: initialSession?.user?.id,
            roleBaseUserId: initialSession?.user?.roleBaseUserId,
            userId: initialSession?.user?.userId,
            exp: initialSession?.user?.exp,
            iat: initialSession?.user?.iat,
            accessToken: initialSession?.accessToken,
          },
          isLoading: false,
          isError: false,
          isLogout: false,
        })
      );
    }
  }, [initialSession?.accessToken]);
  // useEffect(() => {
  //   if (isLogout) {
  //     (async () => {
  //       await signoutSession();
  //       router.push("/login");
  //     })();
  //   }
  // }, [isLogout]);

  return <>{children}</>;
};

export default SessionProvider;
/* 
"use client";

import { setUserRole } from "@/redux/features/user/userRoleSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TSession } from "@/types/TSession";
import React, { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext<{
  session: TSession | null;
  setSession: (session: TSession) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

const SessionProvider = ({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: TSession;
}) => {
  const [session, setSession] = useState<TSession | null>(initialSession);
  const [isLoading, setIsLoading] = useState<boolean>(!initialSession);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (initialSession?.user?.id) {
      dispatch(
        setUserRole({
          data: {
            role: initialSession?.user?.role,
            email: initialSession?.user?.email,
            name: initialSession?.user?.name,
            id: initialSession?.user?.id,
            roleBaseUserId: initialSession?.user?.roleBaseUserId,
            userId: initialSession?.user?.userId,
            exp: initialSession?.user?.exp,
            iat: initialSession?.user?.iat,
            accessToken: initialSession?.accessToken,
          },
          isLoading: false,
          isError: false,
          isLogout: false,
        })
      );
    }
  }, [initialSession?.accessToken]);

 

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession: (newSession) => {
          setSession(newSession);
        },
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;

*/
