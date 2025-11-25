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
export default function TeacherClassRoomList() {
  const { data: UserInfo, isLoading: UserInfoLoading } = useAppSelector(
    (state) => state.userInfo
  );
  const query: Record<string, string | number> = { page: 1, limit: 10 };
  const { data, isLoading } = useGetAllTeacherAccessClassroomQuery(query);

  if (isLoading || UserInfoLoading) {
    return <LoadingSkeleton />;
  }
  const classRoom = data?.data || [];

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-4">My Classrooms</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
        {classRoom.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
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
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {classRoom.map((item) => {
              const room = item?.classRoomDetails[0];
              return (
                <div
                  key={room._id}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-indigo-200 min-w-xs"
                >
                  {/* Banner Image */}
                  <div className="relative h-36 sm:h-44 overflow-hidden">
                    <Image
                      width={500}
                      height={400}
                      src={fileObjectToLink(room.bannerImage)}
                      alt={room._id}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${
                          room.status === "active"
                            ? "bg-emerald-500/90 text-white"
                            : "bg-slate-500/90 text-white"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            room.status === "active"
                              ? "bg-emerald-200"
                              : "bg-slate-300"
                          }`}
                        />
                        {room.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Class Code Overlay */}
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-white/95 backdrop-blur-sm text-indigo-700 px-2.5 py-1 rounded-lg text-xs sm:text-sm font-bold shadow-sm">
                        {room.classCode}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-3 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      {room.name}
                    </h2>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <div className="p-1.5 bg-indigo-50 rounded-lg">
                          <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                        </div>
                        <span className="text-xs sm:text-sm line-clamp-2">
                          {room?.description}
                        </span>
                      </div>

                      {/* <div className="flex items-center gap-2 text-slate-600">
                        <div className="p-1.5 bg-emerald-50 rounded-lg">
                          <Users className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <span className="text-xs sm:text-sm">
                          {room.studentCount} Students
                        </span>
                      </div> */}

                      <div className="flex items-center gap-2 text-slate-600">
                        <div className="p-1.5 bg-amber-50 rounded-lg">
                          <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        </div>
                        <span className="text-xs sm:text-sm">
                          {new Date(room.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      href={`/dashboard/${
                        UserInfo?.role == "seller" ? "teacher" : UserInfo?.role
                      }/classroom/${room._id}?classCode=${
                        room.classCode
                      }&classRoom=${room.name}`}
                      className="w-full flex items-center justify-center gap-2  text-white py-2.5 sm:py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 group/btn"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Classroom</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
