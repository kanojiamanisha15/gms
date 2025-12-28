"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ToggleGroupContextValue {
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  type: "single" | "multiple";
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(
  null
);

function useToggleGroupContext() {
  const context = React.useContext(ToggleGroupContext);
  if (!context) {
    throw new Error("ToggleGroupItem must be used within ToggleGroup");
  }
  return context;
}

interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  type?: "single" | "multiple";
  variant?: "default" | "outline";
}

function ToggleGroup({
  className,
  value: controlledValue,
  defaultValue,
  onValueChange,
  type = "single",
  variant = "default",
  ...props
}: ToggleGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    string | string[]
  >(defaultValue || (type === "single" ? "" : []));

  const value =
    controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const handleValueChange = (newValue: string | string[]) => {
    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <ToggleGroupContext.Provider
      value={{ value, onValueChange: handleValueChange, type }}
    >
      <div
        data-slot="toggle-group"
        className={cn(
          "inline-flex items-center justify-center rounded-md p-1",
          variant === "default" && "bg-muted text-muted-foreground",
          variant === "outline" && "border border-input",
          className
        )}
        {...props}
      />
    </ToggleGroupContext.Provider>
  );
}

interface ToggleGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

function ToggleGroupItem({ className, value, ...props }: ToggleGroupItemProps) {
  const { value: selectedValue, onValueChange, type } = useToggleGroupContext();

  const isSelected =
    type === "single"
      ? selectedValue === value
      : Array.isArray(selectedValue) && selectedValue.includes(value);

  const handleClick = () => {
    if (type === "single") {
      onValueChange(selectedValue === value ? "" : value);
    } else {
      const currentArray = Array.isArray(selectedValue) ? selectedValue : [];
      const newValue = currentArray.includes(value)
        ? currentArray.filter((v) => v !== value)
        : [...currentArray, value];
      onValueChange(newValue);
    }
  };

  return (
    <button
      type="button"
      data-slot="toggle-group-item"
      data-state={isSelected ? "on" : "off"}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center rounded px-3 py-1.5 text-sm font-medium transition-all",
        "hover:bg-background hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export { ToggleGroup, ToggleGroupItem };
