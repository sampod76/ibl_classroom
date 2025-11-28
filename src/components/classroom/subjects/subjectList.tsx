"use client";
import ModalComponent from "@/components/modal/ModalComponents";
import React from "react";
import AddSubjectInTeacher from "./addSubject";
import { useGetAllAccessSubjectByTeacherQuery } from "@/redux/api/common/subjectApi";
import { SkeletonCard } from "@/components/ui/skeleton";

export default function SubjectList({ classRoomId }: { classRoomId: string }) {
  const { data, isLoading } = useGetAllAccessSubjectByTeacherQuery(
    {
      classRoomId,
      limit: 100,
    },
    {
      skip: !Boolean(classRoomId),
    }
  );

  if (isLoading) {
    return (
      <div>
        <SkeletonCard />
      </div>
    );
  }
  const subjects = data?.data || [];

  return (
    <div>
      <aside
        className="
          w-full md:w-sm 
          bg-white shadow-sm rounded-md border 
          p-4
          md:h-fit md:sticky md:top-4
        "
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold mb-3">📚 Subjects </h3>

          <ModalComponent
            button={
              <p className="text-sm border rounded p-1 font-semibold mb-3 cursor-pointer">
                ➕ Join Subject{" "}
              </p>
            }
            width={650}
          >
            <AddSubjectInTeacher />
          </ModalComponent>
        </div>

        <ul className="space-y-2">
          {subjects.map((subject, i) => (
            <li
              key={i}
              className="
                p-2 rounded-md cursor-pointer 
                hover:bg-primary/10 hover:text-primary 
                transition
                text-sm md:text-base border-b-2
              "
            >
              {subject?.subjectDetails[0]?.title}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
