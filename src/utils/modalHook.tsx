/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { createRoot } from "react-dom/client";
import React from "react";

/* ============================================================
   1. confirm_modal (Shadcn AlertDialog)
============================================================ */
export const confirm_modal = (message: string, confirmText: string = "Yes") => {
  return new Promise<boolean>((resolve) => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    const root = createRoot(div);

    const close = () => {
      setTimeout(() => {
        root.unmount();
        div.remove();
      }, 50);
    };

    root.render(
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {message || "You cannot restore this information!"}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                resolve(false);
                close();
              }}
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={() => {
                resolve(true);
                close();
              }}
            >
              {confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  });
};

/* ============================================================
   2. Success_model → Sonner Success Toast
============================================================ */
export const Success_model = (message: string) => {
  return toast.success(message || "Successfully Done!");
};

/* ============================================================
   3. Error_model_hook → Sonner Error Toast
============================================================ */
export const Error_model_hook = (error: any) => {
  let message = "Something went wrong!";

  if (typeof error === "string") message = error;
  else if (typeof error === "object") {
    message =
      error?.message ||
      error?.data?.message ||
      error?.error ||
      "Something went wrong!";
  }

  return toast.error(message);
};

/* ============================================================
   4. ErrorModal → Alias of Error_model_hook
============================================================ */
export const ErrorModal = (error: any) => {
  return Error_model_hook(error);
};

/* ============================================================
   5. Animation_model_hook → Shadcn Dialog + Animation
============================================================ */
export const Animation_model_hook = (message: string) => {
  const div = document.createElement("div");
  document.body.appendChild(div);

  const root = createRoot(div);

  const close = () => {
    setTimeout(() => {
      root.unmount();
      div.remove();
    }, 200);
  };

  root.render(
    <Dialog open>
      <DialogContent
        className={cn(
          "animate-in fade-in-50 slide-in-from-bottom-4 duration-300"
        )}
        onEscapeKeyDown={close}
        onPointerDownOutside={close}
      >
        <DialogHeader>
          <DialogTitle>{message || "Animated Modal"}</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
