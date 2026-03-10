"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface DateInputProps
  extends Omit<React.ComponentProps<"input">, "type" | "ref"> {
  /** Optional label rendered above the input (for standalone use) */
  label?: string;
  /** Optional wrapper className */
  wrapperClassName?: string;
}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ label, id, className, wrapperClassName, ...props }, ref) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const input = (
      <Input
        ref={ref}
        type="date"
        id={inputId}
        className={cn("w-full", className)}
        {...props}
      />
    );

    if (label) {
      return (
        <div className={cn("flex items-center gap-2", wrapperClassName)}>
          <Label htmlFor={inputId} className="text-xs whitespace-nowrap sm:text-sm">
            {label}
          </Label>
          {input}
        </div>
      );
    }

    return input;
  }
);

DateInput.displayName = "DateInput";

export { DateInput };
