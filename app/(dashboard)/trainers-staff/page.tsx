"use client";

import dynamic from "next/dynamic";
import { PageContent } from "@/components/ui/page-content";

const TrainersTable = dynamic(
  () => import("@/components/features/trainers-staff/trainers-table").then((mod) => ({ default: mod.TrainersTable })),
  { ssr: false }
);

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
