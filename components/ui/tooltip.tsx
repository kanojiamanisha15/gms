"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

function TooltipProvider({
  children,
  delayDuration = 0,
}: {
  children: React.ReactNode;
  delayDuration?: number;
}) {
  return <>{children}</>;
}

function Tooltip({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLElement>(null);

  return (
    <TooltipContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}
    </TooltipContext.Provider>
  );
}

function TooltipTrigger({
  children,
  asChild,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const context = React.useContext(TooltipContext);
  if (!context) throw new Error("TooltipTrigger must be used within Tooltip");

  const handleMouseEnter = () => {
    context.setOpen(true);
  };

  const handleMouseLeave = () => {
    context.setOpen(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement,
      {
        ref: context.triggerRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        ...props,
      } as any
    );
  }

  return (
    <button
      ref={context.triggerRef as React.RefObject<HTMLButtonElement>}
      data-slot="tooltip-trigger"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}

function TooltipContent({
  className,
  sideOffset = 0,
  side = "top",
  align = "center",
  hidden,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  sideOffset?: number;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  hidden?: boolean;
}) {
  const context = React.useContext(TooltipContext);
  if (!context) throw new Error("TooltipContent must be used within Tooltip");

  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (
      !context.open ||
      !context.triggerRef.current ||
      !contentRef.current ||
      hidden
    )
      return;

    const triggerRect = context.triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    if (side === "top") {
      top = triggerRect.top - contentRect.height - sideOffset - 4;
      left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
      if (align === "start") left = triggerRect.left;
      if (align === "end") left = triggerRect.right - contentRect.width;
    } else if (side === "bottom") {
      top = triggerRect.bottom + sideOffset + 4;
      left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
      if (align === "start") left = triggerRect.left;
      if (align === "end") left = triggerRect.right - contentRect.width;
    } else if (side === "left") {
      left = triggerRect.left - contentRect.width - sideOffset - 4;
      top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
      if (align === "start") top = triggerRect.top;
      if (align === "end") top = triggerRect.bottom - contentRect.height;
    } else if (side === "right") {
      left = triggerRect.right + sideOffset + 4;
      top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
      if (align === "start") top = triggerRect.top;
      if (align === "end") top = triggerRect.bottom - contentRect.height;
    }

    setPosition({ top, left });
  }, [context.open, sideOffset, side, align, hidden]);

  if (!context.open || hidden) return null;

  const content = (
    <div
      ref={contentRef}
      data-slot="tooltip-content"
      style={{
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 50,
      }}
      className={cn(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 rounded-md px-3 py-1.5 text-xs",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(content, document.body)
    : null;
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
