import TeacherClassRoomList from "@/components/classroom/teacher/TeacherClassRoomList";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ teacherUserId: string }>;
}) {
  const { teacherUserId } = await params;
  return (
    <div>
      <TeacherClassRoomList sellerId={teacherUserId} />
    </div>
  );
}
