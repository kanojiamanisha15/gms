"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { EditButton } from "@/components/ui/edit-button";
import { DeleteButton } from "@/components/ui/delete-button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { doGetTrainers, doDeleteTrainer } from "@/lib/services/trainers";
import { useDebounce } from "@/hooks/use-debounce";
import { useAppSelector, useTrainersTableActions } from "@/lib/store";
import { toast } from "sonner";
import type { ITrainerData } from "@/types";

function ActionsCell({ trainer }: { trainer: ITrainerData }) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (id: number | string) => doDeleteTrainer(id),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Trainer deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["trainers"] });
      } else {
        toast.error(response.error || "Failed to delete trainer");
      }
    },
    onError: (error) => {
      console.error("Error deleting trainer:", error);
      toast.error("Failed to delete trainer. Please try again.");
    },
  });

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
    }
  };

  return (
    <div className="flex items-center gap-2">
      <EditButton
        id={String(trainer.id)}
        editPath="/trainers-staff/add-trainer"
        entityName="trainer"
      />
      <DeleteButton
        id={String(trainer.id)}
        onDelete={handleDelete}
        entityName="trainer"
        itemName={trainer.name}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}

const columns: ColumnDef<ITrainerData>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <Badge variant={role === "Trainer" ? "default" : "secondary"}>
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: "hireDate",
    header: "Hire Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("hireDate"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusConfig: Record<
        string,
        { variant: "default" | "secondary" | "destructive" | "outline" }
      > = {
        active: { variant: "default" },
        inactive: { variant: "secondary" },
      };
      const config = statusConfig[status] || statusConfig.active;
      return (
        <Badge variant={config.variant}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const trainer = row.original;
      return <ActionsCell trainer={trainer} />;
    },
    enableSorting: false,
  },
];

export function TrainersTable() {
  const { setSearchInput, setPage, setLimit } = useTrainersTableActions();
  const searchInput = useAppSelector((s) => s.trainersTable.searchInput);
  const page = useAppSelector((s) => s.trainersTable.page);
  const limit = useAppSelector((s) => s.trainersTable.limit);
  const debouncedSearch = useDebounce(searchInput, 300);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["trainers", debouncedSearch, page, limit],
    queryFn: () =>
      doGetTrainers({
        search: debouncedSearch || undefined,
        page,
        limit,
      }),
  });
  const trainers: ITrainerData[] = data?.trainers ?? [];

  return (
    <DataTable
      columns={columns}
      data={trainers}
      searchPlaceholder="Search by name, email, or phone..."
      addButtonLabel="Add Trainer/Staff"
      addButtonHref="/trainers-staff/add-trainer"
      entityName="trainer"
      serverSideSearch
      searchValue={searchInput}
      onSearchChange={setSearchInput}
      isLoading={isLoading}
      isError={isError}
      error={error}
      serverSidePagination
      page={page}
      limit={limit}
      total={data?.total}
      totalPages={data?.totalPages}
      onPageChange={setPage}
      onLimitChange={setLimit}
    />
  );
}
