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
  role?: keyof typeof USER_ROLE,
  setCollapsed?: any
) => {
  const safeRole = role === USER_ROLE.seller ? USER_ROLE.teacher : role;

  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: (
        <Link
          onClick={() => setCollapsed?.(false)}
          href={`/dashboard/${safeRole}`}
        >
          Dashboard
        </Link>
      ),
      key: "/dashboard",
      icon: <HomeOutlined />,
    },
    {
      label: (
        <Link
          onClick={() => setCollapsed?.(false)}
          href={`/dashboard/${safeRole}/classroom`}
        >
          Classroom
        </Link>
      ),
      key: "/classroom",
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
  const adminSidebar: MenuProps["items"] = [...sellerSidebar];

  adminSidebar.splice(
    2,
    0, // deleteCount = 0 → কিছু রিমুভ হবে না
    {
      label: "User List",
      key: "user",
      icon: <UserOutlined />,
      children: [
        {
          label: "Teacher",
          key: "Teacher",
          icon: <UserOutlined />,
          children: [
            {
              label: (
                <Link
                  onClick={() => setCollapsed?.(false)}
                  href={`/dashboard/${safeRole}/teacher-list`}
                >
                  Teacher List
                </Link>
              ),
              key: `/dashboard/${safeRole}/teacher-list`,
            },
          ],
        },
        {
          label: "Student",
          key: "student",
          icon: <UserOutlined />,
          children: [
            {
              label: (
                <Link
                  onClick={() => setCollapsed?.(false)}
                  href={`/dashboard/${safeRole}/student-list`}
                >
                  Student List
                </Link>
              ),
              key: `/dashboard/${safeRole}/student-list`,
            },
          ],
        },
      ],
    }
  );

  if (role === USER_ROLE.student) return studentSidebar;
  if (role === USER_ROLE.seller) return sellerSidebar;
  if (role === USER_ROLE.admin) return adminSidebar;
};
