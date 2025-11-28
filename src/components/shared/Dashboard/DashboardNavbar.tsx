"use client";
import React from "react";
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { signoutSession } from "@/lib/auth_server";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/features/user/userRoleSlice";

const { Header } = Layout;

const DashboardNavBar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const logoutFun = async () => {
    await signoutSession();
    dispatch(logout());
    router.push("/login");
  };
  return (
    <Header
      style={{
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingInline: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
      className="flex justify-between items-center"
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{ fontSize: 18 }}
      />
      <Button
        type="primary"
        onClick={logoutFun}
        style={{ fontSize: 16, fontWeight: "bold" }}
      >
        Logout
      </Button>
    </Header>
  );
};

export default DashboardNavBar;
