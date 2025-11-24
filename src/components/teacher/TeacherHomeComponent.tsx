"use client";

import { ClassroomHeader } from "@/components/classroom/classroom-header";
import { ClassroomStream } from "@/components/classroom/classroom-stream";
import { ClassroomSidebar } from "@/components/classroom/classroom-sidebar";
import { ClassworkPage } from "@/components/classroom/classwork-page";
import { PeoplePage } from "@/components/classroom/people-page";
import { GradesPage } from "@/components/classroom/grades-page";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/user/userRoleSlice";

export default function TeacherHomeComponent() {
  const dispatch = useAppDispatch();
  const { data: UserData, isLoading: UserLoading } = useAppSelector(
    (state) => state.userInfo
  );
  const logoutFun = () => {
    dispatch(logout());
  };
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const activeTab = searchParams.get("activeTab") || "stream";
  const [userRole, setUserRole] = useState<"student" | "teacher">("student");
  // const userRole = data?.role;

  return (
    <div className="min-h-screen bg-background">
      {/* Role Switcher - Demo purposes */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <span className="text-xs text-muted-foreground">
            Demo Mode: Switch between views
          </span>
          <div className="flex gap-2">
            <Button
              variant={userRole === "student" ? "default" : "outline"}
              size="sm"
              onClick={() => setUserRole("student")}
            >
              Student View
            </Button>
            <Button
              variant={userRole === "teacher" ? "default" : "outline"}
              size="sm"
              onClick={() => setUserRole("teacher")}
            >
              Teacher View
            </Button>
            <Button
              variant={userRole === "teacher" ? "default" : "outline"}
              size="sm"
              onClick={() => logoutFun()}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <ClassroomHeader userRole={userRole} />
      <div className="container mx-auto px-4 py-6">
        {activeTab === "stream" && (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <ClassroomStream userRole={userRole} />
            <ClassroomSidebar userRole={userRole} />
          </div>
        )}
        {activeTab === "classwork" && <ClassworkPage userRole={userRole} />}
        {activeTab === "people" && <PeoplePage userRole={userRole} />}
        {activeTab === "grades" && <GradesPage userRole={userRole} />}
      </div>
    </div>
  );
}
