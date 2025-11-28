import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Download,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
  Users,
  Edit,
  BarChart3,
  Filter,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { USER_ROLE } from "@/constants/role";
import { useAppSelector } from "@/redux/hooks";

export function GradesPage({ classRoomId }: { classRoomId: string }) {
  const { data: UserData, isLoading: UserLoading } = useAppSelector(
    (state) => state.userInfo
  );

  const userRole = UserData?.role == "seller" ? "teacher" : UserData?.role;
  const grades = [
    {
      title: "Integration by Parts Assignment",
      category: "Assignments",
      score: null,
      maxScore: 100,
      dueDate: "Mar 25",
      status: "pending",
      weight: "15%",
    },
    {
      title: "Week 6 Quiz",
      category: "Quizzes",
      score: 92,
      maxScore: 100,
      dueDate: "Mar 20",
      status: "graded",
      weight: "5%",
    },
    {
      title: "Limits Problem Set",
      category: "Assignments",
      score: 95,
      maxScore: 100,
      dueDate: "Mar 18",
      status: "graded",
      weight: "15%",
    },
    {
      title: "Midterm Exam Prep Quiz",
      category: "Quizzes",
      score: 88,
      maxScore: 100,
      dueDate: "Mar 15",
      status: "graded",
      weight: "5%",
    },
    {
      title: "Derivatives Assignment",
      category: "Assignments",
      score: 98,
      maxScore: 100,
      dueDate: "Mar 11",
      status: "graded",
      weight: "15%",
    },
    {
      title: "Week 4 Quiz",
      category: "Quizzes",
      score: 85,
      maxScore: 100,
      dueDate: "Mar 6",
      status: "graded",
      weight: "5%",
    },
  ];

  const totalScore = grades
    .filter((g) => g.score !== null)
    .reduce((acc, g) => acc + g.score!, 0);
  const totalPossible = grades
    .filter((g) => g.score !== null)
    .reduce((acc, g) => acc + g.maxScore, 0);
  const overallPercentage =
    totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Grades</h2>
        <p className="text-sm text-muted-foreground">
          {userRole === "teacher"
            ? "Overview of class performance and individual student grades"
            : "Track your academic progress and performance"}
        </p>
      </div>

      {userRole === "student" ? (
        <>
          {/* Student View - Overall Grade Card */}
          <Card className="mb-6 p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  Overall Grade
                </p>
                <div className="mb-3 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">
                    {overallPercentage}%
                  </span>
                  <Badge variant="secondary" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    A-
                  </Badge>
                </div>
                <Progress value={overallPercentage} className="h-2" />
                <p className="mt-2 text-xs text-muted-foreground">
                  {totalScore} out of {totalPossible} points earned
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Assignments
                  </span>
                  <span className="font-semibold text-foreground">94%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Quizzes</span>
                  <span className="font-semibold text-foreground">88%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Participation
                  </span>
                  <span className="font-semibold text-foreground">100%</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-6">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Download Report
              </Button>
              <Button variant="outline">View Grade Breakdown</Button>
            </div>
          </Card>
        </>
      ) : (
        <>
          {/* Teacher View - Class Statistics */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Class Average</p>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-3xl font-bold text-foreground">92%</p>
              <Badge variant="secondary" className="mt-2 gap-1">
                <TrendingUp className="h-3 w-3" />
                +3% from last week
              </Badge>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Students</p>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-3xl font-bold text-foreground">32</p>
              <p className="mt-2 text-xs text-muted-foreground">All enrolled</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Pending Grades</p>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-3xl font-bold text-destructive">8</p>
              <Button
                variant="link"
                size="sm"
                className="mt-1 h-auto p-0 text-xs"
              >
                Grade now
              </Button>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-3xl font-bold text-accent">94%</p>
              <p className="mt-2 text-xs text-muted-foreground">
                On-time submissions
              </p>
            </Card>
          </div>

          {/* Teacher View - Student Filter */}
          <Card className="mb-6 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-64">
                  <Users className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  <SelectItem value="student1">John Smith</SelectItem>
                  <SelectItem value="student2">Emily Martinez</SelectItem>
                  <SelectItem value="student3">Michael Chen</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assignments</SelectItem>
                  <SelectItem value="graded">Graded</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="missing">Missing</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                className="gap-2 sm:ml-auto bg-transparent"
              >
                <Download className="h-4 w-4" />
                Export Grades
              </Button>
            </div>
          </Card>
        </>
      )}

      {/* Grading Categories */}
      <Card className="mb-6 p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Grading System
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Assignments</p>
            <p className="mt-1 text-2xl font-bold text-foreground">40%</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Quizzes</p>
            <p className="mt-1 text-2xl font-bold text-foreground">20%</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Midterm</p>
            <p className="mt-1 text-2xl font-bold text-foreground">20%</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Final Exam</p>
            <p className="mt-1 text-2xl font-bold text-foreground">20%</p>
          </div>
        </div>
      </Card>

      {/* Grades List */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            {userRole === "teacher" ? "Assignments" : "All Grades"}
          </h3>
          <Badge variant="secondary">{grades.length} items</Badge>
        </div>

        <div className="space-y-3">
          {grades.map((grade, index) => (
            <Card key={index} className="p-4 transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      grade.status === "pending"
                        ? "bg-muted"
                        : grade.score && grade.score >= 90
                        ? "bg-accent/10"
                        : grade.score && grade.score >= 80
                        ? "bg-primary/10"
                        : "bg-destructive/10"
                    }`}
                  >
                    {grade.status === "pending" ? (
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    ) : grade.score && grade.score >= 90 ? (
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    ) : grade.score && grade.score >= 80 ? (
                      <FileText className="h-5 w-5 text-primary" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-start justify-between gap-4">
                      <h4 className="font-semibold text-foreground">
                        {grade.title}
                      </h4>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {grade.category}
                      </Badge>
                      <span>Due: {grade.dueDate}</span>
                      <span>Weight: {grade.weight}</span>
                    </div>
                    {grade.status === "graded" && grade.score !== null && (
                      <div className="mt-3">
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Score</span>
                          <span className="font-semibold text-foreground">
                            {grade.score}/{grade.maxScore}
                          </span>
                        </div>
                        <Progress
                          value={(grade.score / grade.maxScore) * 100}
                          className="h-1.5"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  {grade.status === "pending" ? (
                    userRole === "teacher" ? (
                      <Button size="sm">Grade Now</Button>
                    ) : (
                      <Badge variant="secondary">Not Graded</Badge>
                    )
                  ) : (
                    grade.score !== null && (
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {Math.round((grade.score / grade.maxScore) * 100)}%
                        </div>
                        <Badge
                          variant={
                            grade.score >= 90
                              ? "default"
                              : grade.score >= 80
                              ? "secondary"
                              : "destructive"
                          }
                          className="mt-1"
                        >
                          {grade.score >= 90
                            ? "A"
                            : grade.score >= 80
                            ? "B"
                            : grade.score >= 70
                            ? "C"
                            : "D"}
                        </Badge>
                      </div>
                    )
                  )}
                </div>
              </div>

              {grade.status === "graded" && (
                <div className="mt-3 flex gap-2 border-t border-border pt-3">
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
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 bg-transparent"
                      >
                        <Users className="h-4 w-4" />
                        View Submissions (32/32)
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        Export
                      </Button>
                    </>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
