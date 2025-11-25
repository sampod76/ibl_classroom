import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Video,
  Users,
  FileText,
  Plus,
  BarChart3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { USER_ROLE } from "@/constants/role";

export function ClassroomSidebar({
  userRole = "student",
}: {
  userRole?: keyof typeof USER_ROLE;
}) {
  return (
    <aside className="space-y-4">
      {/* Class Code Card */}
      {userRole === "teacher" && (
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-foreground">Class Code</h3>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-muted px-3 py-2">
            <code className="text-lg font-mono font-semibold text-foreground">
              abc123x
            </code>
            <Button variant="ghost" size="sm">
              Copy
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Share this code with students to join the class
          </p>
        </Card>
      )}

      {/* Analytics Card */}
      {userRole === "teacher" && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Class Overview
            </h3>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Total Students
              </span>
              <span className="text-lg font-bold text-foreground">32</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Avg. Grade</span>
              <span className="text-lg font-bold text-accent">92%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Pending Work
              </span>
              <span className="text-lg font-bold text-destructive">3</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="mt-4 w-full bg-transparent"
          >
            View Analytics
          </Button>
        </Card>
      )}

      {/* Upcoming Card */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Upcoming</h3>
          {userRole === "teacher" ? (
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Plus className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              View all
            </Button>
          )}
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-4 w-4 text-destructive" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                Midterm Exam
              </p>
              <p className="text-xs text-muted-foreground">Tomorrow, 9:00 AM</p>
            </div>
          </div>

          <div className="flex gap-3 rounded-lg border border-border p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10">
              <Clock className="h-4 w-4 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                Calculus Assignment
              </p>
              <p className="text-xs text-muted-foreground">Due Mar 25</p>
            </div>
          </div>

          <div className="flex gap-3 rounded-lg border border-border p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Video className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                Live Session
              </p>
              <p className="text-xs text-muted-foreground">Wed, 2:00 PM</p>
              <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                Join Google Meet
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* To-Do or Quick Actions Card */}
      {userRole === "student" ? (
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-foreground">Your To-Do</h3>

          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-primary"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Submit Chapter 5 Assignment
                </p>
                <p className="text-xs text-destructive">2 days left</p>
              </div>
            </div>

            <div className="flex items-start gap-3 opacity-60">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground line-through">
                  Complete Week 6 Quiz
                </p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>

            <div className="flex items-start gap-3 opacity-60">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground line-through">
                  Review Lecture Notes
                </p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="mt-4 w-full bg-transparent"
          >
            View All Tasks
          </Button>
        </Card>
      ) : (
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-foreground">
            Quick Actions
          </h3>

          <div className="mt-4 space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 bg-transparent"
            >
              <Plus className="h-4 w-4" />
              Create Assignment
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 bg-transparent"
            >
              <FileText className="h-4 w-4" />
              Post Material
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 bg-transparent"
            >
              <Video className="h-4 w-4" />
              Schedule Meet
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 bg-transparent"
            >
              <BarChart3 className="h-4 w-4" />
              Grade Submissions
            </Button>
          </div>
        </Card>
      )}

      {/* Class Members Card */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            Class Members
          </h3>
          <Badge variant="secondary">32</Badge>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                PJ
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                Prof. Johnson
              </p>
              <p className="text-xs text-muted-foreground">Teacher</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-accent text-xs text-accent-foreground">
                JS
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">You</p>
              <p className="text-xs text-muted-foreground">Student</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-muted text-xs">EM</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                Emily Martinez
              </p>
              <p className="text-xs text-muted-foreground">Student</p>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="mt-4 w-full gap-2 bg-transparent"
        >
          <Users className="h-4 w-4" />
          View All Members
        </Button>
      </Card>
    </aside>
  );
}
