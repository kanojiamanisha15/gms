"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LoadingStateProps {
  /** Message shown next to the spinner. Default: "Loading..." */
  message?: string;
  /** Optional class name for the wrapper. */
  className?: string;
  /** Icon size in Tailwind size classes. Default: "h-6 w-6" */
  iconClassName?: string;
}

export function LoadingState({
  message = "Loading...",
  className,
  iconClassName = "h-6 w-6",
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 text-muted-foreground",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <Loader2 className={cn("animate-spin", iconClassName)} />
      {message ? <span>{message}</span> : null}
    </div>
  );
}
