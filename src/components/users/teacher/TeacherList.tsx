/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import UMTable from "@/components/ui/UMTable";
import { ISeller, useGetAllSellersQuery } from "@/redux/api/common/sellerApi";
import { useAppSelector, useDebounced } from "@/redux/hooks";
import fileObjectToLink from "@/utils/fileObjectToLink";
import { DeleteOutlined, EyeOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Space } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function TeacherList() {
  const { userInfo } = useAppSelector((state) => state);

  const role =
    userInfo?.data?.role === "seller" ? "teacher" : userInfo?.data?.role;

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const query: Record<string, any> = {
    limit: size,
    page,
    sortBy,
    sortOrder,
  };

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetAllSellersQuery(query);

  const sellerData = data?.data || [];
  const meta = data?.meta;

  const columns = [
    {
      title: "Image",
      render: (data: any) => {
        const fullName = `${data?.name?.firstName} ${data?.name?.lastName}`;
        return (
          <>
            <Image
              src={fileObjectToLink(data?.image)}
              alt={fullName}
              width={40}
              height={40}
            />
          </>
        );
      },
    },
    {
      title: "Name",
      render: (data: any) => {
        const fullName = `${data?.name?.firstName} ${data?.name?.lastName}`;
        return <>{fullName}</>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      sorter: true,
      render: (data: any) => data && dayjs(data).format("MMM D, YYYY hh:mm A"),
    },
    {
      title: "Contact No.",
      dataIndex: "phoneNumber",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      render: (data: any) => data && dayjs(data).format("MMM D, YYYY hh:mm A"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      // dataIndex: "_id",
      width: 130,
      render: (data: ISeller) => (
        <Space>
          <Dropdown
            menu={{
              items: [
                {
                  key: "details",
                  label: (
                    <Link
                      href={`/${role}/manage-users/teachers/details/${data._id}`}
                    >
                      <Button className="w-full" type="default">
                        <EyeOutlined /> View
                      </Button>
                    </Link>
                  ),
                },
                {
                  key: "classroom",
                  label: (
                    <Link
                      href={`/dashboard/${role}/teacher-list/classroom-list/${data?.userDetails?._id}?roleBaseUserId=${data?._id}`}
                    >
                      <Button className="w-full" type="default">
                        <EyeOutlined /> Classroom
                      </Button>
                    </Link>
                  ),
                },
              ],
            }}
          >
            <button className="text-blue-700">Action</button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };

  const onTableChange = (_: any, __: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field || "");
    setSortOrder(
      order === "ascend" ? "asc" : order === "descend" ? "desc" : ""
    );
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Teacher List</h1>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Input
            size="large"
            placeholder="Search teacher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[260px]"
          />

          {(sortBy || sortOrder || searchTerm) && (
            <Button type="default" onClick={resetFilters}>
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={sellerData}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
}
