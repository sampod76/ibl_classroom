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
import { signoutSession } from "@/lib/auth_server";
import { LoadingSkeleton } from "../ui/skeleton";

export default function TeacherHomeComponent({
  classRoomId,
}: {
  classRoomId: string;
}) {
  const dispatch = useAppDispatch();
  const { data: UserData, isLoading: UserLoading } = useAppSelector(
    (state) => state.userInfo
  );
  const logoutFun = async () => {
    await signoutSession();
    dispatch(logout());
    router.push("/login");
  };
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const activeTab = searchParams.get("activeTab") || "stream";
  // const [userRole, setUserRole] = useState<"student" | "teacher">();
  // const userRole = data?.role;
  if (UserLoading || !UserData?.role) {
    return <LoadingSkeleton />;
  }

  const userRole = UserData?.role == "seller" ? "teacher" : UserData?.role;
  return (
    <div className="min-h-screen bg-background">
      {/* Role Switcher - Demo purposes */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex gap-2">
            <Button
              variant={userRole === "student" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                // setUserRole("student");
                router.push(
                  `/dashboard?ct=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbXBvZG5hdGhuYXJpYWl0QGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWQiOiI2ODYyYmM0ZDUzZDE4YWQ5NzU2NjA0Y2YiLCJyb2xlQmFzZVVzZXJJZCI6IjY4NjJiYzRkNTNkMThhZDk3NTY2MDRjYyIsInVzZXJJZCI6IjY4NjJiYzRkNTNkMThhZDk3NTY2MDRjZiIsImlhdCI6MTc2Mzk2NjY1NSwiZXhwIjoxNzk1NTAyNjU1fQ.E16ZfTxEqYA6t8afbToOt3yE8Ec2eKwc0SCu3TB4Exc`
                );
              }}
            >
              Student View
            </Button>
            <Button
              variant={userRole === "teacher" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                //setUserRole("teacher");
                router.push(
                  `/dashboard?ct=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbXBvZG5hdGg3NkBnbWFpbC5jb20iLCJyb2xlIjoic2VsbGVyIiwiaWQiOiI2NzJkNTA1YWRlZmViZjc2ZTZhMmY3YWQiLCJyb2xlQmFzZVVzZXJJZCI6IjY3MmQ1MDVhZGVmZWJmNzZlNmEyZjdhYSIsInVzZXJJZCI6IjY3MmQ1MDVhZGVmZWJmNzZlNmEyZjdhZCIsImlhdCI6MTc2NDAwODYyMiwiZXhwIjoxNzk1NTQ0NjIyfQ.3eFWo15FoiWv3v4s9v8_qytVBQggwQsohpy6L7LzK1E`
                );
              }}
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
        {activeTab === "classwork" && (
          <ClassworkPage classRoomId={classRoomId} userRole={userRole} />
        )}
        {activeTab === "people" && <PeoplePage userRole={userRole} />}
        {activeTab === "grades" && <GradesPage userRole={userRole} />}
      </div>
    </div>
  );
}
