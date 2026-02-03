"use client";

import * as React from "react";
import dynamic from "next/dynamic";

/** Higher-order component for lazy loading with Suspense fallback */
export function withLazyLoading<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) {
  return dynamic(() => Promise.resolve(Component), {
    loading: () => fallback || <div className="flex items-center justify-center p-4">Loading...</div>,
    ssr: false,
  });
}

/** Lazy load component with custom loading state */
export function lazyLoad<P extends object>(
  importFn: () => Promise<{ default: React.ComponentType<P> }>,
  options?: {
    fallback?: React.ReactNode;
    ssr?: boolean;
  }
) {
  return dynamic(importFn, {
    loading: () => options?.fallback || <div className="flex items-center justify-center p-4">Loading...</div>,
    ssr: options?.ssr ?? false,
  });
}

/** Loading skeleton component for tables */
export function TableSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <div className="h-10 bg-muted animate-pulse rounded-md" />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-muted animate-pulse rounded-md" />
        ))}
      </div>
    </div>
  );
}

/** Loading skeleton component for charts */
export function ChartSkeleton() {
  return (
    <div className="h-[400px] w-full bg-muted animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-muted-foreground">Loading chart...</div>
    </div>
  );
}

/** Loading skeleton component for cards */
export function CardSkeleton() {
  return (
    <div className="h-32 w-full bg-muted animate-pulse rounded-lg" />
  );
}
