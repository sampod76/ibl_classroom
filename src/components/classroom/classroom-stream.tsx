import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  FileText,
  Paperclip,
  MessageSquare,
  MoreVertical,
  Clock,
  Upload,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { USER_ROLE } from "@/constants/role";

export function ClassroomStream({
  userRole = "student",
}: {
  userRole?: keyof typeof USER_ROLE;
}) {
  return (
    <main className="space-y-4">
      {/* Announcement Card */}
      <Card className="overflow-hidden border-l-4 border-l-primary">
        <div className="bg-primary/5 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
              {userRole === "teacher" ? "PJ" : "JS"}
            </div>
            <div className="flex-1">
              <Input
                placeholder={
                  userRole === "teacher"
                    ? "Announce something to your class..."
                    : "Share something with your class..."
                }
                className="bg-card"
              />
              <div className="mt-3 flex gap-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="mr-2 h-4 w-4" />
                  Attach
                </Button>
                {userRole === "teacher" && (
                  <Button variant="ghost" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Assignment
                  </Button>
                )}
                <Button size="sm" className="ml-auto">
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Assignment Post */}
      <Card>
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    Prof. Johnson
                  </span>
                  <span className="text-xs text-muted-foreground">
                    posted a new assignment
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            {userRole === "teacher" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem>Copy link</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Chapter 5: Calculus Assignment
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Complete problems 1-15 from Chapter 5. Show all work and explain
                your reasoning. Submit your solutions as a PDF through the
                assignment link below.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                Due: March 25, 11:59 PM
              </Badge>
              <Badge variant="outline">100 points</Badge>
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Chapter_5_Problems.pdf
                  </p>
                  <p className="text-xs text-muted-foreground">1.2 MB</p>
                </div>
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              {userRole === "student" ? (
                <>
                  <Button variant="default" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Submit Work
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <MessageSquare className="h-4 w-4" />
                    12 Comments
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="default" className="gap-2">
                    View Submissions (3/32)
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Edit className="h-4 w-4" />
                    Edit Assignment
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <MessageSquare className="h-4 w-4" />
                    12 Comments
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Announcement Post */}
      <Card>
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  PJ
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    Prof. Johnson
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
            {userRole === "teacher" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div className="mt-4 space-y-3">
            <p className="text-sm leading-relaxed text-foreground">
              {
                "Reminder: Office hours this week are Wednesday 2-4 PM and Friday 10-12 PM. Feel free to drop by if you have questions about the upcoming midterm or need clarification on any concepts."
              }
            </p>

            <div className="flex items-center gap-3 pt-2 text-muted-foreground">
              <button className="flex items-center gap-1 text-xs hover:text-foreground">
                <MessageSquare className="h-4 w-4" />5 Comments
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Material Post */}
      <Card>
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    Prof. Johnson
                  </span>
                  <span className="text-xs text-muted-foreground">
                    posted new material
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <h3 className="text-base font-semibold text-foreground">
              Week 7 Lecture Notes
            </h3>

            <div className="space-y-2">
              <div className="rounded-lg border border-border bg-card p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-accent/10">
                    <FileText className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      Derivatives_Advanced.pdf
                    </p>
                    <p className="text-xs text-muted-foreground">856 KB</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-accent/10">
                    <FileText className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      Practice_Problems.pdf
                    </p>
                    <p className="text-xs text-muted-foreground">1.1 MB</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}
