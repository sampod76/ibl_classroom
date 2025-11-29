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

export default function AssignmentDialog({ topicId }: { topicId: string }) {
  return (
    <div>
      <div>
        <div className="text-xl font-semibold">Create Assignment</div>
        <div className="text-sm text-gray-500 -mt-1">
          Create a new assignment for your students
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Title *</Label>
          <Input placeholder="e.g., Integration by Parts Assignment" />
        </div>

        <div className="space-y-2">
          <Label>Instructions</Label>
          <Textarea className="min-h-32" placeholder="Assignment details..." />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Points</Label>
            <Input type="number" placeholder="100" />
          </div>
          <div className="space-y-2">
            <Label>Due Date</Label>
            <Input type="datetime-local" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Topic</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week8">Week 8</SelectItem>
              <SelectItem value="week7">Week 7</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Create Assignment</Button>
        </div>
      </div>
    </div>
  );
}
