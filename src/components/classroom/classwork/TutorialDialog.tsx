"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function TutorialDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Schedule Live Tutorial</DialogTitle>
          <DialogDescription>Create a live tutorial session</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Meeting Title *</Label>
            <Input placeholder="e.g., Live Tutorial Session" />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              className="min-h-24"
              placeholder="What will be covered..."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Date & Time *</Label>
              <Input type="datetime-local" />
            </div>
            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
              <Input type="number" placeholder="60" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Google Meet Link</Label>
            <Input placeholder="https://meet.google.com/xxx-xxxx-xxx" />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button>Schedule</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
