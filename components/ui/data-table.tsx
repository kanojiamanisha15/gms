"use client";

import * as React from "react";
import Link from "next/link";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PAGE_SIZE_LABELS: Record<string, string> = {
  "10": "10",
  "20": "20",
  "30": "30",
  "50": "50",
  "100": "100",
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchPlaceholder?: string;
  addButtonLabel?: string;
  addButtonHref?: string;
  onAddClick?: () => void;
  entityName?: string;
  defaultPageSize?: number;
  showAddButton?: boolean;
  header?: React.ReactNode;
  headerTitle?: string;
  headerDescription?: string;
  headerAction?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder = "Search...",
  addButtonLabel = "Add",
  addButtonHref,
  onAddClick,
  entityName = "item",
  defaultPageSize = 10,
  showAddButton = true,
  header,
  headerTitle,
  headerDescription,
  headerAction,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: defaultPageSize,
      },
    },
  });

  // Generate header if title is provided
  const displayHeader =
    header ||
    (headerTitle && (
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {headerTitle}
          </h2>
          {headerDescription && (
            <p className="text-sm text-muted-foreground mt-1">
              {headerDescription}
            </p>
          )}
        </div>
        {headerAction && <div className="shrink-0">{headerAction}</div>}
      </div>
    ));

  return (
    <div className="px-4 lg:px-6 space-y-4">
      <Card>
        {displayHeader && (
          <div className="px-6 pb-4 border-b">{displayHeader}</div>
        )}
        <CardContent>
          <div className="space-y-4">
            {/* Search */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  value={globalFilter ?? ""}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  className="pl-9"
                />
              </div>
              {showAddButton &&
                (addButtonHref || onAddClick) &&
                (onAddClick ? (
                  <Button onClick={onAddClick}>
                    <Plus className="h-4 w-4 mr-2" />
                    {addButtonLabel}
                  </Button>
                ) : (
                  <Link href={addButtonHref!}>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      {addButtonLabel}
                    </Button>
                  </Link>
                ))}
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder ? null : (
                              <div
                                className={
                                  header.column.getCanSort()
                                    ? "cursor-pointer select-none flex items-center gap-2"
                                    : ""
                                }
                                onClick={header.column.getToggleSortingHandler()}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {header.column.getCanSort() && (
                                  <ChevronDown
                                    className={`h-4 w-4 transition-transform ${
                                      header.column.getIsSorted() === "asc"
                                        ? "rotate-180"
                                        : header.column.getIsSorted() === "desc"
                                        ? ""
                                        : "opacity-0"
                                    }`}
                                  />
                                )}
                              </div>
                            )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  {table.getFilteredRowModel().rows.length === 0
                    ? 0
                    : table.getState().pagination.pageIndex *
                        table.getState().pagination.pageSize +
                      1}{" "}
                  to{" "}
                  {table.getFilteredRowModel().rows.length === 0
                    ? 0
                    : Math.min(
                        (table.getState().pagination.pageIndex + 1) *
                          table.getState().pagination.pageSize,
                        table.getFilteredRowModel().rows.length
                      )}{" "}
                  of {table.getFilteredRowModel().rows.length} {entityName}(s)
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">Rows per page</p>
                  <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                      table.setPageSize(Number(value));
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue placeholder="Rows" labels={PAGE_SIZE_LABELS} />
                    </SelectTrigger>
                    <SelectContent side="top" align="start">
                      {[10, 20, 30, 50, 100].map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                          {pageSize}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center text-sm font-medium">
                    Page{" "}
                    {table.getFilteredRowModel().rows.length === 0
                      ? 0
                      : table.getState().pagination.pageIndex + 1}{" "}
                    of {table.getPageCount()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => table.setPageIndex(0)}
                      disabled={!table.getCanPreviousPage()}
                    >
                      <span className="sr-only">Go to first page</span>
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      <span className="sr-only">Go to previous page</span>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      <span className="sr-only">Go to next page</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() =>
                        table.setPageIndex(table.getPageCount() - 1)
                      }
                      disabled={!table.getCanNextPage()}
                    >
                      <span className="sr-only">Go to last page</span>
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
