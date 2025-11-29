/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { LoadingSkeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

import ClassroomCard from "../classroom-card";
import { useGetAllStudentAccessClassroomQuery } from "@/redux/api/student/crStudentAccessClassroomApi";

export default function StudentClassRoomList() {
  const { data: UserInfo, isLoading: UserInfoLoading } = useAppSelector(
    (state) => state.userInfo
  );

  const query = {
    page: 1,
    limit: 60,
    status: "active",
  };

  const { data, isLoading } = useGetAllStudentAccessClassroomQuery(query);

  if (isLoading || UserInfoLoading) return <LoadingSkeleton />;

  const classRoom = data?.data || [];

  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold text-center my-6">
        My Classrooms
      </h1>

      {/* 🔥 FULL RESPONSIVE GRID */}
      <div
        className="grid gap-6 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4 
        p-4 sm:p-6"
      >
        {classRoom.length === 0 ? (
          <div className="text-center py-20 col-span-full">
            <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-700">
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
              return <ClassroomCard key={item._id} room={room as any} />;
            })}
          </>
        )}
      </div>
    </>
  );
}
