"use client";
/* 
  const handleMultipleQueryChange = (payload: Record<string, string>) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    Object.entries(payload).forEach(([key, value]) => {
      currentParams.set(key, value);
    });

    router.replace(`${pathname}?${currentParams.toString()}`);
  };
*/
import { Button } from "@/components/ui/button";
import { Menu, GraduationCap } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useAppSelector } from "@/redux/hooks";
import { useGetSingleClassRoomQuery } from "@/redux/api/common/classroomApi";
import { SkeletonCard } from "../ui/skeleton";
import { useEffect } from "react";

export function ClassroomHeader({ classRoomId }: { classRoomId: string }) {
  const subjectId = useSearchParams().get("subjectId");
  const { data: UserInfo } = useAppSelector((state) => state.userInfo);
  const userRole = UserInfo?.role == "seller" ? "teacher" : UserInfo?.role;

  const searchParams = useSearchParams();
  const activeTab = searchParams.get("activeTab");
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading } = useGetSingleClassRoomQuery(classRoomId, {
    skip: !Boolean(classRoomId),
  });
  const handleQueryChange = (key: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set(key, value);
    router.replace(`${pathname}?${currentParams.toString()}`);
  };
  useEffect(() => {
    if (!activeTab) {
      handleQueryChange("activeTab", "classwork");
    }
  }, []);

  if (isLoading) {
    return <SkeletonCard />;
  }

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-foreground">
                  {data?.name}
                </h1>
                {userRole && (
                  <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    <GraduationCap className="h-3 w-3" />
                    {userRole == "teacher" ? "Teacher" : "Student"}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Class Code: {data?.classCode}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex gap-6 border-t border-border">
          {/* <button
            onClick={() => handleQueryChange("activeTab", "stream")}
            className={`border-b-2 py-3 text-sm font-medium ${
              activeTab === "stream"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Stream
          </button> */}
          <button
            onClick={() => handleQueryChange("activeTab", "classwork")}
            className={`border-b-2 py-3 text-sm font-medium ${
              activeTab === "classwork"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Classwork
          </button>
          <button
            onClick={() => handleQueryChange("activeTab", "people")}
            className={`border-b-2 py-3 text-sm font-medium ${
              activeTab === "people"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            People
          </button>
          <button
            onClick={() => handleQueryChange("activeTab", "grades")}
            className={`border-b-2 py-3 text-sm font-medium ${
              activeTab === "grades"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Grades
          </button>
        </nav>
      </div>
    </header>
  );
}
