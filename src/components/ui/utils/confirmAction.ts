/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, message } from "antd";

type ConfirmOptions = {
  title?: string;
  content?: string;
  okText?: string;
  cancelText?: string;
  successText?: string;
  okType?: "danger" | "primary" | "default";
  onConfirm: () => Promise<any>; // async function required
};

export const confirmAction = ({
  title = "Are you sure?",
  content = "This action cannot be undone.",
  okText = "Confirm",
  cancelText = "Cancel",
  okType = "danger",
  successText = "Action Successful",
  onConfirm,
}: ConfirmOptions) => {
  Modal.confirm({
    title,
    content,
    okText,
    cancelText,
    okType,

    async onOk() {
      const hide = message.loading("Processing...", 0); // loading

      try {
        await onConfirm();
        hide();
        message.success(successText);
      } catch (error: any) {
        hide();
        message.error(error?.message || "Something went wrong!");
        return Promise.reject(); // prevent modal close on error (optional)
      }
    },
  });
};
