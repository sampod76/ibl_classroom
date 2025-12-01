/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Form, Input, Button, message, Card } from "antd";
import {
  useAddTeacherAccessClassroomMutation,
  useGetAllTeacherAccessClassroomQuery,
} from "@/redux/api/teacher/TeacherAccessClassroomApi";
import { LoadingSkeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";
import ClassroomCard from "@/components/classroom/classroom-card";
import { Success_model } from "@/utils/modalHook";
import {
  useAddStudentAccessClassroomMutation,
  useGetAllStudentAccessClassroomQuery,
} from "@/redux/api/student/crStudentAccessClassroomApi";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

interface JoinClassroomFormValues {
  classRoomCode: string;
}

export default function StudentHomeDashboard() {
  const { data: UserInfo } = useAppSelector((state) => state.userInfo);
  const userRole = UserInfo?.role == "seller" ? "teacher" : UserInfo?.role;
  const router = useRouter();
  const [sendJoinClassRoom, { isLoading }] =
    useAddStudentAccessClassroomMutation();
  const { data, isLoading: classroomLoading } =
    useGetAllStudentAccessClassroomQuery({ status: "pending", limit: 900 });

  const [form] = Form.useForm<JoinClassroomFormValues>();

  const onFinish = async (values: JoinClassroomFormValues) => {
    console.log("🚀 ~ onFinish ~ values:", values);
    try {
      const res = await sendJoinClassRoom(values).unwrap();

      // message.success("Classroom join request sent successfully!");
      Success_model(
        "Classroom join request sent successfully! Please go to your classroom and wait for approval."
      );
      router.push(`/dashboard/${userRole}/classroom`);
      form.resetFields();
    } catch (error: any) {
      console.log("🚀 ~ onFinish ~ error:", error);
      message.error(error?.data?.message || "Failed to send request!");
    }
  };
  if (classroomLoading) {
    return <LoadingSkeleton />;
  }
  const reqData = data?.data || [];
  const meth = data?.meta;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Card
          title={
            <div>
              <p className="font-semibold text-lg text-center">
                Join Classroom
              </p>
              <p className="text-sm text-gray-600 ">
                If you are already join, you don't need to enter the classroom
                code again. Simply go to the <strong>Classroom</strong> tab to
                continue.
              </p>
            </div>
          }
          className="min-w-md  mx-auto mt-10"
        >
          <Form<JoinClassroomFormValues>
            layout="vertical"
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="Enter Classroom Code"
              name="classCode"
              rules={[
                { required: true, message: "Please input classroom code" },
              ]}
            >
              <Input
                placeholder="Enter classroom join code"
                size="large"
                maxLength={50}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              block
              size="large"
            >
              {isLoading ? "Sending..." : "Send Request"}
            </Button>
          </Form>
        </Card>
        <div>
          <Link
            href={`/dashboard/${userRole}/classroom`}
            className="inline-flex items-center gap-2 mt-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
          >
            Go to Classroom
          </Link>
        </div>
        <div className="shadow-sm rounded-2xl bg-white p-6 mt-10">
          <h1 className="text-2xl font-bold mb-4">Pending Classrooms</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {reqData.length === 0 ? (
              <div className="text-center py-16 sm:py-20">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mb-2">
                  No classrooms found
                </h3>
                <p className="text-slate-500 text-sm sm:text-base">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              reqData.map((room: any) => (
                <ClassroomCard key={room._id} room={room} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
