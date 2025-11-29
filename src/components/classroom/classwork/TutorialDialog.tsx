"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
export interface TutorialFormValues {
  _id?: string;
  title: string;
  description?: string;
  datetime: Dayjs;
  startDate?: number;
  meetingDetails?: {
    link: string;
  };
  recordingDetails?: {
    link: string;
  };
}

import { Form, Input, DatePicker, InputNumber, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";
import {
  useAddLiveTutorialMutation,
  useUpdateLiveTutorialMutation,
} from "@/redux/api/common/liveTurtorialApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
export default function TutorialDialog({
  topicId,
  defaultValues,
}: {
  topicId: string;
  defaultValues?: TutorialFormValues;
}) {
  const [addLiveTutorial, { isLoading: liveLoading }] =
    useAddLiveTutorialMutation();
  const [updateLiveTutorial, { isLoading: updateLoading }] =
    useUpdateLiveTutorialMutation();
  const [form] = Form.useForm();

  const handleSubmit = async (values: TutorialFormValues) => {
    console.log("Form Submitted:", values);
    try {
      if (defaultValues?._id) {
        await updateLiveTutorial({
          ...values,
        }).unwrap();
      } else {
        await addLiveTutorial({ ...values, topicId }).unwrap();
      }

      form.resetFields();
      if (defaultValues?._id) {
        Success_model("Successfully Updated");
      } else {
        Success_model("Successfully Created");
      }
    } catch (error) {
      Error_model_hook(error);
    }
  };
  useEffect(() => {
    if (defaultValues?._id) {
      form.setFieldsValue(defaultValues);
    }
  }, [defaultValues?._id]);

  return (
    <div>
      <div>
        <div className="text-xl font-semibold">Schedule Live Tutorial</div>
        <div className="text-sm text-gray-500 -mt-1">
          Create a live tutorial session
        </div>
      </div>
      <Form<TutorialFormValues>
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-4 mt-2"
      >
        {/* Title */}
        <Form.Item
          label="Meeting Title *"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="e.g., Live Tutorial Session" />
        </Form.Item>

        {/* Description */}
        <Form.Item label="Description" name="description">
          <TextArea rows={3} placeholder="What will be covered..." />
        </Form.Item>

        {/* Date + startDate */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Date & Time */}
          <Form.Item
            label="Date & Time *"
            name="startDate"
            rules={[{ required: true, message: "Please select date & time" }]}
          >
            <DatePicker
              showTime
              className="w-full"
              format="YYYY-MM-DD HH:mm"
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
            />
          </Form.Item>

          {/* startDate */}
          <Form.Item label="Duration (minutes)" name="duration">
            <Input
              type={"number"}
              min={0}
              placeholder="60"
              className="w-full"
            />
          </Form.Item>
        </div>

        {/* Meeting Link */}
        <Form.Item label="Meet Link" name={["meetingDetails", "link"]}>
          <Input placeholder="https://any-meeting-link/xxx-xxxx-xxx" />
        </Form.Item>

        {/* Recording Link */}
        <Form.Item label="Recording Link" name={["recordingDetails", "link"]}>
          <Input placeholder="https://any-recording-link/xxx-xxxx-xxx" />
        </Form.Item>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <Button>Cancel</Button>

          <Button
            type="primary"
            htmlType="submit"
            loading={liveLoading || updateLoading}
          >
            {defaultValues?._id ? "Update" : "Schedule"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
