/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppSelector } from "@/redux/hooks";
import fileObjectToLink from "@/utils/fileObjectToLink";
import { BookOpen, Calendar, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useDeleteTeacherAccessClassroomMutation } from "@/redux/api/teacher/TeacherAccessClassroomApi";
import { Button, message, Modal } from "antd";

type IRoom = {
  _id: string;
  name: string;
  classRoomCategoryId: string;
  description: string;
  classCode: string;
  bannerImage: { url: string };
  status: string;
  createdAt: string;
};

export default function ClassroomCard({
  room,
  sellerId,
  accessClassRoomId,
}: {
  room: IRoom;
  sellerId?: string;
  accessClassRoomId?: string;
}) {
  const [deleteTeacherAccessClassroom, { isLoading }] =
    useDeleteTeacherAccessClassroomMutation();
  const { data: UserInfo } = useAppSelector((state) => state.userInfo);
  const role = UserInfo?.role === "seller" ? "teacher" : UserInfo?.role;
  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure?",
      content: "Do you really want to remove this teacher from this classroom?",
      okText: "Yes, Remove",
      cancelText: "Cancel",
      okButtonProps: {
        className: "!bg-red-600 hover:!bg-red-700",
      },

      async onOk() {
        try {
          if (!accessClassRoomId) return;
          const res = await deleteTeacherAccessClassroom(
            accessClassRoomId
          ).unwrap();

          message.success("Teacher removed successfully");
        } catch (error: any) {
          message.error(error?.data?.message || "Failed to remove teacher");
        }
      },
    });
  };
  return (
    <div className="w-full">
      <div
        className="group bg-white rounded-2xl shadow-md hover:shadow-xl 
        transition-all duration-300 overflow-hidden border border-slate-100 
        hover:border-indigo-200"
      >
        {/* Banner Image */}
        <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
          <Image
            src={fileObjectToLink(room.bannerImage)}
            width={600}
            height={400}
            alt={room._id}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Status */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm 
              ${
                room.status === "active"
                  ? "bg-emerald-500/90 text-white"
                  : "bg-gray-500/90"
              }`}
            >
              ● {room.status.toUpperCase()}
            </span>
          </div>

          {/* Class Code */}
          <div className="absolute bottom-3 left-3">
            <span className="bg-white/95 text-indigo-700 px-2.5 py-1 rounded-lg text-xs sm:text-sm font-bold shadow">
              {room.classCode}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h2
            className="text-lg font-semibold text-slate-800 mb-2 
            line-clamp-1 group-hover:text-indigo-600"
          >
            {room.name}
          </h2>

          {/* Description */}
          <div className="flex items-start gap-2 text-slate-600 mb-3">
            <div className="p-1.5 bg-indigo-50 rounded-lg">
              <BookOpen className="w-4 h-4 text-indigo-600" />
            </div>
            <span className="text-sm line-clamp-2">{room.description}</span>
          </div>

          {/* Created Date */}
          <div className="flex items-center gap-2 text-slate-600 mb-4">
            <div className="p-1.5 bg-amber-50 rounded-lg">
              <Calendar className="w-4 h-4 text-amber-600" />
            </div>
            <span className="text-sm">
              {new Date(room.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {sellerId && role === "admin" ? (
            <div className="flex w-full items-center gap-3">
              <Button
                danger
                loading={isLoading}
                onClick={() => handleDelete()}
                className="flex-1 !py-2.5 !rounded-lg shadow-sm"
              >
                Remove
              </Button>

              <button
                className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium 
      hover:bg-blue-700 transition shadow-sm"
              >
                Subject List
              </button>
            </div>
          ) : (
            <>
              {room.status === "active" ? (
                <Link
                  href={`/dashboard/${
                    UserInfo?.role == "seller" ? "teacher" : UserInfo?.role
                  }/classroom/${room._id}?classCode=${
                    room.classCode
                  }&classRoom=${room.name}`}
                  className="w-full flex items-center justify-center gap-2 text-white 
             py-2.5 sm:py-3 rounded-xl text-sm font-semibold bg-indigo-600 
             hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
                >
                  <Eye className="w-4 h-4" />
                  View Classroom
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 py-2.5 
               bg-gray-200 text-gray-500 rounded-xl cursor-not-allowed"
                >
                  <Eye className="w-4 h-4 opacity-50" />
                  Classroom is {room.status}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
