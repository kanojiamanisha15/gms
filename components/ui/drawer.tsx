"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface DrawerContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  direction: "left" | "right" | "top" | "bottom";
}

const DrawerContext = React.createContext<DrawerContextValue | null>(null);

function useDrawerContext() {
  const context = React.useContext(DrawerContext);
  if (!context) {
    throw new Error("Drawer components must be used within Drawer");
  }
  return context;
}

interface DrawerProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  direction?: "left" | "right" | "top" | "bottom";
}

function Drawer({
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  children,
  direction = "bottom",
}: DrawerProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen || false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [controlledOpen, onOpenChange]
  );

  const contextValue = React.useMemo(
    () => ({ open, setOpen, direction }),
    [open, setOpen, direction]
  );

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  return (
    <DrawerContext.Provider value={contextValue}>
      {children}
    </DrawerContext.Provider>
  );
}

interface DrawerTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

function DrawerTrigger({ asChild, children, ...props }: DrawerTriggerProps) {
  const { setOpen } = useDrawerContext();

  const handleClick = () => {
    setOpen(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement,
      {
        onClick: handleClick,
        ...props,
      } as any
    );
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

function DrawerClose({
  asChild,
  children,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const { setOpen } = useDrawerContext();

  const handleClick = () => {
    setOpen(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement,
      {
        onClick: handleClick,
        ...props,
      } as any
    );
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

function DrawerOverlay() {
  const { open, setOpen } = useDrawerContext();

  if (!open) return null;

  return (
    <div
      data-slot="drawer-overlay"
      className="fixed inset-0 z-40 bg-black/50"
      onClick={() => setOpen(false)}
    />
  );
}

function DrawerContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open, direction = "bottom" } = useDrawerContext();

  if (!open) return null;

  const content = (
    <div
      data-slot="drawer-content"
      className={cn(
        "fixed z-50 flex flex-col border bg-background",
        direction === "bottom" &&
          "inset-x-0 bottom-0 mt-24 h-auto rounded-t-lg",
        direction === "top" && "inset-x-0 top-0 mb-24 h-auto rounded-b-lg",
        direction === "left" && "inset-y-0 left-0 mr-24 w-auto rounded-r-lg",
        direction === "right" && "inset-y-0 right-0 ml-24 w-auto rounded-l-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(
        <>
          <DrawerOverlay />
          {content}
        </>,
        document.body
      )
    : null;
}

function DrawerHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DrawerFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-4",
        className
      )}
      {...props}
    />
  );
}

function DrawerTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      data-slot="drawer-title"
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
