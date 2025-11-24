"use client";

import DashboardLayoutClient from "@/components/shared/Dashboard/DashboardLayoutClient";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
