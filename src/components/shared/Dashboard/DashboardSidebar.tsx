"use client";

import React from "react";
import { Layout, Menu } from "antd";
import { dashboardItems } from "@/constants/dashBoardItems";
import { useAppSelector } from "@/redux/hooks";
import { UserState } from "@/redux/features/user/userRoleSlice";

const { Sider } = Layout;

export default function DashboardSidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}) {
  const { data } = useAppSelector((state) => state.userInfo);
  const userInfo = data as UserState;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={250}
      collapsedWidth={70}
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,

        // 🔥 Gray Background
        background: "#f3f4f6", // Tailwind neutral-100 (light gray)
        // background: "#e5e7eb", // More gray option
        // background: "#d1d5db", // darker gray

        borderRight: "1px solid #dcdcdc",
        overflow: "auto",

        borderRadius: "0.375rem",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      {/* Sidebar Header Title */}
      <div
        // className="shadow-md rounded-md shadow-gray-300"
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          paddingLeft: collapsed ? 0 : 16,
          color: "#111", // darker text for light background
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        {collapsed ? "📘" : "Dashboard"}
      </div>

      {/* Menu */}
      <Menu
        theme="light"
        mode="inline"
        style={{
          background: "transparent", // match gray bg
        }}
        items={dashboardItems(userInfo.role, setCollapsed)}
      />
    </Sider>
  );
}
