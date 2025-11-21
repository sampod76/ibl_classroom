"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Video,
  ClipboardList,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle2,
  Edit,
  Users,
  BarChart3,
  BookOpen,
  VideoIcon,
  Download,
  Eye,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Submission {
  id: string;
  studentName: string;
  studentEmail: string;
  avatar: string;
  submittedAt: string;
  status: "submitted" | "graded" | "late";
  files: string[];
  grade?: number;
  maxPoints: number;
  feedback?: string;
}

const mockSubmissions: Submission[] = [
  {
    id: "1",
    studentName: "Emma Johnson",
    studentEmail: "emma.j@school.edu",
    avatar: "/diverse-students-studying.png",
    submittedAt: "Mar 23, 10:30 AM",
    status: "submitted",
    files: ["integration_assignment.pdf"],
    maxPoints: 100,
  },
  {
    id: "2",
    studentName: "Michael Chen",
    studentEmail: "michael.c@school.edu",
    avatar: "/diverse-students-studying.png",
    submittedAt: "Mar 24, 9:15 AM",
    status: "graded",
    files: ["homework_8.pdf"],
    grade: 95,
    maxPoints: 100,
    feedback: "Great work! Clear explanations on all problems.",
  },
  {
    id: "3",
    studentName: "Sarah Williams",
    studentEmail: "sarah.w@school.edu",
    avatar: "/diverse-students-studying.png",
    submittedAt: "Mar 25, 1:45 PM",
    status: "late",
    files: ["assignment.pdf"],
    maxPoints: 100,
  },
];

export function ClassworkPage({
  userRole = "student",
}: {
  userRole?: "student" | "teacher";
}) {
  const [openAssignment, setOpenAssignment] = useState(false);
  const [openLectureNotes, setOpenLectureNotes] = useState(false);
  const [openTutorial, setOpenTutorial] = useState(false);
  const [openSubmissions, setOpenSubmissions] = useState(false);
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  const [gradeInput, setGradeInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");

  const handleGradeSubmission = (submission: Submission) => {
    console.log(
      "[v0] Grading submission:",
      submission.id,
      "Grade:",
      gradeInput,
      "Feedback:",
      feedbackInput
    );
    // In real app, this would update the backend
    setSelectedSubmission(null);
    setGradeInput("");
    setFeedbackInput("");
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header Section */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Classwork</h2>
          <p className="text-sm text-muted-foreground">
            {userRole === "teacher"
              ? "Manage and organize all assignments, materials, and topics"
              : "View all assignments, materials, and topics"}
          </p>
        </div>
        {userRole === "teacher" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setOpenAssignment(true)}>
                <ClipboardList className="mr-2 h-4 w-4" />
                <span>Assignment</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenLectureNotes(true)}>
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Lecture Notes</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenTutorial(true)}>
                <VideoIcon className="mr-2 h-4 w-4" />
                <span>Live Tutorial Meeting</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Assignment Dialog Form */}
      <Dialog open={openAssignment} onOpenChange={setOpenAssignment}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Assignment</DialogTitle>
            <DialogDescription>
              Create a new assignment for your students
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="assignment-title">Title *</Label>
              <Input
                id="assignment-title"
                placeholder="e.g., Integration by Parts Assignment"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignment-instructions">Instructions</Label>
              <Textarea
                id="assignment-instructions"
                placeholder="Provide detailed instructions for the assignment..."
                className="min-h-32"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="assignment-points">Points</Label>
                <Input id="assignment-points" type="number" placeholder="100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignment-due">Due Date</Label>
                <Input id="assignment-due" type="datetime-local" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignment-topic">Topic</Label>
              <Select>
                <SelectTrigger id="assignment-topic">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week8">
                    Week 8: Integration Techniques
                  </SelectItem>
                  <SelectItem value="week7">
                    Week 7: Limits and Continuity
                  </SelectItem>
                  <SelectItem value="new">Create New Topic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignment-attachments">Attachments</Label>
              <div className="flex items-center gap-2">
                <Input id="assignment-attachments" type="file" multiple />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setOpenAssignment(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setOpenAssignment(false)}>
                Create Assignment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Lecture Notes Dialog Form */}
      <Dialog open={openLectureNotes} onOpenChange={setOpenLectureNotes}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Lecture Notes</DialogTitle>
            <DialogDescription>
              Share lecture notes and study materials with your class
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes-title">Title *</Label>
              <Input
                id="notes-title"
                placeholder="e.g., Integration Lecture Notes"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes-description">Description</Label>
              <Textarea
                id="notes-description"
                placeholder="Brief description of the lecture notes content..."
                className="min-h-24"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes-topic">Topic</Label>
              <Select>
                <SelectTrigger id="notes-topic">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week8">
                    Week 8: Integration Techniques
                  </SelectItem>
                  <SelectItem value="week7">
                    Week 7: Limits and Continuity
                  </SelectItem>
                  <SelectItem value="new">Create New Topic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes-files">Upload Files *</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="notes-files"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Supported formats: PDF, DOC, DOCX, PPT, PPTX
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setOpenLectureNotes(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setOpenLectureNotes(false)}>
                Add Lecture Notes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Live Tutorial Meeting Dialog Form */}
      <Dialog open={openTutorial} onOpenChange={setOpenTutorial}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule Live Tutorial</DialogTitle>
            <DialogDescription>
              Create a live tutorial session with Google Meet integration
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tutorial-title">Meeting Title *</Label>
              <Input
                id="tutorial-title"
                placeholder="e.g., Live Tutorial Session"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tutorial-description">Description</Label>
              <Textarea
                id="tutorial-description"
                placeholder="What will be covered in this tutorial session..."
                className="min-h-24"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tutorial-date">Date & Time *</Label>
                <Input id="tutorial-date" type="datetime-local" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tutorial-duration">Duration (minutes)</Label>
                <Input id="tutorial-duration" type="number" placeholder="60" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tutorial-topic">Topic</Label>
              <Select>
                <SelectTrigger id="tutorial-topic">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week8">
                    Week 8: Integration Techniques
                  </SelectItem>
                  <SelectItem value="week7">
                    Week 7: Limits and Continuity
                  </SelectItem>
                  <SelectItem value="new">Create New Topic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tutorial-meet">Google Meet Link</Label>
              <Input
                id="tutorial-meet"
                placeholder="https://meet.google.com/xxx-xxxx-xxx"
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to auto-generate a Google Meet link
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setOpenTutorial(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpenTutorial(false)}>
                Schedule Tutorial
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openSubmissions} onOpenChange={setOpenSubmissions}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Student Submissions</DialogTitle>
            <DialogDescription>
              View and grade student submissions for this assignment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Submission Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="p-4">
                <div className="text-sm text-muted-foreground">
                  Total Submissions
                </div>
                <div className="mt-1 text-2xl font-bold">3</div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-muted-foreground">Graded</div>
                <div className="mt-1 text-2xl font-bold text-accent">1</div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-muted-foreground">
                  Average Score
                </div>
                <div className="mt-1 text-2xl font-bold">95%</div>
              </Card>
            </div>

            {/* Submissions List */}
            <div className="space-y-3">
              {mockSubmissions.map((submission) => (
                <Card key={submission.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={submission.avatar || "/placeholder.svg"}
                        alt={submission.studentName}
                      />
                      <AvatarFallback>
                        {submission.studentName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold">
                            {submission.studentName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {submission.studentEmail}
                          </p>
                        </div>
                        <Badge
                          variant={
                            submission.status === "graded"
                              ? "default"
                              : submission.status === "late"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {submission.status === "graded"
                            ? `${submission.grade}/${submission.maxPoints}`
                            : submission.status === "late"
                            ? "Late"
                            : "Submitted"}
                        </Badge>
                      </div>

                      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Submitted: {submission.submittedAt}</span>
                        <span>•</span>
                        <span>{submission.files.length} file(s)</span>
                      </div>

                      {/* Files */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {submission.files.map((file, idx) => (
                          <Button
                            key={idx}
                            size="sm"
                            variant="outline"
                            className="gap-2 bg-transparent"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            {file}
                          </Button>
                        ))}
                      </div>

                      {/* Feedback if graded */}
                      {submission.status === "graded" &&
                        submission.feedback && (
                          <div className="mt-3 rounded-md bg-muted p-3">
                            <p className="text-sm font-medium">Feedback:</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {submission.feedback}
                            </p>
                          </div>
                        )}

                      {/* Grade Button */}
                      <div className="mt-3 flex gap-2">
                        {submission.status === "graded" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedSubmission(submission);
                              setGradeInput(submission.grade?.toString() || "");
                              setFeedbackInput(submission.feedback || "");
                            }}
                          >
                            <Edit className="mr-2 h-3.5 w-3.5" />
                            Edit Grade
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedSubmission(submission);
                              setGradeInput("");
                              setFeedbackInput("");
                            }}
                          >
                            Grade Submission
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          <Eye className="mr-2 h-3.5 w-3.5" />
                          View
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="mr-2 h-3.5 w-3.5" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedSubmission}
        onOpenChange={() => setSelectedSubmission(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Grade Submission</DialogTitle>
            <DialogDescription>
              Grading {selectedSubmission?.studentName}&apos;s submission
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={selectedSubmission.avatar || "/placeholder.svg"}
                      alt={selectedSubmission.studentName}
                    />
                    <AvatarFallback>
                      {selectedSubmission.studentName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {selectedSubmission.studentName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Submitted: {selectedSubmission.submittedAt}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade-points">
                  Grade (out of {selectedSubmission.maxPoints} points) *
                </Label>
                <Input
                  id="grade-points"
                  type="number"
                  placeholder="Enter grade"
                  value={gradeInput}
                  onChange={(e) => setGradeInput(e.target.value)}
                  max={selectedSubmission.maxPoints}
                  min={0}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade-feedback">Feedback</Label>
                <Textarea
                  id="grade-feedback"
                  placeholder="Provide feedback to the student..."
                  className="min-h-32"
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Submitted Files</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedSubmission.files.map((file, idx) => (
                    <Button
                      key={idx}
                      size="sm"
                      variant="outline"
                      className="gap-2 bg-transparent"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      {file}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedSubmission(null)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleGradeSubmission(selectedSubmission)}
                >
                  Save Grade
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Filter and Search Bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search classwork..." className="pl-9" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="assignment">Assignments</SelectItem>
            <SelectItem value="material">Materials</SelectItem>
            <SelectItem value="quiz">Quizzes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Topics and Assignments */}
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
                    {userRole === "teacher" && (
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
                    {userRole === "student" ? (
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
                          onClick={() => setOpenSubmissions(true)}
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
                    {userRole === "student" ? (
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
