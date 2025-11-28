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

export default function ClassRoomViewCom({
  classRoomId,
}: {
  classRoomId: string;
}) {
  const dispatch = useAppDispatch();
  const { data: UserData, isLoading: UserLoading } = useAppSelector(
    (state) => state.userInfo
  );

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

      <ClassroomHeader classRoomId={classRoomId} />
      <div className="container mx-auto px-4 py-6">
        {activeTab === "stream" && (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <ClassroomStream classRoomId={classRoomId} />
            <ClassroomSidebar classRoomId={classRoomId} />
          </div>
        )}
        {activeTab === "classwork" && (
          <ClassworkPage classRoomId={classRoomId} />
        )}
        {activeTab === "people" && <PeoplePage classRoomId={classRoomId} />}
        {activeTab === "grades" && <GradesPage classRoomId={classRoomId} />}
      </div>
    </div>
  );
}
