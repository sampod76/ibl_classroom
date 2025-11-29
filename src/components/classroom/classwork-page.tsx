/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import TopicList from "./classwork/TopicList";

import { useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/button";
import ModalComponent from "../modal/ModalComponents";
import CreateTopicsCom from "./topics/createTopicsCom";
import { useSearchParams } from "next/navigation";

// ✅ New Components

export function ClassworkPage({ classRoomId }: { classRoomId: string }) {
  const { userInfo, modal } = useAppSelector((state) => state);
  const subjectId = useSearchParams().get("subjectId");

  const role =
    userInfo?.data?.role == "seller" ? "teacher" : userInfo?.data?.role;
  if (!subjectId) return;
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
        <ModalComponent
          button={
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Unit
            </Button>
          }
          modalId={subjectId}
        >
          <CreateTopicsCom subjectId={subjectId} />
        </ModalComponent>
      </div>

      {/* ✅ New Dialog Components */}

      {/* ✅ Filter and Search */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search classwork..." className="pl-9" />
        </div>
      </div>

      {/* Topics and Assignments */}
      <TopicList classRoomId={classRoomId} />
    </div>
  );
}
