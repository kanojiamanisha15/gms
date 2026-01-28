"use client";

import { PageContent } from "@/components/ui/page-content";
import { TrainersTable } from "./trainers-table";

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
