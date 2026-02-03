"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { EditButton } from "@/components/ui/edit-button";
import { DeleteButton } from "@/components/ui/delete-button";

function ActionsCell({ attendance }: { attendance: Attendance }) {
  const handleDelete = (id: string) => {
    // Handle delete action
    console.log("Delete attendance:", id);
  };

  return (
    <div className="flex items-center gap-2">
      <EditButton
        id={attendance.id}
        editPath="/attendance/add-attendance"
        entityName="attendance"
      />
      <DeleteButton
        id={attendance.id}
        onDelete={handleDelete}
        entityName="attendance"
        itemName={`${attendance.memberName}'s attendance`}
      />
    </div>
  );
}

export type Attendance = {
  id: string;
  memberName: string;
  memberId: string;
  checkInDate: string;
  checkInTime: string;
  checkOutDate?: string;
  checkOutTime?: string;
  status: "present" | "checked-out";
  duration?: string;
};

export const mockAttendance: Attendance[] = [
  {
    id: "1",
    memberName: "John Doe",
    memberId: "5JA01",
    checkInDate: "2025-01-28",
    checkInTime: "08:30",
    checkOutDate: "2025-01-28",
    checkOutTime: "10:15",
    status: "checked-out",
    duration: "1h 45m",
  },
  {
    id: "2",
    memberName: "Jane Smith",
    memberId: "5DE01",
    checkInDate: "2025-01-28",
    checkInTime: "09:00",
    status: "present",
  },
  {
    id: "3",
    memberName: "Bob Johnson",
    memberId: "3DE01",
    checkInDate: "2025-01-28",
    checkInTime: "10:00",
    checkOutDate: "2025-01-28",
    checkOutTime: "11:30",
    status: "checked-out",
    duration: "1h 30m",
  },
  {
    id: "4",
    memberName: "Alice Williams",
    memberId: "5OC01",
    checkInDate: "2025-01-28",
    checkInTime: "07:45",
    checkOutDate: "2025-01-28",
    checkOutTime: "09:20",
    status: "checked-out",
    duration: "1h 35m",
  },
  {
    id: "5",
    memberName: "Charlie Brown",
    memberId: "4JA01",
    checkInDate: "2025-01-28",
    checkInTime: "12:00",
    status: "present",
  },
  {
    id: "6",
    memberName: "Diana Prince",
    memberId: "5JA02",
    checkInDate: "2025-01-27",
    checkInTime: "18:00",
    checkOutDate: "2025-01-27",
    checkOutTime: "19:45",
    status: "checked-out",
    duration: "1h 45m",
  },
  {
    id: "7",
    memberName: "Edward Norton",
    memberId: "3NO01",
    checkInDate: "2025-01-27",
    checkInTime: "16:30",
    checkOutDate: "2025-01-27",
    checkOutTime: "18:00",
    status: "checked-out",
    duration: "1h 30m",
  },
  {
    id: "8",
    memberName: "Fiona Green",
    memberId: "5DE02",
    checkInDate: "2025-01-27",
    checkInTime: "14:00",
    status: "present",
  },
  {
    id: "9",
    memberName: "George White",
    memberId: "4JA02",
    checkInDate: "2025-01-27",
    checkInTime: "11:00",
    checkOutDate: "2025-01-27",
    checkOutTime: "12:30",
    status: "checked-out",
    duration: "1h 30m",
  },
  {
    id: "10",
    memberName: "Hannah Black",
    memberId: "4FE01",
    checkInDate: "2025-01-26",
    checkInTime: "09:15",
    checkOutDate: "2025-01-26",
    checkOutTime: "10:45",
    status: "checked-out",
    duration: "1h 30m",
  },
  {
    id: "11",
    memberName: "Ian Gray",
    memberId: "3OC01",
    checkInDate: "2025-01-26",
    checkInTime: "15:00",
    checkOutDate: "2025-01-26",
    checkOutTime: "16:20",
    status: "checked-out",
    duration: "1h 20m",
  },
  {
    id: "12",
    memberName: "Julia Red",
    memberId: "5OC02",
    checkInDate: "2025-01-26",
    checkInTime: "13:30",
    status: "present",
  },
];

const columns: ColumnDef<Attendance>[] = [
  {
    accessorKey: "memberId",
    header: "Member ID",
    cell: ({ row }) => (
      <div className="font-mono font-medium">{row.getValue("memberId")}</div>
    ),
  },
  {
    accessorKey: "memberName",
    header: "Member Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("memberName")}</div>
    ),
  },
  {
    accessorKey: "checkInDate",
    header: "Check-in Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("checkInDate"));
      return (
        <div>
          {date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "checkInTime",
    header: "Check-in Time",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("checkInTime")}</div>
    ),
  },
  {
    accessorKey: "checkOutDate",
    header: "Check-out Date",
    cell: ({ row }) => {
      const checkOutDate = row.getValue("checkOutDate") as string | undefined;
      if (!checkOutDate) {
        return <div className="text-muted-foreground">-</div>;
      }
      const date = new Date(checkOutDate);
      return (
        <div>
          {date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "checkOutTime",
    header: "Check-out Time",
    cell: ({ row }) => {
      const checkOutTime = row.getValue("checkOutTime") as string | undefined;
      return <div className="text-muted-foreground">{checkOutTime || "-"}</div>;
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const duration = row.getValue("duration") as string | undefined;
      return <div className="text-muted-foreground">{duration || "-"}</div>;
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
        present: { variant: "default" },
        "checked-out": { variant: "secondary" },
      };
      const config = statusConfig[status] || statusConfig.present;
      return (
        <Badge variant={config.variant}>
          {status === "present"
            ? "Present"
            : status === "checked-out"
            ? "Checked Out"
            : status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const attendance = row.original;
      return <ActionsCell attendance={attendance} />;
    },
    enableSorting: false,
  },
];

export function AttendanceTable({ selectedDate }: { selectedDate?: string }) {
  const filteredData = React.useMemo(() => {
    if (!selectedDate) {
      return mockAttendance;
    }
    return mockAttendance.filter(
      (attendance) => attendance.checkInDate === selectedDate
    );
  }, [selectedDate]);

  return (
    <DataTable
      columns={columns}
      data={filteredData}
      searchPlaceholder="Search attendance..."
      addButtonLabel="Add Attendance"
      addButtonHref="/attendance/add-attendance"
      entityName="attendance"
    />
  );
}
