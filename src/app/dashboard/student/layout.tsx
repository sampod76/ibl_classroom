"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthService } from "@/utils/local-storage";
import { Spin } from "antd";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = new AuthService();
    const user = auth.getDecodedUser<any>();

    if (!user || user.role !== "student") {
      auth.logout(); // remove token
      router.replace("/login");
      return;
    }

    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" spinning />
      </div>
    );

  return <>{children}</>;
}
