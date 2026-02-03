"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { DeleteButton } from "@/components/ui/delete-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import dayjs from "dayjs";

// Lazy load the expense form modal (only loads when opened)
const ExpenseFormModal = dynamic(() => import("./expense-form-modal").then(mod => ({ default: mod.ExpenseFormModal })), {
  ssr: false,
});

function ActionsCell({
  expense,
  onEdit,
}: {
  expense: Expense;
  onEdit: (expense: Expense) => void;
}) {
  const handleDelete = (id: string) => {
    // Handle delete action
    console.log("Delete expense:", id);
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
        id={expense.id}
        onDelete={handleDelete}
        entityName="expense"
        itemName={expense.description}
      />
    </div>
  );
}

export type Expense = {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "overdue";
  vendor?: string;
};

const mockExpenses: Expense[] = [
  {
    id: "1",
    category: "Equipment",
    description: "Treadmill maintenance and repair",
    amount: 1250.0,
    date: "2026-01-15",
    status: "paid",
    vendor: "Fitness Equipment Co.",
  },
  {
    id: "2",
    category: "Utilities",
    description: "Monthly electricity bill",
    amount: 850.5,
    date: "2026-01-20",
    status: "paid",
    vendor: "City Power",
  },
  {
    id: "3",
    category: "Rent",
    description: "Monthly facility rent",
    amount: 5000.0,
    date: "2026-01-01",
    status: "paid",
    vendor: "Property Management",
  },
  {
    id: "4",
    category: "Supplies",
    description: "Cleaning supplies and sanitizers",
    amount: 320.75,
    date: "2026-01-10",
    status: "paid",
    vendor: "Supply Depot",
  },
  {
    id: "5",
    category: "Staff",
    description: "Trainer salaries - January",
    amount: 8500.0,
    date: "2026-01-15",
    status: "paid",
    vendor: "Payroll",
  },
  {
    id: "6",
    category: "Marketing",
    description: "Social media advertising campaign",
    amount: 1200.0,
    date: "2026-01-25",
    status: "pending",
    vendor: "Digital Marketing Agency",
  },
  {
    id: "7",
    category: "Equipment",
    description: "New weightlifting equipment",
    amount: 3500.0,
    date: "2026-01-05",
    status: "pending",
    vendor: "Fitness Equipment Co.",
  },
  {
    id: "8",
    category: "Utilities",
    description: "Monthly water and sewer bill",
    amount: 450.0,
    date: "2026-01-12",
    status: "paid",
    vendor: "City Water",
  },
  {
    id: "9",
    category: "Insurance",
    description: "Quarterly liability insurance",
    amount: 1800.0,
    date: "2026-01-18",
    status: "overdue",
    vendor: "Insurance Corp",
  },
  {
    id: "10",
    category: "Maintenance",
    description: "HVAC system service",
    amount: 650.0,
    date: "2026-01-28",
    status: "pending",
    vendor: "HVAC Services",
  },
  {
    id: "11",
    category: "Supplies",
    description: "Towels and locker room supplies",
    amount: 280.5,
    date: "2024-04-01",
    status: "paid",
    vendor: "Supply Depot",
  },
  {
    id: "12",
    category: "Software",
    description: "Gym management software subscription",
    amount: 299.99,
    date: "2024-04-05",
    status: "paid",
    vendor: "Software Solutions",
  },
];

export function ExpensesTable() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedExpense, setSelectedExpense] = React.useState<Expense | null>(
    null
  );

  // Default dates: First and last day of current month
  const getCurrentMonthDates = () => {
    const start = dayjs().startOf("month").format("YYYY-MM-DD");
    const end = dayjs().endOf("month").format("YYYY-MM-DD");
    return { start, end };
  };

  const currentMonthDates = getCurrentMonthDates();
  const [startDate, setStartDate] = React.useState<string>(
    currentMonthDates.start
  );
  const [endDate, setEndDate] = React.useState<string>(currentMonthDates.end);

  const handleAdd = () => {
    setSelectedExpense(null);
    setIsModalOpen(true);
  };

  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleSave = (data: {
    category: string;
    description: string;
    amount: number;
    date: string;
    status: "paid" | "pending" | "overdue";
    vendor?: string;
  }) => {
    if (selectedExpense) {
      // Handle update
      console.log("Updating expense:", selectedExpense.id, data);
    } else {
      // Handle create
      console.log("Adding expense:", data);
    }
    // In a real app, you would update the expenses list here
  };

  const columns: ColumnDef<Expense>[] = [
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("category")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="max-w-md">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "vendor",
      header: "Vendor",
      cell: ({ row }) => {
        const vendor = row.getValue("vendor") as string | undefined;
        return <div className="text-muted-foreground">{vendor || "N/A"}</div>;
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
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
      cell: ({ row }) => {
        const date = dayjs(row.getValue("date"));
        return <div>{date.format("MM/DD/YYYY")}</div>;
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
          paid: { variant: "default" },
          pending: { variant: "secondary" },
          overdue: { variant: "destructive" },
        };
        const config = statusConfig[status] || statusConfig.pending;
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
        const expense = row.original;
        return <ActionsCell expense={expense} onEdit={handleEdit} />;
      },
      enableSorting: false,
    },
  ];

  // Filter expenses based on date range
  const filteredExpenses = React.useMemo(() => {
    if (!startDate && !endDate) {
      return mockExpenses;
    }

    return mockExpenses.filter((expense) => {
      const expenseDate = dayjs(expense.date).startOf("day");

      if (startDate && endDate) {
        const start = dayjs(startDate).startOf("day");
        const end = dayjs(endDate).startOf("day");
        return (
          (expenseDate.isAfter(start) || expenseDate.isSame(start, "day")) &&
          (expenseDate.isBefore(end) || expenseDate.isSame(end, "day"))
        );
      }

      if (startDate) {
        const start = dayjs(startDate).startOf("day");
        return expenseDate.isAfter(start) || expenseDate.isSame(start, "day");
      }

      if (endDate) {
        const end = dayjs(endDate).startOf("day");
        return expenseDate.isBefore(end) || expenseDate.isSame(end, "day");
      }

      return true;
    });
  }, [startDate, endDate]);

  const headerAction = (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Label htmlFor="start-date" className="text-xs whitespace-nowrap">
          Start Date
        </Label>
        <Input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-[140px]"
        />
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="end-date" className="text-xs whitespace-nowrap">
          End Date
        </Label>
        <Input
          id="end-date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-[140px]"
        />
      </div>
      {(startDate || endDate) && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setStartDate("");
            setEndDate("");
          }}
        >
          Clear
        </Button>
      )}
    </div>
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={filteredExpenses}
        searchPlaceholder="Search expenses..."
        addButtonLabel="Add Expense"
        entityName="expense"
        onAddClick={handleAdd}
        headerTitle="Expenses"
        headerDescription={`${filteredExpenses.length} expense${
          filteredExpenses.length !== 1 ? "s" : ""
        } recorded`}
        headerAction={headerAction}
      />
      <ExpenseFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        expense={selectedExpense}
        onSave={handleSave}
      />
    </>
  );
}
