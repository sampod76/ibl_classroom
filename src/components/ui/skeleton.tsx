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

export { Skeleton, LoadingSkeleton };
