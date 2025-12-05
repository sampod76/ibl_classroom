/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Row,
  Col,
  Space,
  Dropdown,
  Menu,
} from "antd";
import ShadowCard from "../ui/ShadowCard";

import { useDebounced } from "@/redux/hooks";

import UMTable from "../ui/UMTable";
import {
  confirm_modal,
  Error_model_hook,
  Success_model,
} from "@/utils/modalHook";
import Link from "next/link";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  useAddClassRoomCategoryMutation,
  useDeleteClassRoomCategoryMutation,
  useGetAllClassRoomCategoryQuery,
  useUpdateClassRoomCategoryMutation,
} from "@/redux/api/admin/classroomCategory.api";
import { confirmAction } from "../ui/utils/confirmAction";

interface CategoryType {
  _id?: string;
  title: string;
  serial_number?: number;
  status: string;
}

export default function ClassroomCategoryCom() {
  const [form] = Form.useForm();
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ✅ EDIT MODE
  const [editId, setEditId] = useState<string | null>(null);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  // ✅ API Hooks
  const [addClassRoomCategory, { isLoading: cLoading }] =
    useAddClassRoomCategoryMutation();

  const [updateClassRoomCategory, { isLoading: uLoading }] =
    useUpdateClassRoomCategoryMutation();

  const [deleteClassRoomCategory, { isLoading: dLoading }] =
    useDeleteClassRoomCategoryMutation();

  const { data, isLoading, isFetching } = useGetAllClassRoomCategoryQuery({
    ...query,
  });

  const tableData = data?.data || [];
  const meta = data?.meta;

  // ✅ Submit Handler (Create / Update)
  const onFinish = async (values: any) => {
    try {
      if (editId) {
        // ✅ UPDATE MODE
        await updateClassRoomCategory({
          id: editId,
          data: values,
        }).unwrap();
        Success_model("Successfully Updated");
        setEditId(null);
      } else {
        // ✅ CREATE MODE
        await addClassRoomCategory(values).unwrap();
        Success_model("Successfully Created");
      }

      form.resetFields();
    } catch (error) {
      Error_model_hook(error);
    }
  };

  // ✅ Delete Action

  const handleDelete = (id: string) => {
    confirmAction({
      title: "Delete Classroom?",
      content: "Are you sure you want to delete this?",
      okText: "Delete",
      okType: "danger",
      onConfirm: async () => {
        await deleteClassRoomCategory(id).unwrap();
      },
    });
  };

  // ✅ Table Columns
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (data: any) => <p className="line-clamp-2">{data}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 100,
    },
    {
      title: "Action",
      width: 100,
      render: (record: any) => (
        <Space size="middle">
          {/* ✅ EDIT ICON */}
          <EditOutlined
            style={{ color: "#1677ff", fontSize: 18, cursor: "pointer" }}
            onClick={() => {
              setEditId(record._id);
              form.setFieldsValue({
                title: record.title,
                status: record.status,
              });
            }}
          />

          {/* ✅ DELETE ICON */}
          <DeleteOutlined
            style={{ color: "red", fontSize: 18, cursor: "pointer" }}
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };

  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  return (
    <div className="">
      <Row gutter={24}>
        {/* ✅ LEFT FORM */}
        <Col md={24} xl={8}>
          <ShadowCard>
            <h2>
              {editId ? "Edit Classroom Category" : "Add Classroom Category"}
            </h2>

            <Form layout="vertical" form={form} onFinish={onFinish}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Title is required" }]}
              >
                <Input placeholder="Enter title" />
              </Form.Item>

              <Form.Item label="Status" name="status" initialValue="active">
                <Select>
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="inactive">Inactive</Select.Option>
                </Select>
              </Form.Item>

              <Button type="primary" htmlType="submit" block>
                {editId ? "Update Category" : "Save Category"}
              </Button>

              {/* ✅ Cancel Edit Button */}
              {editId && (
                <Button
                  style={{ marginTop: 10 }}
                  danger
                  block
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
        </Col>

        {/* ✅ RIGHT TABLE */}
        <Col xl={16} md={24}>
          <ShadowCard>
            <h2>All Classroom Categories</h2>
            <UMTable
              loading={isLoading || isFetching}
              columns={columns}
              dataSource={tableData}
              pageSize={size}
              totalPages={meta?.total}
              showSizeChanger={true}
              onPaginationChange={onPaginationChange}
              onTableChange={onTableChange}
              showPagination={true}
            />
          </ShadowCard>
        </Col>
      </Row>
    </div>
  );
}
