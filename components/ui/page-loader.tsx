"use client";

import { cn } from "@/lib/utils";

type PageLoaderProps = {
  message?: string;
  className?: string;
};

export function PageLoader({ message = "Loading...", className }: PageLoaderProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-center gap-6 bg-background",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"
        aria-hidden
      />
      {message && (
        <p className="text-sm font-medium text-muted-foreground">{message}</p>
      )}
    </div>
  );
}
