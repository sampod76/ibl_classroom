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
import {
  Form,
  Input,
  Select,
  Upload,
  Button as AntButton,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useGetAllTopicsQuery } from "@/redux/api/teacher/topicsApi";
import ModalComponent from "@/components/modal/ModalComponents";
import TopicsCom from "../topics/topicsCom";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { useAddLectureNoteMutation } from "@/redux/api/common/lectureNoteApi";
import { multipleFilesUploaderS3 } from "@/lib/handelFileUploderS3";

// ✅ RTK Query

const { TextArea } = Input;

export default function LectureNotesDialog({ topicId }: { topicId: string }) {
  const [form] = Form.useForm();
  const [isLoading, setIsloading] = useState(false);
  const [addLecture, { isLoading: LectureLoading }] =
    useAddLectureNoteMutation();
  // ✅ Submit Handler (AntD)
  const handleFinish = async (values: any) => {
    try {
      if (values?.files?.length) {
        setIsloading(true);
        const [files] = await Promise.all([
          values?.files?.length
            ? multipleFilesUploaderS3(
                values.files.map((re: any) => re.originFileObj)
              )
            : Promise.resolve(null), // If no images, return null to prevent blocking
        ]);
        values.files = files || [];
      }
      const payload = {
        ...values,

        topicId: topicId,
      };
      console.log("🚀 ~ handleFinish ~ payload:", payload);
      await addLecture(payload).unwrap();
      Success_model("Successfully Created");
      form.resetFields();
    } catch (error) {
      Error_model_hook(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <div>
        <div className="text-xl font-semibold">Add Lecture Notes</div>
        <div className="text-sm text-gray-500 -mt-1">
          Upload lecture files and share with the classroom
        </div>
      </div>

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

        {/* ✅ File Upload */}
        <Form.Item
          label="Files"
          name="files"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          rules={[{ required: true, message: "Please upload a PDF file!" }]}
        >
          <Upload
            listType="picture-card"
            maxCount={5}
            accept="application/pdf"
            multiple={true}
            showUploadList={true}
            beforeUpload={(file) => {
              const isPdf = file.type === "application/pdf";
              const isLt10MB = file.size / 1024 / 1024 < 50; // optional

              if (!isPdf) {
                message.error("Only PDF files are allowed!");
                return Upload.LIST_IGNORE; // STOP upload and STOP adding to list
              }

              if (!isLt10MB) {
                message.error("File size must be smaller than 50MB!");
                return Upload.LIST_IGNORE;
              }

              return false; // allow manual upload
            }}
          >
            <Button>Upload PDF</Button>
          </Upload>
        </Form.Item>

        {/* ✅ Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Add Notes"
            )}
          </Button>
        </div>
      </Form>
    </>
  );
}
