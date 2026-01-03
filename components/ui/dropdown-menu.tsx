"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slot } from "@/components/ui/slot";
import { Separator } from "@/components/ui/separator";

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const DropdownMenuContext =
  React.createContext<DropdownMenuContextValue | null>(null);

function DropdownMenu({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLElement>(null);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, triggerRef }}>
      <div data-slot="dropdown-menu" {...props}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

function DropdownMenuTrigger({
  children,
  asChild,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const context = React.useContext(DropdownMenuContext);
  if (!context)
    throw new Error("DropdownMenuTrigger must be used within DropdownMenu");

  const handleClick = () => {
    context.setOpen(!context.open);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement,
      {
        ref: context.triggerRef,
        onClick: handleClick,
        ...props,
      } as any
    );
  }

  return (
    <button
      ref={context.triggerRef as React.RefObject<HTMLButtonElement>}
      data-slot="dropdown-menu-trigger"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  align = "start",
  side = "bottom",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  sideOffset?: number;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
}) {
  const context = React.useContext(DropdownMenuContext);
  if (!context)
    throw new Error("DropdownMenuContent must be used within DropdownMenu");

  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!context.open || !context.triggerRef.current || !contentRef.current)
      return;

    const triggerRect = context.triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    if (side === "top") {
      top = triggerRect.top - contentRect.height - sideOffset;
      left = triggerRect.left;
      if (align === "end") {
        left = triggerRect.right - contentRect.width;
      } else if (align === "center") {
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
      }
    } else if (side === "bottom") {
      top = triggerRect.bottom + sideOffset;
      left = triggerRect.left;
      if (align === "end") {
        left = triggerRect.right - contentRect.width;
      } else if (align === "center") {
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
      }
    } else if (side === "left") {
      left = triggerRect.left - contentRect.width - sideOffset;
      top = triggerRect.top;
      if (align === "end") {
        top = triggerRect.bottom - contentRect.height;
      } else if (align === "center") {
        top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
      }
    } else if (side === "right") {
      left = triggerRect.right + sideOffset;
      top = triggerRect.top;
      if (align === "end") {
        top = triggerRect.bottom - contentRect.height;
      } else if (align === "center") {
        top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
      }
    }

    // Adjust if overflow
    if (left + contentRect.width > window.innerWidth) {
      left = window.innerWidth - contentRect.width - 8;
    }
    if (left < 0) {
      left = 8;
    }
    if (top + contentRect.height > window.innerHeight) {
      top = window.innerHeight - contentRect.height - 8;
    }
    if (top < 0) {
      top = 8;
    }

    setPosition({ top, left });
  }, [context.open, align, sideOffset, side]);

  React.useEffect(() => {
    if (!context.open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        context.triggerRef.current &&
        !context.triggerRef.current.contains(e.target as Node)
      ) {
        context.setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [context.open]);

  if (!context.open) return null;

  const content = (
    <div
      ref={contentRef}
      data-slot="dropdown-menu-content"
      style={{
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 50,
      }}
      className={cn(
        "bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 min-w-32 overflow-hidden overflow-y-auto rounded-md border p-1 shadow-md",
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

function DropdownMenuGroup({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="dropdown-menu-group" {...props}>
      {children}
    </div>
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  const context = React.useContext(DropdownMenuContext);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    props.onClick?.(e);
    context?.setOpen(false);
  };

  return (
    <div
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 cursor-pointer [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        inset && "pl-8",
        className
      )}
      onClick={handleClick}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  onCheckedChange,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  const handleClick = () => {
    onCheckedChange?.(!checked);
  };

  return (
    <div
      data-slot="dropdown-menu-checkbox-item"
      role="menuitemcheckbox"
      aria-checked={checked}
      onClick={handleClick}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        {checked && <CheckIcon className="size-4" />}
      </span>
      {children}
    </div>
  );
}

function DropdownMenuRadioGroup({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="dropdown-menu-radio-group" {...props}>
      {children}
    </div>
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <CircleIcon className="size-2 fill-current" />
      </span>
      {children}
    </div>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }) {
  return (
    <div
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1", className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuSub({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="dropdown-menu-sub" {...props}>
      {children}
    </div>
  );
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }) {
  return (
    <div
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </div>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 min-w-32 overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  );
}

const DropdownMenuPortal = ({ children }: { children: React.ReactNode }) =>
  children;

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
