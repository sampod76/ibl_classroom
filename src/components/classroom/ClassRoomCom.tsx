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
  Menu,
  Dropdown,
} from "antd";
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import ShadowCard from "../ui/ShadowCard";

import { BsThreeDotsVertical } from "react-icons/bs";
import UMTable from "../ui/UMTable";
import {
  confirm_modal,
  Error_model_hook,
  Success_model,
} from "@/utils/modalHook";

import CustomImageTag from "../ui/CustomTag/CustomImageTag";
import { IFileAfterUpload } from "../../types/globalType";

import { SiThreedotjs } from "react-icons/si";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { useGetAllClassRoomCategoryQuery } from "@/redux/api/admin/classroomCategory.api";
import {
  useAddClassroomMutation,
  useDeleteClassroomMutation,
  useGetAllClassroomQuery,
  useUpdateClassroomMutation,
} from "@/redux/api/admin/classroom.api";
import { multipleFilesUploaderS3 } from "@/lib/handelFileUploderS3";
import { confirmAction } from "../ui/utils/confirmAction";

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
export default function ClassroomCom() {
  const { data: userInfo } = useAppSelector((state) => state.userInfo);
  const router = useRouter();
  const [form] = Form.useForm();
  const [editId, setEditId] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<IFileAfterUpload | null>(null);
  const [fileLoading, setFileLoading] = useState(false);
  // ✅ Pagination
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);

  // ✅ Fetch Classroom Categories for Dropdown
  const { data: catData, isLoading: caTegoryLoading } =
    useGetAllClassRoomCategoryQuery({
      limit: 999,
    });
  const categories = catData?.data || [];

  // ✅ Classroom APIs
  const { data, isLoading } = useGetAllClassroomQuery({
    page,
    limit: size,
    fields: "classroomCategory",
  });
  const [addClassRoom, { isLoading: addLoading }] = useAddClassroomMutation();
  const [updateClassRoom, { isLoading: updateLoading }] =
    useUpdateClassroomMutation();
  const [deleteClassRoom, { isLoading: deleteLoading }] =
    useDeleteClassroomMutation();

  const tableData = data?.data || [];
  const meta = data?.meta;

  // ✅ Submit Handler
  const onFinish = async (values: any) => {
    try {
      if (values?.bannerImage) {
        setFileLoading(true);
        const [bannerImage] = await Promise.all([
          values?.bannerImage?.length
            ? multipleFilesUploaderS3(
                values.bannerImage.map((re: any) => re.originFileObj)
              )
            : Promise.resolve(null), // If no images, return null to prevent blocking
        ]);
        values.bannerImage = bannerImage ? bannerImage[0] : undefined;
      }
      if (editId) {
        await updateClassRoom({ id: editId, data: values }).unwrap();
        Success_model("Classroom Updated Successfully");
        setEditId(null);
      } else {
        await addClassRoom(values).unwrap();
        Success_model("Classroom Created Successfully");
      }

      form.resetFields();
    } catch (error) {
      Error_model_hook(error);
    } finally {
      setFileLoading(false);
    }
  };

  // ✅ Delete Handler

  const handleDelete = (id: string) => {
    confirmAction({
      title: "Delete Classroom?",
      content: "Are you sure you want to delete this subject?",
      okText: "Delete",
      okType: "danger",
      onConfirm: async () => {
        await deleteClassRoom(id).unwrap();
      },
    });
  };
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success("Class Code Copied ✅");
  };

  const actionMenu = (record: any) => ({
    items: [
      {
        key: "edit",
        label: "Edit",
        icon: <EditOutlined />,
        onClick: () => {
          setEditId(record._id);
          form.setFieldsValue({
            name: record.name,
            classCode: record.classCode,
            description: record.description,
            classRoomCategoryId: record?.classRoomCategoryId,
            status: record?.status,
          });
          setBannerImage(record?.bannerImage);
        },
      },
      {
        key: "delete",
        label: "Delete",
        icon: <DeleteOutlined />,
        onClick: () => handleDelete(record._id),
      },
      {
        key: "view-subject",
        label: "View Subject",
        icon: <EyeOutlined />,
        onClick: () => {
          router.push(
            `/dashboard/${userInfo?.role}/classroom/subjects?classRoomId=${record._id}&classroomName=${record.name}`
          );
        },
      },
    ],
  });

  // ✅ Table Columns
  const columns: TableProps<any>["columns"] = [
    {
      title: "",
      dataIndex: "bannerImage",
      width: 100,
      render: (record: any) => (
        <div>
          <CustomImageTag
            src={record}
            width={550}
            height={550}
            preview={true}
            className="h-8 w-8 rounded-full shadow-lg md:h-12 md:w-12"
            alt=""
          />
        </div>
      ),
    },
    {
      title: "Class Name",
      dataIndex: "name",
    },

    {
      title: "Class Code",
      dataIndex: "classCode",
      width: 150,
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
    {
      title: "Category",
      render: (record: any) => record?.classroomCategory?.title || "N/A",
    },
    {
      title: "status",
      dataIndex: "status",
      render: (status: string) => getStatusTag(status),
    },
    {
      title: "Action",
      width: 80,
      fixed: "right",
      render: (record: any) => (
        <Dropdown
          menu={actionMenu(record)}
          trigger={["hover"]}
          placement="bottomRight"
        >
          <BsThreeDotsVertical style={{ fontSize: 20, cursor: "pointer" }} />
        </Dropdown>
      ),
    },
  ];

  return (
    <Row gutter={24}>
      {/* ✅ LEFT FORM */}
      <Col md={24} xl={8}>
        <ShadowCard>
          <h2>{editId ? "Edit Classroom" : "Create Classroom"}</h2>

          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              label="Classroom Category"
              name="classRoomCategoryId"
              rules={[{ required: true, message: "Category is required" }]}
            >
              <Select loading={caTegoryLoading} placeholder="Select Category">
                {categories.map((cat: any) => (
                  <Select.Option key={cat._id} value={cat._id}>
                    {cat.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Classroom Name"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder="Enter classroom name" />
            </Form.Item>

            <Form.Item
              label="Class Code"
              name="classCode"
              rules={[{ required: true, message: "Class code required" }]}
              // Backend-এ যে value যাবে তা এখানে নিয়ন্ত্রণ হচ্ছে
              getValueFromEvent={(e) => {
                const v = e.target.value.replace(/^CC-/, ""); // user যেন CC- না লিখতে পারে
                return "CC-" + v;
              }}
              // UI-তে যেন শুধু suffix দেখা যায়
              getValueProps={(value) => ({
                value: value?.replace(/^CC-/, ""),
              })}
            >
              <Input addonBefore="CC-" placeholder="Ex: 2141" />
            </Form.Item>
            <Form.Item label="Status" name="status" initialValue="active">
              <Select>
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"

              //   rules={[{ required: true, message: 'Class code required' }]}
            >
              <Input.TextArea placeholder="Description" />
            </Form.Item>

            <div className="flex justify-start items-start gap-3">
              <Form.Item
                label="Banner Image"
                name="bannerImage"
                valuePropName="fileList"
                getValueFromEvent={(e) =>
                  Array.isArray(e) ? e : e && e.fileList
                }
              >
                <Upload
                  // action="/upload"
                  multiple={false}
                  listType="picture-card"
                  maxCount={1}
                  showUploadList={true}
                  accept="image/*"
                  beforeUpload={(file) => {
                    return false; // Stop automatic upload
                  }}
                  customRequest={() => {}}
                >
                  <Button className="!font-sm !overflow-hidden">
                    Upload Image
                  </Button>
                </Upload>
              </Form.Item>

              {bannerImage && (
                <CustomImageTag
                  src={bannerImage}
                  width={500}
                  height={500}
                  className="mx-3 h-24 w-28 rounded-md border"
                  preview={true}
                />
              )}
            </div>

            <Button
              type="primary"
              loading={addLoading || updateLoading}
              htmlType="submit"
              block
            >
              {editId ? "Update Classroom" : "Create Classroom"}
            </Button>

            {editId && (
              <Button
                danger
                block
                style={{ marginTop: 10 }}
                onClick={() => {
                  setEditId(null);
                  setBannerImage(null);
                  form.resetFields();
                }}
              >
                Cancel Edit
              </Button>
            )}
          </Form>
        </ShadowCard>
      </Col>

      {/* ✅ RIGHT TABLE */}
      <Col xl={16} md={24}>
        <ShadowCard>
          <h2>All Classrooms</h2>

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
  );
}
