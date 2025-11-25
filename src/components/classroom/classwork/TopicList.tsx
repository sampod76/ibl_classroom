import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { USER_ROLE } from "@/constants/role";
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock,
  Edit,
  FileText,
  Users,
  Video,
} from "lucide-react";
import React from "react";

export default function TopicList({
  userRole,
}: {
  userRole: keyof typeof USER_ROLE;
}) {
  const role = userRole === "seller" ? "teacher" : userRole;
  return (
    <div>
      <div className="space-y-6">
        {/* Week 8 - Current Topic */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Week 8: Integration Techniques
            </h3>
            <Badge variant="secondary">Current Topic</Badge>
          </div>

          <div className="space-y-3">
            <Card className="p-4 transition-shadow hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                  <ClipboardList className="h-5 w-5 text-destructive" />
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Integration by Parts Assignment
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Complete problems 1-20 from Chapter 8. Show all work and
                        explanations.
                      </p>
                    </div>
                    <Badge variant="destructive" className="shrink-0">
                      Due Soon
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Due: Mar 25, 11:59 PM</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" />
                      <span>100 points</span>
                    </div>
                    {role === "teacher" && (
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        <span className="font-medium text-foreground">
                          3/32
                        </span>
                        <span>submitted</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 flex gap-2">
                    {role === "student" ? (
                      <>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm">Submit Work</Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          className="gap-2"
                          //   onClick={() => setOpenSubmissions(true)}
                        >
                          <BarChart3 className="h-4 w-4" />
                          View Submissions (3)
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 transition-shadow hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Integration Lecture Notes
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Comprehensive notes covering integration by parts,
                        u-substitution, and trigonometric substitution.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Posted: Mar 18</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" />
                      <span>PDF • 2.4 MB</span>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 transition-shadow hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Video className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Live Tutorial Session
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Join us for a live problem-solving session on
                        integration techniques.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Mar 23, 2:00 PM</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>60 minutes</span>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm">Join Google Meet</Button>
                    <Button size="sm" variant="outline">
                      Add to Calendar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Week 7 - Previous Topic */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Week 7: Limits and Continuity
            </h3>
          </div>

          <div className="space-y-3">
            <Card className="p-4 transition-shadow hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <h4 className="font-semibold text-foreground">
                      Limits Problem Set
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Practice problems on evaluating limits and understanding
                      continuity.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Submitted: Mar 18</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-accent">95/100</span>
                      <span>points</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-foreground">32/32</span>
                      <span>submitted</span>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    {role === "student" ? (
                      <>
                        <Button size="sm" variant="outline">
                          View Feedback
                        </Button>
                        <Button size="sm" variant="ghost">
                          Download
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" className="gap-2">
                          <BarChart3 className="h-4 w-4" />
                          View Submissions (3)
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 transition-shadow hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <h4 className="font-semibold text-foreground">
                      Chapter 7 Study Guide
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Comprehensive review material for the upcoming midterm
                      exam.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Posted: Mar 15</span>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
