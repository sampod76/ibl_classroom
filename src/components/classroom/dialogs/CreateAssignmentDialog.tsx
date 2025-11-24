"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateAssignmentDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Assignment</DialogTitle>
          <DialogDescription>
            Create a new assignment for your students
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Title *</Label>
            <Input placeholder="e.g., Integration by Parts Assignment" />
          </div>

          <div className="space-y-2">
            <Label>Instructions</Label>
            <Textarea
              placeholder="Provide detailed instructions..."
              className="min-h-32"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Points</Label>
              <Input type="number" placeholder="100" />
            </div>
            <div>
              <Label>Due Date</Label>
              <Input type="datetime-local" />
            </div>
          </div>

          <div>
            <Label>Topic</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week8">
                  Week 8: Integration Techniques
                </SelectItem>
                <SelectItem value="week7">
                  Week 7: Limits and Continuity
                </SelectItem>
                <SelectItem value="new">Create New Topic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Attachments</Label>
            <Input type="file" multiple />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button>Create Assignment</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
