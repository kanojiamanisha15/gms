"use client";

import dynamic from "next/dynamic";
import { PageContent } from "@/components/ui/page-content";
import { TableSkeleton } from "@/lib/utils/lazy-loading";

// Lazy load the trainers table
const TrainersTable = dynamic(() => import("@/components/features/trainers-staff/trainers-table").then(mod => ({ default: mod.TrainersTable })), {
  loading: () => <TableSkeleton />,
  ssr: false,
});

export default function TrainersStaffPage() {
  return (
    <PageContent
      title="Trainers/Staff"
      description="Manage trainers and staff members"
    >
      <TrainersTable />
    </PageContent>
  );
}
