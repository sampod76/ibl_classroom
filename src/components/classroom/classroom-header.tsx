"use client";

import { Button } from "@/components/ui/button";
import {
  Menu,
  Settings,
  Users,
  Calendar,
  Bell,
  GraduationCap,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ClassroomHeader({
  userRole = "student",
}: {
  userRole?: "student" | "teacher";
}) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("activeTab") || "stream";
  const router = useRouter();
  const pathname = usePathname();
  const handleMultipleQueryChange = (payload: Record<string, any>) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    Object.entries(payload).forEach(([key, value]) => {
      currentParams.set(key, value);
    });

    router.replace(`${pathname}?${currentParams.toString()}`);
  };
  const handleQueryChange = (key: string, value: any) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set(key, value);

    router.replace(`${pathname}?${currentParams.toString()}`);
  };

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
                  Advanced Mathematics
                </h1>
                {userRole === "teacher" && (
                  <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    <GraduationCap className="h-3 w-3" />
                    Teacher
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Spring 2024 • Section A
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
                3
              </span>
              <span className="sr-only">Notifications</span>
            </Button>

            <Button variant="ghost" size="icon">
              <Calendar className="h-5 w-5" />
              <span className="sr-only">Calendar</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  Class settings
                </DropdownMenuItem>
                <DropdownMenuItem>View grades</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Leave class</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
              {userRole === "teacher" ? "PJ" : "JS"}
            </div>
          </div>
        </div>

        <nav className="flex gap-6 border-t border-border">
          <button
            onClick={() => handleQueryChange("activeTab", "stream")}
            className={`border-b-2 py-3 text-sm font-medium ${
              activeTab === "stream"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Stream
          </button>
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
