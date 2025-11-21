import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-10 space-y-6">
      <Skeleton className="h-10 w-1/3" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-4/5" />
    </div>
  );
}
