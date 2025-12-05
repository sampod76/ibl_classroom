/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  Row,
  Col,
  Space,
  message,
  Tag,
  TableProps,
  Popover,
} from "antd";
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import {
  confirm_modal,
  Error_model_hook,
  Success_model,
} from "@/utils/modalHook";

import ShadowCard from "@/components/ui/ShadowCard";
import UMTable from "@/components/ui/UMTable";
import { useSearchParams } from "next/navigation";

import CustomImageTag from "@/components/ui/CustomTag/CustomImageTag";
import {
  useAddSubjectMutation,
  useDeleteSubjectMutation,
  useGetAllSubjectQuery,
  useUpdateSubjectMutation,
} from "@/redux/api/common/subjectApi";
import { useGetSingleClassroomQuery } from "@/redux/api/admin/classroom.api";
import { multipleFilesUploaderS3 } from "@/lib/handelFileUploderS3";
import { confirmAction } from "@/components/ui/utils/confirmAction";
import { LoadingSkeleton } from "@/components/ui/skeleton";
import { IFileAfterUpload } from "@/types/globalType";
import fileObjectToLink from "@/utils/fileObjectToLink";
import { File } from "lucide-react";
const getStatusTag = (status: string) => {
  const normalized = status?.toLowerCase();

  if (normalized === "active") {
    return <Tag color="green">Active</Tag>;
  }

  if (normalized === "inactive" || normalized === "deactivate") {
    return <Tag color="red">Inactive</Tag>;
  }

  return <Tag color="default">{status || "N/A"}</Tag>;
};
const shortenName = (name: string, max = 20) =>
  name.length <= max ? name : name.substring(0, max) + "...";
export default function SubjectCom() {
  const params = useSearchParams();
  const classRoomId = params.get("classRoomId");
  const classroomName = params.get("classroomName");
  const [form] = Form.useForm();
  const [editId, setEditId] = useState<string | null>(null);
  const [syllabusFiles, setSyllabusFiles] = useState<IFileAfterUpload[] | null>(
    null
  );
  const [submitloading, setSubmitLoading] = useState(false);

  // ✅ Pagination
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(999);

  // ✅ Subject APIs
  const { data, isLoading } = useGetAllSubjectQuery(
    {
      page,
      limit: size,
      fields: "classRoom",
      classRoomId,
    },
    {
      skip: !Boolean(classRoomId),
    }
  );
  const { data: singleClassRoom, isLoading: scLoading } =
    useGetSingleClassroomQuery(classRoomId as string, {
      skip: !Boolean(classRoomId),
    });

  const [addSubject, { isLoading: addLoading }] = useAddSubjectMutation();
  const [updateSubject, { isLoading: updateLoading }] =
    useUpdateSubjectMutation();
  const [deleteSubject, { isLoading: deleteLoading }] =
    useDeleteSubjectMutation();

  const tableData = data?.data || [];

  const meta = data?.meta;

  // ✅ Submit Handler
  const onFinish = async (values: any) => {
    console.log("🚀 ~ onFinish ~ values:", values);
    try {
      if (values?.syllabusFiles) {
        setSubmitLoading(true);
        const [syllabusFiles] = await Promise.all([
          values?.syllabusFiles?.length
            ? multipleFilesUploaderS3(
                values.syllabusFiles.map((re: any) => re.originFileObj)
              )
            : Promise.resolve(null), // If no images, return null to prevent blocking
        ]);
        values.syllabusFiles = syllabusFiles ? syllabusFiles : undefined;
      }
      if (editId) {
        await updateSubject({ id: editId, data: values }).unwrap();
        Success_model("Subject Updated Successfully");
        setEditId(null);
      } else {
        await addSubject({
          ...values,
          classRoomId: classRoomId,
        }).unwrap();
        Success_model("Subject Created Successfully");
      }

      form.resetFields();
    } catch (error) {
      Error_model_hook(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  // ✅ Delete Handler
  const handleDelete = (id: string) => {
    confirmAction({
      title: "Delete Subject?",
      content: "Are you sure you want to delete this subject?",
      okText: "Delete",
      okType: "danger",
      onConfirm: async () => {
        await deleteSubject(id).unwrap();
      },
    });
  };
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success("Subject Code Copied ✅");
  };

  // ✅ Table Columns
  const columns: TableProps<any>["columns"] = [
    {
      title: "Subject Name",
      dataIndex: "title",
    },

    {
      title: "Subject Code",
      dataIndex: "code",
      width: 200,
      render: (text: string) => (
        <Space>
          <span>{text}</span>
          <CopyOutlined
            style={{ cursor: "pointer", color: "#1677ff" }}
            onClick={() => handleCopy(text)}
          />
        </Space>
      ),
    },
    // {
    //   title: 'Class Name',
    //   render: (record: any) => record?.classRoomDetails[0]?.title || 'N/A',
    // },
    {
      title: "ClassRoom Code",
      //   render: (record: any) => record?.classRoomDetails[0]?.classCode || 'N/A',
      render: (record: any) => (
        <Space>
          <span>{record?.classRoomDetails[0]?.classCode}</span>
          <CopyOutlined
            style={{ cursor: "pointer", color: "#1677ff" }}
            onClick={() => handleCopy(record?.classRoomDetails[0]?.classCode)}
          />
        </Space>
      ),
    },
    {
      title: "status",
      dataIndex: "status",
      width: 150,
      render: (status: string) => getStatusTag(status),
    },
    {
      title: "Syllabus",
      width: 150,
      render: (record: any) => {
        const files = record?.syllabusFiles || [];

        return (
          <Popover
            trigger="click"
            placement="left"
            content={
              <div className="flex flex-col gap-2 max-w-[200px]">
                {files.length > 0 ? (
                  files.map((file: any, i: number) => (
                    <a
                      key={i}
                      href={fileObjectToLink(file)}
                      target="_blank"
                      className="flex items-center gap-1 hover:text-blue-600 transition text-xs"
                    >
                      <File className="h-3 w-3" />
                      <span className="truncate">{file.filename}</span>
                    </a>
                  ))
                ) : (
                  <span className="text-gray-500 text-xs">No files</span>
                )}
              </div>
            }
          >
            <Space className="cursor-pointer">
              <Tag color="blue">{files.length} Files</Tag>
              <EyeOutlined style={{ color: "#1677ff" }} />
            </Space>
          </Popover>
        );
      },
    },

    {
      title: "Action",

      fixed: "right",
      render: (record: any) => (
        <Space>
          <EditOutlined
            style={{ color: "#1677ff", fontSize: 18, cursor: "pointer" }}
            onClick={() => {
              setEditId(record._id);
              form.setFieldsValue({
                title: record.title,
                code: record.code,
                // description: record.description,
                // SubjectCategoryId: record?.SubjectCategoryId,
                status: record?.status,
              });
              setSyllabusFiles(record?.syllabusFiles);
            }}
          />
          <DeleteOutlined
            style={{ color: "red", fontSize: 18, cursor: "pointer" }}
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
    },
  ];
  if (scLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <div>
      <div className="my-2">
        <h1 className="text-center border-b-2">
          Class Room : {singleClassRoom?.name}
        </h1>
      </div>
      <Row gutter={24}>
        {/* ✅ LEFT FORM */}
        <Col md={24} xl={8}>
          <ShadowCard>
            <h2>{editId ? "Edit Subject" : "Create Subject"}</h2>

            <Form layout="vertical" form={form} onFinish={onFinish}>
              <Form.Item
                label="Subject Name"
                name="title"
                rules={[{ required: true, message: "Name is required" }]}
              >
                <Input placeholder="Enter Subject name" />
              </Form.Item>

              <Form.Item
                label="Subject Code"
                name="code"
                rules={[{ required: true, message: "Code required" }]}
                // backend এ যা যাবে
                getValueFromEvent={(e) => {
                  const v = e.target.value.replace(/^SC-/, ""); // user যেন SC- না লেখে
                  return "SC-" + v;
                }}
                // UI তে শুধু suffix দেখাবে
                getValueProps={(value) => ({
                  value: value?.replace(/^SC-/, ""),
                })}
              >
                <Input addonBefore="SC-" placeholder="Ex: 2141" />
              </Form.Item>
              <div className="flex justify-start items-start gap-3">
                {/* 📌 Syllabus PDF Upload */}
                <Form.Item
                  label="Syllabus (PDF)"
                  name="syllabusFiles"
                  valuePropName="fileList"
                  getValueFromEvent={(e) =>
                    Array.isArray(e) ? e : e?.fileList
                  }
                >
                  <Upload
                    multiple={true}
                    maxCount={5}
                    listType="text" // because PDF does not need image preview
                    accept="application/pdf"
                    beforeUpload={(file) => {
                      // শুধুমাত্র PDF allow করবে
                      const isPdf = file.type === "application/pdf";
                      if (!isPdf) {
                        message.error(`${file.name} is not a PDF file`);
                      }
                      return false; // auto upload বন্ধ
                    }}
                    customRequest={() => {}} // required placeholder
                  >
                    <Button className="!font-sm !overflow-hidden">
                      Upload PDFs
                    </Button>
                  </Upload>
                </Form.Item>

                {/* 📌 চাইলে Selected PDF Count দেখানোর UI */}
                {syllabusFiles && syllabusFiles?.length > 0 && (
                  <div className="p-2 border rounded-md">
                    <p className="text-sm font-medium">Selected PDFs:</p>
                    {syllabusFiles.map((file, index) => (
                      <p key={index} className="text-xs text-gray-600">
                        • {file.filename}
                      </p>
                    ))}
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      {syllabusFiles.map((file: any, i: number) => (
                        <a
                          key={i}
                          href={fileObjectToLink(file)}
                          target="_blank"
                          className="flex items-center gap-1 hover:text-blue-600 transition"
                          title={file.filename}
                        >
                          <File className="h-3.5 w-3.5" />
                          <span className="max-w-[120px] truncate">
                            {shortenName(file.filename)}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Form.Item label="Status" name="status" initialValue="active">
                <Select>
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="inactive">Inactive</Select.Option>
                </Select>
              </Form.Item>
              {/* <Form.Item
              label="Description"
              name="description"

              //   rules={[{ required: true, message: 'Class code required' }]}
            >
              <Input.TextArea placeholder="Description" />
            </Form.Item> */}

              <Button
                type="primary"
                loading={addLoading || updateLoading}
                htmlType="submit"
                block
              >
                {editId ? "Update Subject" : "Create Subject"}
              </Button>

              {editId && (
                <Button
                  danger
                  block
                  style={{ marginTop: 10 }}
                  onClick={() => {
                    setEditId(null);
                    form.resetFields();
                  }}
                >
                  Cancel Edit
                </Button>
              )}
            </Form>
          </ShadowCard>
          <ShadowCard>
            <>
              <div className="space-y-3">
                {/* Class Title */}
                <h3 className="text-xl font-semibold text-gray-800">
                  Class Room:{" "}
                  <span className="text-blue-600">{singleClassRoom?.name}</span>
                </h3>

                {/* Class Code + Copy */}
                <p className="text-base text-gray-700 flex items-center gap-2">
                  <span className="font-medium">Class Code:</span>
                  <span className="px-2 py-1 bg-gray-100 rounded-md border">
                    {singleClassRoom?.classCode}
                  </span>
                  <CopyOutlined
                    style={{
                      cursor: "pointer",
                      color: "#1677ff",
                      fontSize: "18px",
                    }}
                    onClick={() =>
                      handleCopy(singleClassRoom?.classCode as string)
                    }
                  />
                </p>

                {/* Banner Image */}
                <CustomImageTag
                  src={singleClassRoom?.bannerImage}
                  width={500}
                  height={500}
                  className="max-h-60 rounded-lg shadow-sm object-cover border"
                  alt="Classroom Banner"
                />
              </div>
            </>
          </ShadowCard>
        </Col>

        {/* ✅ RIGHT TABLE */}
        <Col xl={16} md={24}>
          <ShadowCard>
            <h2>All Subjects</h2>

            <UMTable
              loading={isLoading}
              columns={columns}
              dataSource={tableData}
              pageSize={size}
              totalPages={meta?.total}
              showSizeChanger={true}
              onPaginationChange={(p, s) => {
                setPage(p);
                setSize(s);
              }}
            />
          </ShadowCard>
        </Col>
      </Row>
    </div>
  );
}
