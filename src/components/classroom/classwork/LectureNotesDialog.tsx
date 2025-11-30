/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

import { Form, Input, Upload, Button as AntButton, message } from "antd";

import { Error_model_hook, Success_model } from "@/utils/modalHook";
import {
  ILectureNote,
  useAddLectureNoteMutation,
  useUpdateLectureNoteMutation,
} from "@/redux/api/common/lectureNoteApi";

import { multipleFilesUploaderS3 } from "@/lib/handelFileUploderS3";

const { TextArea } = Input;

export default function LectureNotesDialog({
  topicId,
  defaultValues,
}: {
  topicId: string;
  defaultValues?: ILectureNote;
}) {
  const [form] = Form.useForm();
  const [isLoading, setIsloading] = useState(false);

  const [addLecture, { isLoading: addLoading }] = useAddLectureNoteMutation();

  const [updateLecture, { isLoading: updateLoading }] =
    useUpdateLectureNoteMutation();

  const [fileList, setFileList] = useState<any[]>([]);

  // ------------------------------------------------------------------
  // ✅ Load defaultValues into form + prepare Upload preview list
  // ------------------------------------------------------------------
  useEffect(() => {
    if (defaultValues?._id) {
      form.setFieldsValue(defaultValues);

      // Convert server files → Upload fileList format
      const formattedFiles = (defaultValues.files || []).map(
        (f: any, idx: number) => ({
          uid: String(idx + 1),
          name: f.filename,
          status: "done",
          url: f.cdn ? `${f.cdn}/${f.path}` : f.url,
          fileMeta: f, // Keep original data so we can reuse in update
        })
      );

      setFileList(formattedFiles);
    }
  }, [defaultValues?._id]);

  // ------------------------------------------------------------------
  // 🔥 Handle Submit (Create + Update)
  // ------------------------------------------------------------------
  const handleFinish = async (values: any) => {
    try {
      setIsloading(true);

      // Separate existing stored files + new files
      const existingFiles = fileList
        .filter((f: any) => f.status === "done" && f.fileMeta)
        .map((f: any) => f.fileMeta);

      const newUploadFiles = fileList.filter(
        (f: any) => f.originFileObj && f.status !== "done"
      );

      let uploadedNewFiles: any = [];

      if (newUploadFiles.length > 0) {
        uploadedNewFiles = await multipleFilesUploaderS3(
          newUploadFiles.map((f: any) => f.originFileObj)
        );
      }

      const finalFiles = [...existingFiles, ...uploadedNewFiles];

      const payload = {
        ...values,
        files: finalFiles,
        topicId,
        _id: defaultValues?._id,
      };

      console.log("🚀 Final Payload:", payload);

      if (defaultValues?._id) {
        await updateLecture({ id: defaultValues?._id, data: payload }).unwrap();
        Success_model("Lecture Notes Updated Successfully");
      } else {
        await addLecture(payload).unwrap();
        Success_model("Lecture Notes Created Successfully");
      }

      form.resetFields();
      setFileList([]);
    } catch (error) {
      Error_model_hook(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <div>
        <div className="text-xl font-semibold">
          {defaultValues?._id ? "Update Lecture Notes" : "Add Lecture Notes"}
        </div>
        <div className="text-sm text-gray-500 -mt-1">
          Upload lecture files and share with the classroom.
        </div>
      </div>

      {/* FORM */}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="space-y-2 mt-2"
      >
        {/* Title */}
        <Form.Item
          label="Title *"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="e.g., Integration Lecture Notes" />
        </Form.Item>

        {/* Description */}
        <Form.Item label="Description" name="description">
          <TextArea rows={3} placeholder="Brief description..." />
        </Form.Item>

        {/* FILE UPLOAD */}
        <Form.Item label="Files">
          <Upload
            listType="text"
            maxCount={10}
            multiple
            accept="application/pdf"
            fileList={fileList}
            onPreview={(file) => {
              //@ts-ignore
              const url = file.url || URL.createObjectURL(file?.originFileObj);
              window.open(url, "_blank");
            }}
            beforeUpload={(file) => {
              const isPdf = file.type === "application/pdf";
              if (!isPdf) {
                message.error("Only PDF files allowed!");
                return Upload.LIST_IGNORE;
              }
              return false; // prevent auto upload
            }}
            onChange={({ fileList }) => {
              setFileList(fileList);
            }}
          >
            <AntButton>Upload PDF</AntButton>
          </Upload>
        </Form.Item>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading || addLoading || updateLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : defaultValues?._id ? (
              "Update Notes"
            ) : (
              "Add Notes"
            )}
          </Button>
        </div>
      </Form>
    </>
  );
}
