"use client";

import { PageContent } from "@/components/ui/page-content";
import { PaymentsChart } from "./payments-chart";
import { ExpensesTable } from "./expenses-table";

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
