"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { ColumnDef } from "@tanstack/react-table";
import { SectionCards } from "@/components/ui/section-cards";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useExpiringMembers } from "@/hooks/use-members";
import type { ExpiringMember } from "@/lib/services/members";
import { ChartSkeleton } from "@/lib/utils/lazy-loading";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Lazy load heavy components
const DataTable = dynamic(
  () => import("@/components/ui/data-table").then((mod) => ({ default: mod.DataTable })),
  { ssr: false }
);

const FinancialChart = dynamic(() => import("@/components/features/dashboard/financial-chart").then(mod => ({ default: mod.FinancialChart })), {
  loading: () => <ChartSkeleton />,
  ssr: false,
});

const columns: ColumnDef<ExpiringMember>[] = [
  {
    accessorKey: "name",
    header: "Member Name",
    meta: { sortKey: "name" },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    meta: { sortKey: "email" },
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    meta: { sortKey: "phone" },
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "membershipType",
    header: "Membership Type",
    meta: { sortKey: "membership_type" },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("membershipType")}</div>
    ),
  },
  {
    accessorKey: "expirationDate",
    header: "Expiration Date",
    meta: { sortKey: "expiry_date" },
    cell: ({ row }) => {
      const date = new Date(row.getValue("expirationDate"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "daysRemaining",
    header: "Days Remaining",
    meta: { sortKey: "days_remaining" },
    cell: ({ row }) => {
      const days = row.getValue("daysRemaining") as number;
      const variant =
        days < 0
          ? "secondary"
          : days <= 7
            ? "destructive"
            : days <= 14
              ? "secondary"
              : "default";
      return (
        <Badge variant={variant}>
          {days < 0
            ? "Expired"
            : days === 0
              ? "Expires Today"
              : days === 1
                ? "1 Day"
                : `${days} Days`}
        </Badge>
      );
    },
  },
];

const currentDate = new Date();
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() - 2 + i);

export default function Page() {
  const [selectedMonth, setSelectedMonth] = React.useState(String(currentDate.getMonth()));
  const [selectedYear, setSelectedYear] = React.useState(String(currentDate.getFullYear()));
  const [sortBy, setSortBy] = React.useState("expiry_date");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

  const { data: expiringMembers = [], isLoading, isError, error } = useExpiringMembers(
    Number(selectedMonth),
    Number(selectedYear),
    { sortBy, sortOrder }
  );

  const handleSortChange = React.useCallback((newSortBy: string, newSortOrder: "asc" | "desc") => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  }, []);

  const monthYearLabel = `${MONTH_NAMES[Number(selectedMonth)]} ${selectedYear}`;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <FinancialChart />
          </div>
          <DataTable
            columns={columns as never}
            data={expiringMembers}
            searchPlaceholder="Search expiring members..."
            showAddButton={false}
            isLoading={isLoading}
            isError={isError}
            error={error}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            headerTitle="Members with Plans Expiring by Month"
            headerDescription={`${expiringMembers.length} member${
              expiringMembers.length !== 1 ? "s" : ""
            } with plans expiring in ${monthYearLabel}`}
            headerAction={
              <div className="flex items-center gap-2">
                <Select
                  value={selectedMonth}
                  onValueChange={setSelectedMonth}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue
                      placeholder="Month"
                      labels={Object.fromEntries(MONTH_NAMES.map((name, i) => [String(i), name]))}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTH_NAMES.map((name, i) => (
                      <SelectItem key={name} value={String(i)}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={selectedYear}
                  onValueChange={setSelectedYear}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEAR_OPTIONS.map((y) => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
