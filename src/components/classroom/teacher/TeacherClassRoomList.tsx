"use client";
import { LoadingSkeleton } from "@/components/ui/skeleton";

import fileObjectToLink from "@/utils/fileObjectToLink";
import { Image } from "antd";
import React, { useState } from "react";
import {
  Users,
  Calendar,
  BookOpen,
  Eye,
  ChevronRight,
  Search,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { useGetAllTeacherAccessClassroomQuery } from "@/redux/api/teacher/TeacherAccessClassroomApi";
import ClassroomCard from "../classroom-card";
export default function TeacherClassRoomList() {
  const { data: UserInfo, isLoading: UserInfoLoading } = useAppSelector(
    (state) => state.userInfo
  );
  const query: Record<string, string | number> = {
    page: 1,
    limit: 60,
    status: "active",
  };
  const { data, isLoading } = useGetAllTeacherAccessClassroomQuery(query);

  if (isLoading || UserInfoLoading) {
    return <LoadingSkeleton />;
  }
  const classRoom = data?.data || [];

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-4">My Classrooms</h1>

      {/* ❗ Outer Grid – enough */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 p-6">
        {classRoom.length === 0 ? (
          <div className="text-center py-16 sm:py-20 col-span-full">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mb-2">
              No classrooms found
            </h3>
            <p className="text-slate-500 text-sm sm:text-base">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <>
            {classRoom.map((item) => {
              const room = item?.classRoomDetails[0];
              return <ClassroomCard key={item._id} room={room} />;
            })}
          </>
        )}
      </div>
    </>
  );
}
