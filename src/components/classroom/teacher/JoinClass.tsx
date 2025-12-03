/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useAddTeacherAccessClassroomMutation } from "@/redux/api/teacher/TeacherAccessClassroomApi";
import { Success_model } from "@/utils/modalHook";
import { Button, Card, Form, Input, message } from "antd";
import { useSearchParams } from "next/navigation";
import React from "react";
interface JoinClassroomFormValues {
  classRoomCode: string;
}
export default function JoinClass({ sellerId }: { sellerId?: string }) {
  const [form] = Form.useForm<JoinClassroomFormValues>();
  const searchParams = useSearchParams();
  const roleBaseUserId = searchParams.get("roleBaseUserId");
  const [sendJoinClassRoom, { isLoading: jloading }] =
    useAddTeacherAccessClassroomMutation();
  const onFinish = async (values: JoinClassroomFormValues) => {
    try {
      const payload = {
        ...values,
      };
      if (roleBaseUserId) {
        //@ts-ignore
        payload["seller"] = {
          role: "seller",
          userId: sellerId,
          roleBaseUserId,
        };
      }
      const res = await sendJoinClassRoom(payload).unwrap();

      // message.success("Classroom join request sent successfully!");
      Success_model(
        "Classroom join request sent successfully! Please go to your classroom and wait for approval."
      );

      form.resetFields();
    } catch (error: any) {
      console.log("🚀 ~ onFinish ~ error:", error);
      message.error(error?.data?.message || "Failed to send request!");
    }
  };
  return (
    <div>
      {" "}
      <Card
        title={
          <div>
            <p className="font-semibold text-lg text-center">Join Classroom</p>
            <p className="text-sm text-gray-600 ">
              If you are already join, you don&lsquo;t need to enter the
              classroom code again. Simply go to the <strong>Classroom</strong>{" "}
              tab to continue.
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
            rules={[{ required: true, message: "Please input classroom code" }]}
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
            loading={jloading}
            block
            size="large"
          >
            {jloading ? "Sending..." : "Send Request"}
          </Button>
        </Form>
      </Card>
    </div>
  );
}
