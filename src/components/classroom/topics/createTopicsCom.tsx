/* eslint-disable @typescript-eslint/no-explicit-any */
import ShadowCard from "@/components/ui/ShadowCard";
import {
  useAddTopicsMutation,
  useUpdateTopicsMutation,
} from "@/redux/api/teacher/topicsApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { Button, Col, Form, Input, Select, Modal } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";

export default function CreateTopicsCom({ subjectId }: { subjectId: string }) {
  const { userInfo, modal } = useAppSelector((state) => state);

  const [form] = Form.useForm();
  const [editId, setEditId] = useState<string | null>(null);
  const [addTopics, { isLoading: cLoading }] = useAddTopicsMutation();
  const [updateTopics, { isLoading: uLoading }] = useUpdateTopicsMutation();

  const onFinish = async (values: any) => {
    try {
      if (editId) {
        // UPDATE MODE
        await updateTopics({
          id: editId,
          data: values,
        }).unwrap();
        Success_model("Successfully Updated");
        setEditId(null);
      } else {
        // CREATE MODE
        await addTopics({ ...values, subjectId }).unwrap();
        Success_model("Successfully Created");
      }

      form.resetFields();
    } catch (error) {
      Error_model_hook(error);
    }
  };

  //   useEffect(() => {
  //     if (modal[subjectId]) {
  //       form.resetFields();
  //     }
  //   }, [modal]);

  return (
    <div>
      <Col md={24}>
        <div>
          <h2>{editId ? "Edit Unit" : "Add Unit"}</h2>

          <Form layout="vertical" form={form} onFinish={onFinish}>
            {/* Title */}
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input placeholder="Enter title " />
            </Form.Item>

            {/* ===========================
                OBJECTIVE LIST + CONFIRM
            ============================ */}
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

                      {/* ❌ Remove Button with Confirmation */}
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
                              remove(name); // Final delete
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
            <div className="grid grid-cols-2 gap-3 mt-4">
              {/* Save / Update */}
              <Button
                loading={cLoading || uLoading}
                type="primary"
                htmlType="submit"
                block
              >
                {editId ? "Update Unit" : "Save Unit"}
              </Button>

              {/* Reset / Cancel */}
              {editId ? (
                <Button
                  danger
                  block
                  onClick={() => {
                    setEditId(null);
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

            {/* Submit */}
          </Form>
        </div>
      </Col>
    </div>
  );
}
