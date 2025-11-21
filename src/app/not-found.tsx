import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center space-y-3">
      <Frown className="w-16 h-16 text-muted-foreground animate-pulse" />
      <h1 className="text-4xl font-bold">404 – Page Not Found</h1>
      <p className="text-muted-foreground">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link href="/">
        <Button className="mt-3">Go Home</Button>
      </Link>
    </div>
  );
}
