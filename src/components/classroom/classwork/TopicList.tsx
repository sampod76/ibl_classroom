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
  FileText,
  Users,
  Video,
} from "lucide-react";

import { Collapse, Modal } from "antd";
import React, { useState } from "react";

export default function TopicList({
  userRole,
}: {
  userRole: keyof typeof USER_ROLE;
}) {
  const role = userRole === "seller" ? "teacher" : userRole;

  // ==================================
  // 🔵 Modal state for Objectives
  // ==================================
  const [openModal, setOpenModal] = useState(false);
  const [modalObjectives, setModalObjectives] = useState<{ title: string }[]>(
    []
  );

  // ==================================
  // 📌 Dynamic Topics Data
  // ==================================
  const topicsData = [
    {
      week: "Week 8: Integration Techniques",
      isCurrent: true,
      items: [
        // Objective item (no type)
        {
          objective: [
            { title: "Learn limit definition" },
            { title: "Learn limit notation" },
            { title: "Learn limit notation" },
            { title: "Learn limit notation" },
          ],
        },

        // Assignment block
        {
          type: "assignment",
          icon: ClipboardList,
          iconColor: "bg-destructive/10",
          textColor: "text-destructive",
          title: "Integration by Parts Assignment",
          desc: "Complete problems 1-20 from Chapter 8. Show all work and explanations.",
          badge: "Due Soon",
          points: "100 points",
          date: "Due: Mar 25, 11:59 PM",
          submitCount: "3/32",
          roleActions: {
            student: [
              { label: "View Details", variant: "outline" },
              { label: "Submit Work", variant: "default" },
            ],
            teacher: [
              { label: "View Submissions (3)", icon: BarChart3 },
              { label: "Edit", variant: "outline", icon: Edit },
            ],
          },
        },

        // Notes block
        {
          type: "notes",
          icon: FileText,
          iconColor: "bg-primary/10",
          textColor: "text-primary",
          title: "Integration Lecture Notes",
          desc: "Comprehensive notes covering integration by parts, u-substitution, and trigonometric substitution.",
          date: "Posted: Mar 18",
          fileInfo: "PDF • 2.4 MB",
          roleActions: {
            student: [
              { label: "Download", variant: "outline" },
              { label: "View", variant: "ghost" },
            ],
            teacher: [
              { label: "Download", variant: "outline" },
              { label: "View", variant: "ghost" },
            ],
          },
        },

        // Tutorial block
        {
          type: "tutorial",
          icon: Video,
          iconColor: "bg-accent/10",
          textColor: "text-accent",
          title: "Live Tutorial Session",
          desc: "Join us for a live problem-solving session on integration techniques.",
          date: "Mar 23, 2:00 PM",
          duration: "60 minutes",
          roleActions: {
            student: [
              { label: "Join Google Meet" },
              { label: "Add to Calendar", variant: "outline" },
            ],
            teacher: [
              { label: "Join Google Meet" },
              { label: "Add to Calendar", variant: "outline" },
            ],
          },
        },
      ],
    },

    // SECOND WEEK
    {
      week: "Week 7: Integration Techniques part one",
      isCurrent: true,
      items: [
        {
          objective: [
            { title: "Learn limit definition" },
            { title: "Learn limit notation" },
            { title: "Learn limit notation" },
            { title: "Learn limit notation" },
          ],
        },

        // Assignment block
        {
          type: "assignment",
          icon: ClipboardList,
          iconColor: "bg-destructive/10",
          textColor: "text-destructive",
          title: "Integration by Parts Assignment",
          desc: "Complete problems 1-20 from Chapter 8. Show all work and explanations.",
          badge: "Due Soon",
          points: "100 points",
          date: "Due: Mar 25, 11:59 PM",
          submitCount: "3/32",
          roleActions: {
            student: [
              { label: "View Details", variant: "outline" },
              { label: "Submit Work", variant: "default" },
            ],
            teacher: [
              { label: "View Submissions (3)", icon: BarChart3 },
              { label: "Edit", variant: "outline", icon: Edit },
            ],
          },
        },

        // Notes block
        {
          type: "notes",
          icon: FileText,
          iconColor: "bg-primary/10",
          textColor: "text-primary",
          title: "Integration Lecture Notes",
          desc: "Comprehensive notes covering integration by parts, u-substitution, and trigonometric substitution.",
          date: "Posted: Mar 18",
          fileInfo: "PDF • 2.4 MB",
          roleActions: {
            student: [
              { label: "Download", variant: "outline" },
              { label: "View", variant: "ghost" },
            ],
            teacher: [
              { label: "Download", variant: "outline" },
              { label: "View", variant: "ghost" },
            ],
          },
        },

        // Tutorial block
        {
          type: "tutorial",
          icon: Video,
          iconColor: "bg-accent/10",
          textColor: "text-accent",
          title: "Pre Recorded Tutorial Session",
          desc: "Join us for a live problem-solving session on integration techniques.",
          date: "Mar 23, 2:00 PM",
          duration: "60 minutes",
          roleActions: {
            student: [
              { label: "See Record video" },
              { label: "Add to Calendar", variant: "outline" },
            ],
            teacher: [
              { label: "See Record video" },
              { label: "Add to Calendar", variant: "outline" },
            ],
          },
        },
      ],
    },
  ];

  // ==================================
  // 🔵 UI RENDER
  // ==================================
  return (
    <div className="space-y-6">
      <Collapse accordion={false} expandIconPosition="end">
        {topicsData.map((topic, index) => (
          <Collapse.Panel
            key={index}
            header={
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{topic.week}</h3>
                {topic.isCurrent && (
                  <Badge variant="secondary">Current Topic</Badge>
                )}
              </div>
            }
          >
            <div className="space-y-4 mt-3">
              {topic.items.map((item, i) => {
                // =======================
                // 🟢 OBJECTIVE ITEM ONLY
                // =======================
                if (item.objective && !item.type) {
                  return (
                    <Card key={i} className="p-4">
                      <h4 className="font-semibold mb-2 text-foreground">
                        🎯 Objectives
                      </h4>

                      <ul className="list-disc pl-6 text-sm text-muted-foreground ">
                        {item.objective.slice(0, 2).map((obj, idx) => (
                          <li className="line-clamp-1" key={idx}>
                            {obj.title}
                          </li>
                        ))}
                      </ul>

                      {item.objective.length > 2 && (
                        <button
                          onClick={() => {
                            setModalObjectives(item.objective);
                            setOpenModal(true);
                          }}
                          className="text-blue-600 text-sm mt-2 hover:underline"
                        >
                          See more
                        </button>
                      )}
                    </Card>
                  );
                }

                // =======================
                // 🔵 NORMAL ITEMS
                // =======================
                return (
                  <Card key={i} className="p-4 hover:shadow-md transition">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${item.iconColor}`}
                      >
                        <item.icon className={`h-5 w-5 ${item.textColor}`} />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.desc}
                        </p>

                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-2">
                          {item.date && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{item.date}</span>
                            </div>
                          )}

                          {item.points && (
                            <div className="flex items-center gap-1">
                              <FileText className="h-3.5 w-3.5" />
                              <span>{item.points}</span>
                            </div>
                          )}

                          {item.submitCount && role === "teacher" && (
                            <div className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" />
                              <span className="font-medium">
                                {item.submitCount}
                              </span>
                              <span>submitted</span>
                            </div>
                          )}

                          {item.fileInfo && (
                            <div className="flex items-center gap-1">
                              <FileText className="h-3.5 w-3.5" />
                              <span>{item.fileInfo}</span>
                            </div>
                          )}
                        </div>

                        <div className="mt-3 flex gap-2">
                          {item.roleActions[role]?.map((btn, b) => (
                            <Button
                              key={b}
                              size="sm"
                              variant={btn.variant || "default"}
                              className="flex items-center gap-2"
                            >
                              {btn.icon && (
                                <btn.icon className="h-4 w-4 text-muted-foreground" />
                              )}
                              {btn.label}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
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
