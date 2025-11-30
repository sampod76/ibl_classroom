/* eslint-disable @typescript-eslint/no-explicit-any */
import ShadowCard from "@/components/ui/ShadowCard";
import {
  ITopis,
  useAddTopicsMutation,
  useUpdateTopicsMutation,
} from "@/redux/api/teacher/topicsApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { Button, Col, Form, Input, Select, Modal } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";

export default function CreateUpdateTopicsCom({
  subjectId,
  defaultValue,
}: {
  subjectId: string;
  defaultValue?: ITopis;
}) {
  const { userInfo, modal } = useAppSelector((state) => state);
  const [form] = Form.useForm();

  const [addTopics, { isLoading: cLoading }] = useAddTopicsMutation();
  const [updateTopics, { isLoading: uLoading }] = useUpdateTopicsMutation();

  // =========================
  //  ✔ Load Default Value (Edit Mode)
  // =========================
  useEffect(() => {
    if (defaultValue && defaultValue?._id) {
      form.setFieldsValue({
        title: defaultValue.title,
        status: defaultValue.status,
        objective:
          defaultValue.objective?.map((obj) => ({
            title: obj.title || "",
          })) || [],
      });
    }
  }, [defaultValue?._id]);

  const onFinish = async (values: any) => {
    try {
      if (defaultValue?._id) {
        await updateTopics({
          id: defaultValue?._id,
          data: values,
        }).unwrap();

        Success_model("Successfully Updated");
      } else {
        await addTopics({ ...values, subjectId }).unwrap();
        Success_model("Successfully Created");
      }

      form.resetFields();
    } catch (error) {
      Error_model_hook(error);
    }
  };

  return (
    <div>
      <Col md={24}>
        <div>
          <h2>{defaultValue?._id ? "Edit Unit" : "Add Unit"}</h2>

          <Form layout="vertical" form={form} onFinish={onFinish}>
            {/* Title */}
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input placeholder="Enter title " />
            </Form.Item>

            {/* OBJECTIVE LIST */}
            <Form.List name="objective">
              {(fields, { add, remove }) => (
                <div className="space-y-3">
                  <label className="font-medium text-base">Objectives</label>

                  {fields.map(({ key, name, ...restField }) => (
                    <div
                      key={key}
                      className="flex gap-2 items-start border p-3 rounded-md"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "title"]}
                        className="flex-1"
                        rules={[
                          { required: true, message: "Objective is required" },
                        ]}
                      >
                        <Input placeholder="Objective title" />
                      </Form.Item>

                      <Button
                        danger
                        icon={<MinusCircleOutlined />}
                        onClick={() => {
                          Modal.confirm({
                            title: "Are you sure?",
                            content:
                              "Do you really want to remove this objective?",
                            okText: "Yes, Remove",
                            okType: "danger",
                            cancelText: "Cancel",
                            onOk() {
                              remove(name);
                            },
                          });
                        }}
                      />
                    </div>
                  ))}

                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Objective
                  </Button>
                </div>
              )}
            </Form.List>

            {/* Status */}
            <Form.Item label="Status" name="status" initialValue="active">
              <Select>
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
              </Select>
            </Form.Item>

            <br />

            {/* Submit / Reset */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <Button
                loading={cLoading || uLoading}
                type="primary"
                htmlType="submit"
                block
              >
                {defaultValue?._id ? "Update Unit" : "Save Unit"}
              </Button>

              {defaultValue?._id ? (
                <Button
                  danger
                  block
                  onClick={() => {
                    form.resetFields();
                  }}
                >
                  Cancel Edit
                </Button>
              ) : (
                <Button danger block onClick={() => form.resetFields()}>
                  Reset
                </Button>
              )}
            </div>
          </Form>
        </div>
      </Col>
    </div>
  );
}
