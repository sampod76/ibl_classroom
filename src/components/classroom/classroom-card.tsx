"use client";

import { useAppSelector } from "@/redux/hooks";
import fileObjectToLink from "@/utils/fileObjectToLink";
import {
  BookOpen,
  Calendar,
  ChevronRight,
  Eye,
  Link as LinkIcon, // ⬅ FIX: Rename Lucide Link
} from "lucide-react";
import Link from "next/link"; // ⬅ FIX: Correct Next.js Link import
import Image from "next/image";
import React from "react";

type IRoom = {
  _id: string;
  name: string;
  classRoomCategoryId: string;
  description: string;
  classCode: string;
  bannerImage: {
    url: string;
  };
  status: string;
  createdAt: string;
};

export default function ClassroomCard({ room }: { room: IRoom }) {
  const { data: UserInfo } = useAppSelector((state) => state.userInfo);

  return (
    <div>
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
                  room.status === "active" ? "bg-emerald-200" : "bg-slate-300"
                }`}
              />
              {room.status.toUpperCase()}
            </span>
          </div>

          {/* Class Code */}
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
                {room.description}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-600">
              <div className="p-1.5 bg-amber-50 rounded-lg">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <span className="text-xs sm:text-sm">
                {new Date(room.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Action Button */}
          {room.status === "active" ? (
            <Link
              href={`/dashboard/${
                UserInfo?.role == "seller" ? "teacher" : UserInfo?.role
              }/classroom/${room._id}?classCode=${room.classCode}&classRoom=${
                room.name
              }`}
              className="w-full flex items-center justify-center gap-2 text-white py-2.5 sm:py-3 rounded-xl text-sm font-semibold 
              transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 
              group/btn bg-indigo-600 hover:bg-indigo-700"
            >
              <Eye className="w-4 h-4" />
              <span>View Classroom</span>
              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          ) : (
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 
                rounded-xl text-sm font-semibold 
                bg-gray-200 text-gray-500 cursor-not-allowed 
                shadow-md shadow-gray-100"
            >
              <Eye className="w-4 h-4 opacity-50" />
              <span>Classroom is {room.status}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
