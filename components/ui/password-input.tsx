"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./input";

export interface PasswordInputProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  showToggle?: boolean;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showToggle = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(showToggle && "pr-10", className)}
          ref={ref}
          {...props}
        />
        {showToggle && (
          <button
            type="button"
            className={cn(
              "absolute right-0 top-0 h-full px-3 py-2",
              "flex items-center justify-center",
              "text-muted-foreground hover:text-foreground",
              "transition-colors",
              "outline-none focus-visible:outline-none",
              "disabled:pointer-events-none disabled:opacity-50"
            )}
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={props.disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={props.disabled ? -1 : 0}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
