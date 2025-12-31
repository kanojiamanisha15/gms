"use client";

import * as React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { cn } from "@/lib/utils";

interface DeleteButtonProps {
  id: string;
  onDelete: (id: string) => void;
  entityName?: string;
  itemName?: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export function DeleteButton({
  id,
  onDelete,
  entityName = "item",
  itemName,
  className,
  size = "icon",
}: DeleteButtonProps) {
  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <>
      <Button
        variant="ghost"
        size={size}
        className={cn(
          "h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10",
          className
        )}
        onClick={() => setOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete {entityName}</span>
      </Button>
      <DeleteDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleDelete}
        entityName={entityName}
        itemName={itemName}
      />
    </>
  );
}
