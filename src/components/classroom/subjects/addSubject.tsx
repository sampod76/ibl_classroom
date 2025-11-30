/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAddAccessSubjectByTeacherMutation } from "@/redux/api/common/subjectApi";
import { Success_model } from "@/utils/modalHook";

import React from "react";
interface JoinSubjectCodeFormValues {
  subjectCode: string;
}
import { Form, Input, Button, message, Card } from "antd";
export default function AddSubjectInTeacher({
  classRoomId,
}: {
  classRoomId: string;
}) {
  const [addClassRoom, { isLoading }] = useAddAccessSubjectByTeacherMutation();
  const [form] = Form.useForm<JoinSubjectCodeFormValues>();
  const onFinish = async (values: JoinSubjectCodeFormValues) => {
    console.log("🚀 ~ onFinish ~ values:", values);

    try {
      const res = await addClassRoom({ ...values, classRoomId }).unwrap();

      // message.success("Classroom join request sent successfully!");
      Success_model("Join request sent successfully! ");
      form.resetFields();
    } catch (error: any) {
      console.log("🚀 ~ onFinish ~ error:", error);
      message.error(error?.data?.message || "Failed to send request!");
    }
  };
  return (
    <div>
      <Card title="Join Subject" className="min-w-md  mx-auto mt-10">
        <Form<JoinSubjectCodeFormValues>
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="Subject Code"
            name="subjectCode"
            rules={[
              { required: true, message: "Please input subjectCode code" },
            ]}
          >
            <Input
              placeholder="Enter subjectCode join code"
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
    </div>
  );
}
