"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { DeleteButton } from "@/components/ui/delete-button";
import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/date-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil } from "lucide-react";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { doGetExpenses } from "@/lib/services/expenses";
import { useCreateExpense, useUpdateExpense, useDeleteExpense } from "@/hooks/use-expenses";
import { useDebounce } from "@/hooks/use-debounce";
import { useAppSelector, useExpensesTableActions } from "@/lib/store";
import type { IExpenseData } from "@/types";

// Lazy load the expense form modal (only loads when opened)
const ExpenseFormModal = dynamic(() => import("./expense-form-modal").then(mod => ({ default: mod.ExpenseFormModal })), {
  ssr: false,
});

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "overdue", label: "Overdue" },
] as const;

const categoryLabels: Record<string, string> = {
  equipment: "Equipment",
  utilities: "Utilities",
  rent: "Rent",
  supplies: "Supplies",
  staff: "Staff",
  marketing: "Marketing",
  insurance: "Insurance",
  maintenance: "Maintenance",
  software: "Software",
  other: "Other",
};

function ActionsCell({
  expense,
  onEdit,
}: {
  expense: IExpenseData;
  onEdit: (expense: IExpenseData) => void;
}) {
  const deleteMutation = useDeleteExpense();

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteMutation.mutateAsync(parseInt(id, 10));
    } catch {
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => onEdit(expense)}
      >
        <Pencil className="h-4 w-4" />
        <span className="sr-only">Edit expense</span>
      </Button>
      <DeleteButton
        id={String(expense.id)}
        onDelete={handleDelete}
        entityName="expense"
        itemName={expense.description ?? expense.category}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}

export function ExpensesTable() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedExpense, setSelectedExpense] = React.useState<IExpenseData | null>(null);

  const {
    setSearchInput,
    setStatus,
    setPage,
    setLimit,
    setStartDate,
    setEndDate,
    setSort,
  } = useExpensesTableActions();
  const searchInput = useAppSelector((s) => s.expensesTable.searchInput);
  const status = useAppSelector((s) => s.expensesTable.status);
  const page = useAppSelector((s) => s.expensesTable.page);
  const limit = useAppSelector((s) => s.expensesTable.limit);
  const startDate = useAppSelector((s) => s.expensesTable.startDate);
  const endDate = useAppSelector((s) => s.expensesTable.endDate);
  const sortBy = useAppSelector((s) => s.expensesTable.sortBy);
  const sortOrder = useAppSelector((s) => s.expensesTable.sortOrder);
  const debouncedSearch = useDebounce(searchInput, 300);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["expenses", debouncedSearch, status, page, limit, startDate, endDate, sortBy, sortOrder],
    queryFn: () =>
      doGetExpenses({
        search: debouncedSearch || undefined,
        status: status || undefined,
        page,
        limit,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        sortBy,
        sortOrder,
      }),
  });

  const expenses: IExpenseData[] = data?.expenses ?? [];

  const createMutation = useCreateExpense();
  const updateMutation = useUpdateExpense();

  const handleAdd = () => {
    setSelectedExpense(null);
    setIsModalOpen(true);
  };

  const handleEdit = (expense: IExpenseData) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleSave = async (formData: {
    category: string;
    description?: string;
    amount: number;
    date: string;
    status: "paid" | "pending" | "overdue";
    vendor?: string;
  }) => {
    const payload = {
      category: formData.category,
      description: formData.description?.trim() || null,
      amount: formData.amount,
      date: formData.date,
      status: formData.status,
      vendor: formData.vendor?.trim() || null,
    };
    if (selectedExpense) {
      await updateMutation.mutateAsync({
        expenseId: selectedExpense.id,
        data: payload,
      });
    } else {
      await createMutation.mutateAsync(payload);
    }
  };

  const columns: ColumnDef<IExpenseData>[] = [
    {
      accessorKey: "category",
      header: "Category",
      meta: { sortKey: "category" },
      cell: ({ row }) => (
        <div className="font-medium">
          {categoryLabels[row.getValue("category") as string] ||
            String(row.getValue("category"))}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      meta: { sortKey: "description" },
      cell: ({ row }) => (
        <div className="max-w-md">{row.getValue("description") ?? "—"}</div>
      ),
    },
    {
      accessorKey: "vendor",
      header: "Vendor",
      meta: { sortKey: "vendor" },
      cell: ({ row }) => {
        const vendor = row.getValue("vendor") as string | null | undefined;
        return <div className="text-muted-foreground">{vendor ?? "N/A"}</div>;
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      meta: { sortKey: "amount" },
      cell: ({ row }) => {
        const amount = parseFloat(String(row.getValue("amount")));
        return (
          <div className="font-medium">
            Rs.
            {amount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      meta: { sortKey: "date" },
      cell: ({ row }) => {
        const date = dayjs(row.getValue("date"));
        return <div>{date.format("MM/DD/YYYY")}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      meta: { sortKey: "status" },
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const statusConfig: Record<
          string,
          { variant: "default" | "secondary" | "destructive" | "outline" }
        > = {
          paid: { variant: "default" },
          pending: { variant: "secondary" },
          overdue: { variant: "destructive" },
        };
        const config = statusConfig[status] || statusConfig.pending;
        return (
          <Badge variant={config.variant}>
            {status ? status.charAt(0).toUpperCase() + status.slice(1) : status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const expense = row.original;
        return <ActionsCell expense={expense} onEdit={handleEdit} />;
      },
      enableSorting: false,
    },
  ];

  const headerAction = (
    <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
      <DateInput
        label="Start Date"
        id="start-date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-[140px]"
      />
      <DateInput
        label="End Date"
        id="end-date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="w-[140px]"
      />
    </div>
  );

  const filterSlot = (
    <div className="flex w-full flex-wrap items-center gap-2">
      <Select
        value={status || STATUS_OPTIONS[0].value}
        onValueChange={(v) => setStatus(v === STATUS_OPTIONS[0].value ? "" : v)}
        className="w-full"
      >
        <SelectTrigger className="h-9 w-full">
          <SelectValue
            placeholder="Status"
            labels={Object.fromEntries(STATUS_OPTIONS.map((o) => [o.value, o.label]))}
          />
        </SelectTrigger>
        <SelectContent align="start">
          {STATUS_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={expenses}
        searchPlaceholder="Search expenses..."
        filterSlot={filterSlot}
        addButtonLabel="Add Expense"
        entityName="expense"
        onAddClick={handleAdd}
        headerTitle="Expenses"
        headerDescription={`${data?.total ?? 0} expense${(data?.total ?? 0) !== 1 ? "s" : ""} recorded`}
        headerAction={headerAction}
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
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={setSort}
        toolbarClassName="grid grid-cols-1 lg:grid-cols-2 gap-y-2 lg:gap-x-2 items-center w-full"
      />
      <ExpenseFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        expense={selectedExpense}
        onSave={handleSave}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
    </>
  );
}
