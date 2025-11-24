/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HomeOutlined,
  BorderOuterOutlined,
  UserOutlined,
} from "@ant-design/icons";

import type { MenuProps } from "antd";
import Link from "next/link";
import { MdAssignment } from "react-icons/md";
import { USER_ROLE } from "./role";

export const dashboardItems = (
  role: keyof typeof USER_ROLE,
  setCollapsed?: any
) => {
  const safeRole = role === USER_ROLE.seller ? USER_ROLE.teacher : role;

  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: (
        <Link onClick={() => setCollapsed?.(false)} href="/dashboard">
          Dashboard
        </Link>
      ),
      key: "/dashboard",
      icon: <HomeOutlined />,
    },
  ];

  const studentSidebar: MenuProps["items"] = [...defaultSidebarItems];

  const sellerSidebar: MenuProps["items"] = [
    ...defaultSidebarItems,

    {
      label: (
        <Link
          onClick={() => setCollapsed?.(false)}
          href={`/${safeRole}/assignment-submission`}
        >
          Student Assignment
        </Link>
      ),
      icon: <MdAssignment />,
      key: `/${safeRole}/assignment-submission`,
    },

    {
      label: "Students",
      key: "students",
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <Link
              onClick={() => setCollapsed?.(false)}
              href={`/${safeRole}/students`}
            >
              Students List
            </Link>
          ),
          key: `/${safeRole}/students`,
        },
      ],
    },

    {
      label: (
        <Link
          onClick={() => setCollapsed?.(false)}
          href={`/${safeRole}/support`}
        >
          Support and Help
        </Link>
      ),
      icon: <BorderOuterOutlined />,
      key: `/${safeRole}/support`,
    },
  ];

  if (role === USER_ROLE.student) return studentSidebar;
  if (role === USER_ROLE.seller) return sellerSidebar;
};
