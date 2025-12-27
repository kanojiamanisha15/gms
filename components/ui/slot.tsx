import * as React from "react";
import { cn } from "@/lib/utils";

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

// Helper to safely set ref current value
function setRefValue<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref && typeof ref === "object" && "current" in ref) {
    const refObject = ref as React.MutableRefObject<T | null>;
    refObject.current = value;
  }
}

const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, className, ...props }, ref) => {
    if (React.isValidElement(children)) {
      const childElement = children as React.ReactElement<{
        className?: string;
      }>;

      // Extract child ref safely without accessing during render
      type ChildWithRef = React.ReactElement & { ref?: React.Ref<HTMLElement> };
      const childWithRef = childElement as ChildWithRef;
      const childRef = childWithRef.ref;

      // Create merged ref callback - only called on mount/unmount, never during render
      // This pattern merges refs for composition - standard Slot behavior
      const mergedRef: React.Ref<HTMLElement> = (node: HTMLElement | null) => {
        // Handle parent ref
        setRefValue(ref, node);
        // Handle child ref - intentional ref merging for composition pattern
        setRefValue(childRef, node);
      };

      const childProps = childElement.props as Record<string, unknown>;
      const mergedClassName = cn(childProps.className as string, className);

      // Merge all props and override with merged ref
      // React Compiler warning is a false positive - ref callbacks are safe
      const finalProps = {
        ...props,
        ...childProps,
        ref: mergedRef,
        className: mergedClassName,
      };

      return React.cloneElement(
        childElement,
        finalProps as React.HTMLAttributes<HTMLElement>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Slot.displayName = "Slot";

export { Slot };
