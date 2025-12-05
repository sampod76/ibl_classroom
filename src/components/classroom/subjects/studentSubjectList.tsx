"use client";

import React, { useEffect } from "react";

import {
  useGetAllAccessSubjectByTeacherQuery,
  useGetAllSubjectQuery,
} from "@/redux/api/common/subjectApi";
import { SkeletonCard } from "@/components/ui/skeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/utils/cn";
import { useAppDispatch } from "@/redux/hooks";
import { addSubject } from "@/redux/features/syllabusSlice";
export default function StudentSubjectList({
  classRoomId,
}: {
  classRoomId: string;
}) {
  const dispatch = useAppDispatch();

  const subjectId = useSearchParams().get("subjectId");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const handleQueryChange = (key: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set(key, value);

    router.replace(`${pathname}?${currentParams.toString()}`);
  };
  const { data, isLoading } = useGetAllSubjectQuery(
    {
      classRoomId,
      limit: 100,
    },
    {
      skip: !Boolean(classRoomId),
    }
  );

  useEffect(() => {
    const firstSubjectId = data?.data[0]?._id;

    if (firstSubjectId) {
      handleQueryChange("subjectId", firstSubjectId);
    }
  }, [data?.data[0]?._id, isLoading]);

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

          {/* <ModalComponent
            button={
              <p className="text-sm bg-violet-600 ring-1 ring-violet-400 animate-pulse text-white border rounded-md p-1 font-semibold mb-3 cursor-pointer">
                ➕ Add Subject{" "}
              </p>
            }
            width={650}
          >
            <AddSubjectInTeacher />
          </ModalComponent> */}
        </div>

        <ul className="space-y-2">
          {subjects
            .filter((subject) => subject?._id)
            .map((subject, i) => (
              <li
                key={i}
                className={cn(
                  "p-2 rounded-md cursor-pointer hover:bg-primary/10 hover:text-primary transition text-sm md:text-base border-b-2",
                  subject?._id === subjectId &&
                    "bg-blue-500 text-white  hover:bg-blue-500 hover:text-white"
                )}
                onClick={() => {
                  handleQueryChange("subjectId", subject?._id);
                  dispatch(addSubject(subject));
                }}
              >
                {subject?.title}
              </li>
            ))}
        </ul>
      </aside>
    </div>
  );
}
