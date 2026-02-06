"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { EditButton } from "@/components/ui/edit-button";
import { DeleteButton } from "@/components/ui/delete-button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  doGetMembershipPlans,
  doDeleteMembershipPlan,
} from "@/lib/services/membership-plans";
import { useDebounce } from "@/hooks/use-debounce";
import { useAppSelector, useMembershipPlansTableActions } from "@/lib/store";
import { toast } from "sonner";
import type { IMembershipPlanData } from "@/types";

function ActionsCell({ plan }: { plan: IMembershipPlanData }) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (id: number | string) => doDeleteMembershipPlan(id),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Membership plan deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["membership-plans"] });
      } else {
        toast.error(response.error || "Failed to delete membership plan");
      }
    },
    onError: (error) => {
      console.error("Error deleting membership plan:", error);
      toast.error("Failed to delete membership plan. Please try again.");
    },
  });

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      // Error is handled by onError callback
    }
  };

  return (
    <div className="flex items-center gap-2">
      <EditButton
        id={String(plan.id)}
        editPath="/membership-plans/add-plan"
        entityName="membership plan"
      />
      <DeleteButton
        id={String(plan.id)}
        onDelete={handleDelete}
        entityName="membership plan"
        itemName={plan.name}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}

const columns: ColumnDef<IMembershipPlanData>[] = [
  {
    accessorKey: "name",
    header: "Plan Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(String(row.getValue("price")));
      return <div>Rs.{price.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("duration")}</div>
    ),
  },
  {
    accessorKey: "features",
    header: "Features",
    cell: ({ row }) => {
      const features = row.getValue("features") as string;
      return (
        <div className="max-w-md text-sm text-muted-foreground">{features ?? ""}</div>
      );
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
      const plan = row.original;
      return <ActionsCell plan={plan} />;
    },
    enableSorting: false,
  },
];

export function MembershipPlansTable() {
  const { setSearchInput, setPage, setLimit } = useMembershipPlansTableActions();
  const searchInput = useAppSelector((s) => s.membershipPlansTable.searchInput);
  const page = useAppSelector((s) => s.membershipPlansTable.page);
  const limit = useAppSelector((s) => s.membershipPlansTable.limit);
  const debouncedSearch = useDebounce(searchInput, 300);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["membership-plans", debouncedSearch, page, limit],
    queryFn: () =>
      doGetMembershipPlans({
        search: debouncedSearch || undefined,
        page,
        limit,
      }),
  });
  const plans: IMembershipPlanData[] = data?.plans ?? [];

  return (
    <DataTable
      columns={columns}
      data={plans}
      searchPlaceholder="Search membership plans..."
      addButtonLabel="Add Membership Plan"
      addButtonHref="/membership-plans/add-plan"
      entityName="membership plan"
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
