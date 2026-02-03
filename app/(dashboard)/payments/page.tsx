"use client";

import dynamic from "next/dynamic";
import { PageContent } from "@/components/ui/page-content";
import { ChartSkeleton, TableSkeleton } from "@/lib/utils/lazy-loading";

// Lazy load heavy components
const PaymentsChart = dynamic(() => import("@/components/features/payments/payments-chart").then(mod => ({ default: mod.PaymentsChart })), {
  loading: () => <ChartSkeleton />,
  ssr: false,
});

const ExpensesTable = dynamic(() => import("@/components/features/payments/expenses-table").then(mod => ({ default: mod.ExpensesTable })), {
  loading: () => <TableSkeleton />,
  ssr: false,
});

export default function PaymentsPage() {
  return (
    <PageContent
      title="Payments and Invoice"
      description="View and manage payments and invoices"
    >
      <div className="px-4 lg:px-6 space-y-6">
        <PaymentsChart />
      </div>
      <ExpensesTable />
    </PageContent>
  );
}
