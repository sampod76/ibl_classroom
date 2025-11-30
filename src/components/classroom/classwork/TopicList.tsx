/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  ClipboardList,
  File,
  FileText,
  Plus,
  Edit2,
  Video,
  VideoIcon,
} from "lucide-react";

import { Collapse, Dropdown, Modal, Tooltip } from "antd";
import React, { useMemo, useState } from "react";
import AssignmentDialog from "./AssignmentDialog";
import LectureNotesDialog from "./LectureNotesDialog";
import TutorialDialog from "./LiveTutorialDialog";
import { useAppSelector } from "@/redux/hooks";
import { saveAs } from "file-saver";
import { useSearchParams } from "next/navigation";
import { useGetAllTopicsQuery } from "@/redux/api/teacher/topicsApi";
import { LoadingSkeleton } from "@/components/ui/skeleton";
import { DateFormatterDayjsOop } from "@/utils/DateAllUtlsFuntion";
import Link from "next/link";
import fileObjectToLink from "@/utils/fileObjectToLink";
import ModalComponent from "@/components/modal/ModalComponents";
import CreateUpdateTopicsCom from "../topics/createUpdateTopicsCom";

const shortenName = (name: string, max = 20) =>
  name.length <= max ? name : name.substring(0, max) + "...";

export default function TopicList({ classRoomId }: { classRoomId: string }) {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const { data: UserData, isLoading: UserLoading } = useAppSelector(
    (state) => state.userInfo
  );

  const subjectId = useSearchParams().get("subjectId");

  const query = useMemo(
    () => ({
      subjectId,
      limit,
      page,
    }),
    [subjectId, limit, page]
  );

  const role = UserData?.role == "seller" ? "teacher" : UserData?.role;

  const { data, isLoading, isFetching } = useGetAllTopicsQuery(query, {
    skip: !Boolean(subjectId),
  });

  const [openModal, setOpenModal] = useState(false);
  const [modalObjectives, setModalObjectives] = useState<{ title: string }[]>(
    []
  );

  if (isLoading || isFetching) return <LoadingSkeleton />;
  if (!subjectId) return <>Do not have SubjectId</>;

  const topicData = data?.data || [];

  // 🔵 Download all files
  const downloadAllFiles = async (files: any[]) => {
    for (const file of files) {
      const fileUrl = file?.cdn ? `${file.cdn}/${file.path}` : file.url;

      try {
        const response = await fetch(fileUrl, {
          mode: "cors",
        });

        const blob = await response.blob();
        saveAs(blob, file.filename || "download");

        await new Promise((res) => setTimeout(res, 300));
      } catch (err) {
        console.error("Download failed:", err);
      }
    }
  };

  // 🔥 Convert topicData => Collapse items
  const collapseItems = topicData.map((topic: any, index: number) => ({
    key: index,
    label: (
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">{topic.title}</h3>
        {topic?.liveTutorials?.[0]?.startDate &&
          new Date(topic.liveTutorials[0].startDate) > new Date() && (
            <Badge variant="secondary">Current Topic</Badge>
          )}
      </div>
    ),
    children: (
      <div>
        {/* 🔵 Top Buttons */}
        <div className="flex justify-end items-center">
          {role === "teacher" && (
            <div className="flex items-start gap-2">
              <Dropdown
                placement="bottomRight"
                trigger={["click"]}
                menu={{
                  items: [
                    {
                      key: "liveTutorial",
                      label: (
                        <ModalComponent
                          button={
                            <div className="flex items-center gap-2">
                              <VideoIcon className="h-4 w-4" />
                              <span>Live Tutorial Meeting</span>
                            </div>
                          }
                        >
                          <TutorialDialog topicId={topic._id} />
                        </ModalComponent>
                      ),
                    },
                    {
                      key: "notes",
                      label: (
                        <ModalComponent
                          button={
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span>Lecture Notes</span>
                            </div>
                          }
                        >
                          <LectureNotesDialog topicId={topic._id} />
                        </ModalComponent>
                      ),
                    },
                    {
                      key: "assignment",
                      label: (
                        <ModalComponent
                          button={
                            <div className="flex items-center gap-2">
                              <ClipboardList className="h-4 w-4" />
                              <span>Assignment</span>
                            </div>
                          }
                        >
                          <AssignmentDialog topicId={topic._id} />
                        </ModalComponent>
                      ),
                    },
                  ],
                }}
              >
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Materials
                </Button>
              </Dropdown>

              <ModalComponent
                button={
                  <Button className="gap-2">
                    <Edit2 className="h-4 w-4" />
                    Edit Unit
                  </Button>
                }
              >
                <CreateUpdateTopicsCom
                  subjectId={subjectId}
                  defaultValue={topic}
                />
              </ModalComponent>
            </div>
          )}
        </div>

        {/* 🔵 CONTENT SECTION */}
        <div className="space-y-4 mt-3">
          {/* Objectives */}
          <Card className="p-4">
            <h4 className="font-semibold mb-2 text-foreground">
              🎯 Objectives
            </h4>

            <ul className="list-disc pl-6 text-sm text-muted-foreground">
              {topic.objective.slice(0, 2).map((obj: any, idx: number) => (
                <li key={idx} className="line-clamp-1">
                  {obj.title}
                </li>
              ))}
            </ul>

            {topic.objective.length > 2 && (
              <button
                onClick={() => {
                  setModalObjectives(topic.objective);
                  setOpenModal(true);
                }}
                className="text-blue-600 text-sm mt-2 hover:underline"
              >
                See more
              </button>
            )}
          </Card>

          {/* Live Tutorials */}
          {topic?.liveTutorials?.map((tutorial: any, idx: number) => (
            <Card key={idx} className="p-4 hover:shadow-md transition relative">
              {/* ✏️ Edit Button - TOP RIGHT CORNER */}
              <button
                // <-- তোমার এডিট ফাংশন
                className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 transition shadow-sm bg-red-200"
              >
                <Tooltip title="Edit Live Tutorial">
                  <Edit2 className="h-4 w-4   text-gray-800 " />
                </Tooltip>
              </button>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                  <Video className="h-5 w-5 text-destructive" />
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold">{tutorial.title}</h4>

                  <Tooltip
                    title={tutorial.description}
                    overlayStyle={{
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                    }}
                    overlayInnerStyle={{
                      background: "rgba(255, 255, 255, 0.5)", // tailwind: bg-white/50
                      color: "black",
                      border: "1px solid rgba(255,255,255,0.4)", // tailwind: border-white/40
                      borderRadius: "0.75rem", // tailwind: rounded-xl
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)", // tailwind: shadow-xl
                      padding: "10px 14px",
                    }}
                  >
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {tutorial.description}
                    </p>
                  </Tooltip>

                  {tutorial.startDate && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {DateFormatterDayjsOop.formatDate(
                          tutorial.startDate,
                          "MMM D, YYYY - hh:mm A"
                        )}
                      </span>
                    </div>
                  )}

                  {tutorial?.recordingDetails?.link ? (
                    <div className="mt-3">
                      <Link
                        href={tutorial.recordingDetails.link}
                        className="flex items-center justify-center border bg-violet-500 p-1 px-3 text-white rounded-2xl"
                      >
                        📺 Watch Recording
                      </Link>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <Link
                        href={tutorial.meetingDetails.link}
                        className="flex items-center justify-center border bg-violet-500 p-1 px-3 text-white rounded-2xl"
                      >
                        🎥 Join Meeting
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}

          {/* Lecture Notes */}
          {topic?.lectureNotes?.map((lecture: any, idx: number) => (
            <Card key={idx} className="p-4 hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                  <Video className="h-5 w-5 text-destructive" />
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold">{lecture.title}</h4>

                  <Tooltip title={lecture.description}>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {lecture.description}
                    </p>
                  </Tooltip>

                  {lecture.files?.length > 0 && (
                    <div className="mt-2">
                      {/* Download All */}
                      <button
                        onClick={() => downloadAllFiles(lecture.files)}
                        className="text-xs mb-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Download All
                      </button>

                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        {lecture.files.map((file: any, i: number) => (
                          <a
                            key={i}
                            href={fileObjectToLink(file)}
                            target="_blank"
                            className="flex items-center gap-1 hover:text-blue-600 transition"
                            title={file.filename}
                          >
                            <File className="h-3.5 w-3.5" />
                            <span className="max-w-[120px] truncate">
                              {shortenName(file.filename)}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    ),
  }));

  // 🔵 MAIN RETURN
  return (
    <div className="space-y-6">
      <Collapse
        accordion={false}
        expandIconPlacement="end"
        items={collapseItems}
      />

      {/* Modal for full objectives */}
      <Modal
        title="🎯 Full Objectives"
        open={openModal}
        footer={null}
        onCancel={() => setOpenModal(false)}
      >
        <ul className="list-disc pl-6 text-sm text-muted-foreground">
          {modalObjectives.map((obj, idx) => (
            <li key={idx} className="mb-1">
              {obj.title}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}
