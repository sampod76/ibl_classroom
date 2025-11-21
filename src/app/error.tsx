"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center space-y-3">
      <AlertTriangle className="w-16 h-16 text-red-500 animate-pulse" />

      <h1 className="text-3xl font-bold">Something went wrong!</h1>

      <p className="text-muted-foreground">
        {error?.message || "An unexpected error occurred."}
      </p>

      <Button onClick={reset} className="mt-3">
        Try Again
      </Button>
    </div>
  );
}
