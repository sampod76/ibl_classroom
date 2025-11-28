/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Video,
  ClipboardList,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  Edit,
  Users,
  BarChart3,
  VideoIcon,
  Download,
  Eye,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { USER_ROLE } from "@/constants/role";
import AssignmentDialog from "./classwork/AssignmentDialog";
import LectureNotesDialog from "./classwork/LectureNotesDialog";
import TutorialDialog from "./classwork/TutorialDialog";
import TopicList from "./classwork/TopicList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAppSelector } from "@/redux/hooks";

// ✅ New Components

export function ClassworkPage({ classRoomId }: { classRoomId: string }) {
  const { data: UserData, isLoading: UserLoading } = useAppSelector(
    (state) => state.userInfo
  );

  const role = UserData?.role == "seller" ? "teacher" : UserData?.role;

  // ✅ Dialog States
  const [openAssignment, setOpenAssignment] = useState(false);
  const [openLectureNotes, setOpenLectureNotes] = useState(false);
  const [openTutorial, setOpenTutorial] = useState(false);

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header Section */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Classwork</h2>
          <p className="text-sm text-muted-foreground">
            {role === "teacher"
              ? "Manage and organize all assignments, materials, and topics"
              : "View all assignments, materials, and topics"}
          </p>
        </div>

        {role === "teacher" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setOpenAssignment(true)}>
                <ClipboardList className="mr-2 h-4 w-4" />
                <span>Assignment</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setOpenLectureNotes(true)}>
                <FileText className="mr-2 h-4 w-4" />
                <span>Lecture Notes</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setOpenTutorial(true)}>
                <VideoIcon className="mr-2 h-4 w-4" />
                <span>Live Tutorial Meeting</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* ✅ New Dialog Components */}
      <AssignmentDialog
        open={openAssignment}
        onClose={() => setOpenAssignment(false)}
      />

      <LectureNotesDialog
        classRoomId={classRoomId}
        open={openLectureNotes}
        onClose={() => setOpenLectureNotes(false)}
      />

      <TutorialDialog
        open={openTutorial}
        onClose={() => setOpenTutorial(false)}
      />

      {/* ✅ Filter and Search */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search classwork..." className="pl-9" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="assignment">Assignments</SelectItem>
            <SelectItem value="material">Materials</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Topics and Assignments */}
      <TopicList userRole={role as any} />
    </div>
  );
}
