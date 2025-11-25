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
  TableColumnsType,
} from "antd";

import { useAppSelector, useDebounced } from "@/redux/hooks";

import {
  confirm_modal,
  Error_model_hook,
  Success_model,
} from "@/utils/modalHook";
import Link from "next/link";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  useAddTopicsMutation,
  useDeleteTopicsMutation,
  useGetAllTopicsQuery,
  useUpdateTopicsMutation,
} from "@/redux/api/teacher/topicsApi";
import ShadowCard from "@/components/ui/ShadowCard";
import UMTable from "@/components/ui/UMTable";

export default function TopicsCom({ classRoomId }: { classRoomId: string }) {
  const [form] = Form.useForm();
  const query: Record<string, any> = {};

  const { data: userInfo, isLoading: userInfoLoading } = useAppSelector(
    (state) => state.userInfo
  );
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
  const [addTopics, { isLoading: cLoading }] = useAddTopicsMutation();

  const [updateTopics, { isLoading: uLoading }] = useUpdateTopicsMutation();

  const [deleteTopics, { isLoading: dLoading }] = useDeleteTopicsMutation();

  const { data, isLoading, isFetching } = useGetAllTopicsQuery({
    ...query,
  });

  const tableData = data?.data || [];
  const meta = data?.meta;

  // ✅ Submit Handler (Create / Update)
  const onFinish = async (values: any) => {
    try {
      if (editId) {
        // ✅ UPDATE MODE
        await updateTopics({
          id: editId,
          data: values,
        }).unwrap();
        Success_model("Successfully Updated");
        setEditId(null);
      } else {
        // ✅ CREATE MODE
        await addTopics({ ...values, classRoomId }).unwrap();
        Success_model("Successfully Created");
      }

      form.resetFields();
    } catch (error) {
      Error_model_hook(error);
    }
  };

  // ✅ Delete Action
  const handleDelete = (id: string) => {
    confirm_modal(`Are you sure you want to delete`).then(async (res) => {
      try {
        const res = await deleteTopics(id).unwrap();
        if (res?.success == false) {
          Error_model_hook(res?.message);
        } else {
          Success_model("Category Successfully Deleted");
        }
      } catch (error: any) {
        Error_model_hook(error.message);
      }
    });
  };

  // ✅ Table Columns
  const columns: TableColumnsType<any> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "_id",
      render: (data: any) => <p className="line-clamp-2">{data}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 100,
      key: "_id",
    },
    {
      title: "Action",
      width: 100,
      key: "_id",
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
                <Input placeholder="Enter title " />
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
            <h2>All Topic</h2>
            <UMTable
              loading={isLoading || userInfoLoading || isFetching}
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
