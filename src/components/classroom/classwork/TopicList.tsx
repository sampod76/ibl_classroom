/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { USER_ROLE } from "@/constants/role";

import {
  BarChart3,
  Calendar,
  ClipboardList,
  Edit,
  Edit2,
  File,
  FileText,
  Plus,
  Users,
  Video,
  VideoIcon,
} from "lucide-react";

import { Collapse, Dropdown, Menu, Modal, Tooltip } from "antd";
import React, { useState } from "react";
import AssignmentDialog from "./AssignmentDialog";
import LectureNotesDialog from "./LectureNotesDialog";
import TutorialDialog from "./TutorialDialog";
import { useAppSelector } from "@/redux/hooks";
import { saveAs } from "file-saver";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useSearchParams } from "next/navigation";
import { useGetAllTopicsQuery } from "@/redux/api/teacher/topicsApi";
import { LoadingSkeleton } from "@/components/ui/skeleton";
import dayjs from "dayjs";
import { DateFormatterDayjsOop } from "@/utils/DateAllUtlsFuntion";
import Link from "next/link";
import fileObjectToLink from "@/utils/fileObjectToLink";
import ModalComponent from "@/components/modal/ModalComponents";
const shortenName = (name: string, max = 20) => {
  if (name.length <= max) return name;
  return name.substring(0, max) + "...";
};
export default function TopicList({ classRoomId }: { classRoomId: string }) {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const { data: UserData, isLoading: UserLoading } = useAppSelector(
    (state) => state.userInfo
  );
  const subjectId = useSearchParams().get("subjectId");
  const query = React.useMemo(() => {
    return {
      subjectId,
      limit,
      page,
    };
  }, [subjectId, limit, page]);

  const role = UserData?.role == "seller" ? "teacher" : UserData?.role;
  const { data, isLoading, isFetching } = useGetAllTopicsQuery(query, {
    skip: !Boolean(subjectId),
  });

  const [openModal, setOpenModal] = useState(false);
  const [modalObjectives, setModalObjectives] = useState<{ title: string }[]>(
    []
  );

  // ==================================
  // 🔵 UI RENDER
  // ==================================
  if (isLoading || isFetching) return <LoadingSkeleton />;
  const topicData = data?.data || [];

  const downloadAllFiles = async (files: any[]) => {
    for (const file of files) {
      const fileUrl = file?.cdn ? `${file.cdn}/${file.path}` : file.url;

      try {
        const response = await fetch(fileUrl, {
          mode: "cors",
        });

        const blob = await response.blob();

        saveAs(blob, file.filename || "download");

        // small delay for safe download queue
        await new Promise((res) => setTimeout(res, 300));
      } catch (err) {
        console.error("Download failed:", err);
      }
    }
  };
  if (!subjectId) {
    return <>Do not have SubjectId</>;
  }

  return (
    <div className="space-y-6">
      <Collapse accordion={false} expandIconPosition="end">
        {topicData.map((topic, index) => (
          <Collapse.Panel
            key={index}
            header={
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{topic.title}</h3>
                {topic?.liveTutorials[0]?.startDate &&
                  new Date(topic.liveTutorials[0].startDate) > new Date() && (
                    <Badge variant="secondary">Current Topic</Badge>
                  )}
              </div>
            }
          >
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
                  <Button className="gap-2">
                    <Edit2 className="h-4 w-4" />
                    Edit Unit
                  </Button>
                </div>
              )}
            </div>
            <div className="space-y-4 mt-3">
              <Card className="p-4">
                <h4 className="font-semibold mb-2 text-foreground">
                  🎯 Objectives
                </h4>

                <ul className="list-disc pl-6 text-sm text-muted-foreground ">
                  {topic.objective.slice(0, 2).map((obj, idx) => (
                    <li className="line-clamp-1" key={idx}>
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
              {topic?.liveTutorials?.map((tutorial, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10`}
                    >
                      <Video className={`h-5 w-5 text-destructive`} />
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold">{tutorial.title}</h4>
                      <Tooltip title={tutorial.description}>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {tutorial.description}
                        </p>
                      </Tooltip>

                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-2">
                        {tutorial.startDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>
                              {DateFormatterDayjsOop.formatDate(
                                tutorial.startDate,
                                "MMM D, YYYY - hh:mm A"
                              )}
                            </span>
                          </div>
                        )}
                      </div>

                      {tutorial?.recordingDetails?.link ? (
                        <div className="mt-3 flex gap-2">
                          <Link
                            href={tutorial?.recordingDetails?.link}
                            // key={b}

                            className="flex items-center justify-center border !bg-violet-500 p-1 px-3 !text-white rounded-2xl"
                          >
                            📺Watch Recoding
                          </Link>
                        </div>
                      ) : (
                        <div className="mt-3 flex gap-2">
                          <Link
                            href={tutorial?.meetingDetails?.link}
                            // key={b}

                            className="flex items-center justify-center border !bg-violet-500 p-1 px-3 !text-white rounded-2xl"
                          >
                            🎥 Join Meeting
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
              {topic?.lectureNotes?.map((lecture, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10`}
                    >
                      <Video className={`h-5 w-5 text-destructive`} />
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold">{lecture.title}</h4>
                      <Tooltip title={lecture.description}>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {lecture.description}
                        </p>
                      </Tooltip>

                      {lecture?.files?.length > 0 && (
                        <div className="mt-2">
                          {/* 🔥 Download All Button */}
                          <button
                            onClick={() => downloadAllFiles(lecture.files)}
                            className="text-xs mb-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Download All
                          </button>

                          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                            {lecture?.files?.map((file, index) => (
                              <a
                                key={index}
                                href={fileObjectToLink(file)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 hover:text-blue-600 transition"
                                title={file.filename} // Tooltip full name
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
          </Collapse.Panel>
        ))}
      </Collapse>

      {/* ================================== */}
      {/* 🔵 MODAL FOR OBJECTIVES */}
      {/* ================================== */}
      <Modal
        title="🎯 Full Objectives"
        open={openModal}
        footer={null}
        onCancel={() => setOpenModal(false)}
      >
        <ul className="list-disc pl-6 text-sm text-muted-foreground">
          {modalObjectives.map((obj: { title: string }, idx: number) => (
            <li key={idx} className="mb-1 ">
              {obj.title}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}
