import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}
import React from "react";
import { Skeleton as SkeletonLoading } from "antd";
const LoadingSkeleton = ({
  number,
  sectionNumber = 4,
}: {
  number?: number;
  sectionNumber?: number;
}) => (
  <div className="container mx-auto">
    {new Array(sectionNumber).fill(null).map((data, index) => (
      <SkeletonLoading
        key={index}
        active
        avatar
        style={{ marginTop: "1rem" }}
        paragraph={{
          rows: number || 4,
        }}
      />
    ))}
  </div>
);
const SkeletonCard = () => {
  return (
    <div className="animate-pulse space-y-3 border rounded-lg p-4 bg-white shadow-sm">
      {/* Icon Row */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
          <div className="h-3 w-28 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Body lines */}
      <div className="space-y-2 mt-3">
        <div className="h-3 w-full bg-gray-200 rounded"></div>
        <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
        <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
      </div>

      {/* Footer buttons */}
      <div className="flex gap-3 mt-3">
        <div className="h-8 w-20 bg-gray-200 rounded-md"></div>
        <div className="h-8 w-16 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};
export { Skeleton, LoadingSkeleton, SkeletonCard };
