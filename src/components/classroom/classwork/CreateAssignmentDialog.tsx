/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form, Input, InputNumber, DatePicker, Upload, message } from "antd";
import dayjs from "dayjs";

import {
  FileText,
  CheckCircle2,
  Calendar,
  Paperclip,
  Trash2,
  Upload as UploadIcon,
  X,
  Loader2,
} from "lucide-react";

import { useState, useEffect } from "react";
import { multipleFilesUploaderS3 } from "@/lib/handelFileUploderS3";
import {
  useAddAssignmentClassroomMutation,
  useUpdateAssignmentClassroomMutation,
} from "@/redux/api/common/assignmentApi";

export default function AssignmentForm({ topicId, defaultValues }: any) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [addAssignment, { isLoading: addLoading }] =
    useAddAssignmentClassroomMutation();

  const [updateAssignment, { isLoading: updateLoading }] =
    useUpdateAssignmentClassroomMutation();

  const isUpdate = Boolean(defaultValues?._id);

  // ---------------------- LOAD DEFAULT VALUES ----------------------
  useEffect(() => {
    if (defaultValues?._id) {
      form.setFieldsValue({
        ...defaultValues,
        startDate: dayjs(defaultValues.startDate),
        endDate: dayjs(defaultValues.endDate),
      });

      setFileList(
        defaultValues.attachments?.map((f: any, i: number) => ({
          uid: String(i + 1),
          name: f.filename,
          status: "done",
          url: f.cdn ? `${f.cdn}/${f.path}` : f.url,
          fileMeta: f,
        })) || []
      );
    }
  }, [defaultValues?._id]);

  // Disable past dates
  const disablePastDates = (current: any) =>
    current && current < dayjs().startOf("day");

  // ---------------------- FILE PREVIEW ----------------------
  const handleFilePreview = (file: any) => {
    const url = file.url || URL.createObjectURL(file.originFileObj);
    window.open(url, "_blank");
  };

  // ---------------------- FORM SUBMIT ----------------------
  const onFinish = async (values: any) => {
    console.log("🚀 ~ onFinish ~ values:", values);
    // MARK VALIDATION
    if (Number(values.totalMark) <= 0)
      return message.error("Total Mark must be greater than 0");
    if (Number(values.passMark) <= 0)
      return message.error("Pass Mark must be greater than 0");
    if (Number(values.passMark) > Number(values.totalMark))
      return message.error("Pass Mark cannot exceed Total Mark");

    // DATE VALIDATION
    if (dayjs(values.endDate).isBefore(values.startDate))
      return message.error("End Date must be after Start Date");

    setIsLoading(true);

    const existingFiles = fileList
      .filter((f: any) => f.status === "done" && f.fileMeta)
      .map((f: any) => f.fileMeta);

    const newFiles = fileList.filter(
      (f: any) => f.originFileObj && f.status !== "done"
    );

    let uploaded: any[] = [];

    if (newFiles.length > 0) {
      uploaded = await multipleFilesUploaderS3(
        newFiles.map((f: any) => f.originFileObj)
      );
    }

    const payload = {
      ...values,
      topicId,
      startDate: dayjs(values.startDate).toISOString(),
      endDate: dayjs(values.endDate).toISOString(),
      attachments: [...existingFiles, ...uploaded],
    };

    try {
      if (isUpdate) {
        await updateAssignment({
          id: defaultValues._id,
          data: payload,
        }).unwrap();
        message.success("Assignment Updated Successfully");
      } else {
        await addAssignment(payload).unwrap();
        message.success("Assignment Created Successfully");
        form.resetFields();
        setFileList([]);
      }
    } catch (error) {
      message.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------------- UI START ----------------------
  return (
    <div className="overflow-hidden p-4 rounded-2xl border bg-white shadow-sm">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="p-5 space-y-6"
      >
        {/* GENERAL INFO */}
        <div>
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <FileText className="w-4 h-4" />
            <h2 className="uppercase text-xs font-semibold">
              General Information
            </h2>
          </div>

          <Form.Item
            name="title"
            rules={
              !isUpdate
                ? [{ required: true, message: "Title is required" }]
                : []
            }
          >
            <Input placeholder="Assignment Title" className="h-10" />
          </Form.Item>
        </div>

        {/* INSTRUCTIONS */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-indigo-600">
              <CheckCircle2 className="w-4 h-4" />
              <h2 className="uppercase text-xs font-semibold">Instructions</h2>
            </div>

            <button
              type="button"
              onClick={() =>
                form.setFieldValue("instructions", [
                  ...(form.getFieldValue("instructions") || []),
                  { title: "" },
                ])
              }
              className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full text-xs"
            >
              + Add Step
            </button>
          </div>

          <Form.List name="instructions">
            {(fields, { remove }) => (
              <div className="space-y-2">
                {fields.map(({ key, name }, index) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="w-6 text-center text-xs">{index + 1}</span>

                    <Form.Item
                      name={[name, "title"]}
                      className="flex-1"
                      rules={
                        !isUpdate
                          ? [{ required: true, message: "Required" }]
                          : []
                      }
                    >
                      <Input
                        className="h-10"
                        placeholder={`Step ${index + 1}`}
                      />
                    </Form.Item>

                    <button
                      type="button"
                      onClick={() => remove(name)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Form.List>
        </div>

        {/* SCORING + TIMELINE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SCORING */}
          <div>
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <h2 className="uppercase text-xs font-semibold">Scoring</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Form.Item
                name="totalMark"
                label="Total"
                rules={!isUpdate ? [{ required: true }] : []}
              >
                <Input
                  placeholder="100"
                  type="number"
                  min={0}
                  className="w-full h-10"
                />
              </Form.Item>

              <Form.Item
                name="passMark"
                label="Pass"
                rules={!isUpdate ? [{ required: true }] : []}
              >
                <Input
                  type="number"
                  placeholder="40"
                  min={0}
                  className="w-full h-10"
                />
              </Form.Item>
            </div>
          </div>

          {/* TIMELINE */}
          <div>
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <Calendar className="w-4 h-4" />
              <h2 className="uppercase text-xs font-semibold">Timeline</h2>
            </div>

            <Form.Item
              name="startDate"
              label="Start"
              rules={!isUpdate ? [{ required: true }] : []}
            >
              <DatePicker
                disabledDate={disablePastDates}
                showTime
                className="w-full h-10"
              />
            </Form.Item>

            <Form.Item
              name="endDate"
              label="End"
              rules={!isUpdate ? [{ required: true }] : []}
            >
              <DatePicker
                disabledDate={disablePastDates}
                showTime
                className="w-full h-10"
              />
            </Form.Item>
          </div>
        </div>

        {/* RESOURCES */}
        <div>
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <Paperclip className="w-4 h-4" />
            <h2 className="uppercase text-xs font-semibold">Resources</h2>
          </div>

          <div className="border-2 border-dashed p-4 rounded-xl bg-slate-50">
            <Upload
              multiple
              fileList={fileList}
              beforeUpload={() => false}
              onChange={({ fileList }) => setFileList(fileList)}
            >
              <div className="flex flex-col items-center">
                <UploadIcon className="w-6 h-6 text-indigo-500" />
                <p className="text-sm text-slate-700">Click to upload files</p>
              </div>
            </Upload>
          </div>

          {/* FILE LIST WITH PREVIEW */}
          {fileList.length > 0 && (
            <div className="space-y-2 mt-3">
              {fileList.map((f: any, i: number) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-2 rounded-lg border bg-white"
                >
                  {/* CLICK TO PREVIEW */}
                  <div
                    onClick={() => handleFilePreview(f)}
                    className="cursor-pointer truncate text-sm text-indigo-600 hover:underline"
                  >
                    {f.name}
                  </div>

                  {/* REMOVE FILE */}
                  <X
                    className="w-4 h-4 text-slate-400 hover:text-red-500 cursor-pointer"
                    onClick={() =>
                      setFileList(fileList.filter((_, idx) => idx !== i))
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER BUTTONS */}
        <div className="pt-3 border-t flex justify-end gap-3">
          <button
            type="button"
            onClick={() => form.resetFields()}
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            Cancel/Reset
          </button>

          <button
            type="submit"
            disabled={isLoading || addLoading || updateLoading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            {(isLoading || addLoading || updateLoading) && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}

            {isUpdate ? "Update Assignment" : "Create Assignment"}
          </button>
        </div>
      </Form>
    </div>
  );
}
