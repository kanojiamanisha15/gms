"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    { className, checked, onCheckedChange, defaultChecked, disabled, ...props },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(
      checked !== undefined ? checked : defaultChecked || false
    );
    const isControlled = checked !== undefined;
    const isIndeterminate = checked === "indeterminate";
    const isChecked = isControlled
      ? checked === true
      : internalChecked === true;

    const handleClick = () => {
      if (disabled) return;
      const newChecked = !isChecked;
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    };

    return (
      <button
        type="button"
        role="checkbox"
        aria-checked={isChecked}
        ref={ref}
        disabled={disabled}
        onClick={handleClick}
        data-slot="checkbox"
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          "flex items-center justify-center",
          isChecked && "bg-primary text-primary-foreground",
          isIndeterminate && "bg-primary text-primary-foreground",
          className
        )}
        data-state={
          isIndeterminate
            ? "indeterminate"
            : isChecked
            ? "checked"
            : "unchecked"
        }
        aria-checked={isIndeterminate ? "mixed" : isChecked}
        {...props}
      >
        {isIndeterminate ? (
          <div className="h-0.5 w-2 bg-primary-foreground" />
        ) : isChecked ? (
          <Check className="h-4 w-4 text-primary-foreground" />
        ) : null}
      </button>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
