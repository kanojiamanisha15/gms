"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";

const DEFAULT_COUNTRY_CODE = "+91";
const MAX_DIGITS = 10;

export interface PhoneInputProps
  extends Omit<React.ComponentProps<"input">, "type" | "value" | "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  countryCode?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      value = "",
      onChange,
      onBlur,
      countryCode = DEFAULT_COUNTRY_CODE,
      placeholder = "98765 43210",
      disabled,
      ...props
    },
    ref
  ) => {
    const prefix = countryCode.trim() + " ";
    const normalizedCode = countryCode.replace("+", "\\+");
    const digitsOnly = value.replace(/\D/g, "");
    const hasCountryPrefix =
      !value ||
      value.startsWith(prefix) ||
      value.startsWith(countryCode.trim()) ||
      (digitsOnly.length === 10 && !value.startsWith("+"));
    const displayValue = hasCountryPrefix
      ? value.replace(new RegExp(`^${normalizedCode}\\s?`), "").trim()
      : value;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      if (hasCountryPrefix) {
        const digitsOnly = inputValue.replace(/\D/g, "").slice(0, MAX_DIGITS);
        onChange?.(digitsOnly ? `${countryCode.trim()} ${digitsOnly}` : "");
      } else {
        onChange?.(inputValue);
      }
    };

    return (
      <div
        className={cn(
          "flex h-9 w-full min-w-0 items-center rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow]",
          "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
          "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
      >
        {hasCountryPrefix && (
          <span
            className={cn(
              "flex items-center border-r border-input bg-muted/50 px-3 py-1 text-sm text-muted-foreground",
              disabled && "opacity-50"
            )}
          >
            {prefix}
          </span>
        )}
        <Input
          ref={ref}
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={hasCountryPrefix ? MAX_DIGITS : undefined}
          value={displayValue}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder={hasCountryPrefix ? placeholder : "+1 234-567-8900"}
          disabled={disabled}
          className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
