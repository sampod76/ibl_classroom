/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Layout, Drawer, Menu, Spin } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

import { dashboardItems } from "@/constants/dashBoardItems";
import { useAppSelector } from "@/redux/hooks";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNavBar from "./DashboardNavbar";
import { UserState } from "@/redux/features/user/userRoleSlice";
import { LoadingSkeleton } from "@/components/ui/skeleton";

const { Content } = Layout;

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading } = useAppSelector((state) => state.userInfo);

  const screens = useBreakpoint();

  const [collapsed, setCollapsed] = useState(false);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const userInfo = data as UserState;

  const sidebarWidth = collapsed ? 70 : 250;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Mobile: Drawer */}
      {!screens.sm ? (
        <Drawer
          size="large"
          title={<h2 className="text-white">{userInfo?.role} Dashboard</h2>}
          placement="left"
          open={collapsed}
          onClose={() => setCollapsed(false)}
          closeIcon={<CloseOutlined className="text-white" />}
          styles={{ body: { padding: 0 } }}
        >
          <Menu
            theme="light"
            mode="inline"
            items={dashboardItems(userInfo?.role as any, setCollapsed)}
          />
        </Drawer>
      ) : (
        <DashboardSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      )}

      {/* MAIN LAYOUT */}
      <Layout
        style={{
          marginLeft: screens.sm ? sidebarWidth : 0, // SHIFT CONTENT
          transition: "all 0.3s",
        }}
      >
        <DashboardNavBar collapsed={collapsed} setCollapsed={setCollapsed} />

        <Content style={{ padding: 24 }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
