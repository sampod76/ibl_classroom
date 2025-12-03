/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { LoadingSkeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import {
  useAddTeacherAccessClassroomMutation,
  useGetAllTeacherAccessClassroomQuery,
} from "@/redux/api/teacher/TeacherAccessClassroomApi";
import ClassroomCard from "../classroom-card";
import { useSearchParams } from "next/navigation";
import { Button, Card, Form, Input, message } from "antd";
import { Success_model } from "@/utils/modalHook";
import ModalComponent from "@/components/modal/ModalComponents";
import JoinClass from "./JoinClass";
interface JoinClassroomFormValues {
  classRoomCode: string;
}

export default function TeacherClassRoomList({
  sellerId,
}: {
  sellerId?: string;
}) {
  const [form] = Form.useForm<JoinClassroomFormValues>();
  const searchParams = useSearchParams();
  const roleBaseUserId = searchParams.get("roleBaseUserId");
  const { data: UserInfo, isLoading: UserInfoLoading } = useAppSelector(
    (state) => state.userInfo
  );

  const query = {
    page: 1,
    limit: 60,
    status: "active",
    sellerId: sellerId ? sellerId : undefined,
  };

  const { data, isLoading } = useGetAllTeacherAccessClassroomQuery(query);

  if (isLoading || UserInfoLoading) return <LoadingSkeleton />;

  const classRoom = data?.data || [];

  return (
    <>
      <div className="relative mb-6">
        {/* CENTER TITLE */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center border-b-2 pb-2">
          Classrooms
        </h1>

        {/* ADD BUTTON ON RIGHT */}
        <div className="absolute right-0 top-0">
          <ModalComponent
            button={
              <Button type="primary" icon={<span className="text-xl">＋</span>}>
                Add Classroom
              </Button>
            }
          >
            <JoinClass sellerId={sellerId} />
          </ModalComponent>
        </div>
      </div>

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
              return (
                <ClassroomCard
                  accessClassRoomId={item._id}
                  sellerId={sellerId}
                  key={item._id}
                  room={room}
                />
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
