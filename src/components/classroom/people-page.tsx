import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, MoreVertical, Search, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { USER_ROLE } from "@/constants/role";
import { useAppSelector } from "@/redux/hooks";

export function PeoplePage({ classRoomId }: { classRoomId: string }) {
  const { data: UserData, isLoading: UserLoading } = useAppSelector(
    (state) => state.userInfo
  );

  const userRole = UserData?.role == "seller" ? "teacher" : UserData?.role;
  console.log(userRole);
  const teachers = [
    {
      name: "Prof. Sarah Johnson",
      email: "s.johnson@university.edu",
      initials: "SJ",
      color: "bg-primary",
    },
    {
      name: "Dr. Michael Chen",
      email: "m.chen@university.edu",
      initials: "MC",
      color: "bg-accent",
    },
  ];

  const students = [
    {
      name: "You (John Smith)",
      email: "j.smith@university.edu",
      initials: "JS",
      color: "bg-accent",
      isYou: true,
    },
    {
      name: "Emily Martinez",
      email: "e.martinez@university.edu",
      initials: "EM",
      color: "bg-blue-500",
    },
    {
      name: "David Wilson",
      email: "d.wilson@university.edu",
      initials: "DW",
      color: "bg-green-500",
    },
    {
      name: "Sarah Thompson",
      email: "s.thompson@university.edu",
      initials: "ST",
      color: "bg-purple-500",
    },
    {
      name: "James Anderson",
      email: "j.anderson@university.edu",
      initials: "JA",
      color: "bg-orange-500",
    },
    {
      name: "Maria Garcia",
      email: "m.garcia@university.edu",
      initials: "MG",
      color: "bg-pink-500",
    },
    {
      name: "Robert Taylor",
      email: "r.taylor@university.edu",
      initials: "RT",
      color: "bg-indigo-500",
    },
    {
      name: "Jennifer Lee",
      email: "j.lee@university.edu",
      initials: "JL",
      color: "bg-teal-500",
    },
    {
      name: "Michael Brown",
      email: "m.brown@university.edu",
      initials: "MB",
      color: "bg-cyan-500",
    },
    {
      name: "Lisa Davis",
      email: "l.davis@university.edu",
      initials: "LD",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header Section */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">People</h2>
          <p className="text-sm text-muted-foreground">
            Manage teachers and students •{" "}
            <span className="font-medium text-foreground">
              {teachers.length + students.length} members
            </span>
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Invite People
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search people by name or email..."
            className="pl-9"
          />
        </div>
      </div>

      {/* Teachers Section */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">Teachers</h3>
            <Badge variant="secondary">{teachers.length}</Badge>
          </div>
        </div>

        <Card className="divide-y divide-border">
          {teachers.map((teacher, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback
                    className={`${teacher.color} text-sm font-medium text-white`}
                  >
                    {teacher.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">
                    {teacher.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {teacher.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email teacher</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View profile</DropdownMenuItem>
                    <DropdownMenuItem>Send message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View grades</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Students Section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">Students</h3>
            <Badge variant="secondary">{students.length}</Badge>
          </div>
        </div>

        <Card className="divide-y divide-border">
          {students.map((student, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback
                    className={`${student.color} text-sm font-medium text-white`}
                  >
                    {student.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground">
                      {student.name}
                    </p>
                    {student.isYou && (
                      <Badge variant="outline" className="text-xs">
                        You
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {student.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email student</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View profile</DropdownMenuItem>
                    <DropdownMenuItem>Send message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className={student.isYou ? "opacity-50" : ""}
                    >
                      {student.isYou ? "View your grades" : "View grades"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
