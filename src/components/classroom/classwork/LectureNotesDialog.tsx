/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { Form, Input, Select, Upload, Button as AntButton } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useGetAllTopicsQuery } from "@/redux/api/teacher/topicsApi";
import ModalComponent from "@/components/modal/ModalComponents";
import TopicsCom from "../topics/topicsCom";

// ✅ RTK Query

const { TextArea } = Input;

export default function LectureNotesDialog({
  open,
  onClose,
  classRoomId,
}: {
  open: boolean;
  onClose: () => void;
  classRoomId: string;
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // ✅ Get Topics from API
  const { data, isLoading: topicLoading } = useGetAllTopicsQuery({
    classRoomId,
    limit: 9999,
    page: 1,
  });

  const topics = data?.data || [];

  // ✅ Submit Handler (AntD)
  const handleFinish = (values: any) => {
    const files = values.files?.fileList?.map(
      (file: any) => file.originFileObj
    );

    const payload = {
      title: values.title,
      description: values.description,
      classRoomId,
      crTopicId: values.crTopicId,
      files,
    };

    setLoading(true);

    setLoading(false);
    form.resetFields();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add Lecture Notes
          </DialogTitle>
          <DialogDescription>
            Upload lecture files and share with the classroom
          </DialogDescription>
        </DialogHeader>

        {/* ✅ ANT DESIGN FORM */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="space-y-2 mt-2"
        >
          {/* ✅ Title */}
          <Form.Item
            label="Title *"
            name="title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input placeholder="e.g., Integration Lecture Notes" />
          </Form.Item>

          {/* ✅ Description */}
          <Form.Item label="Description" name="description">
            <TextArea rows={3} placeholder="Brief description..." />
          </Form.Item>

          {/* ✅ Topic */}
          <Form.Item
            label="Topic *"
            name="crTopicId"
            rules={[{ required: true, message: "Topic is required" }]}
          >
            <div className="flex gap-2">
              {/* ✅ Select */}
              <Select
                className="flex-1"
                loading={topicLoading}
                placeholder="Select topic"
                options={topics?.map((t: any) => ({
                  label: t.title,
                  value: t._id,
                }))}
              />

              {/* ✅ Plus Button */}
              <ModalComponent
                button={<AntButton type="primary" icon={<Plus size={16} />} />}
              >
                <TopicsCom classRoomId={classRoomId} />
              </ModalComponent>
            </div>
          </Form.Item>

          {/* ✅ File Upload */}
          <Form.Item
            label="Upload Files *"
            name="files"
            valuePropName="fileList"
            rules={[{ required: true, message: "File is required" }]}
          >
            <Upload beforeUpload={() => false} multiple>
              <Button>Select Files</Button>
            </Upload>
          </Form.Item>

          {/* ✅ Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Add Notes"
              )}
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
