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
  Loader2,
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
  filterSlot?: React.ReactNode;
  toolbarClassName?: string;
  serverSideSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | string | null;
  serverSidePagination?: boolean;
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSortChange?: (sortBy: string, sortOrder: "asc" | "desc") => void;
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
  filterSlot,
  toolbarClassName = "",
  serverSideSearch = false,
  searchValue,
  onSearchChange,
  isLoading = false,
  isError = false,
  error,
  serverSidePagination = false,
  page,
  limit,
  total,
  totalPages,
  onPageChange,
  onLimitChange,
  sortBy: sortByProp,
  sortOrder: sortOrderProp,
  onSortChange,
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
      globalFilter: serverSideSearch ? "" : globalFilter,
      // When using server-side pagination, sync page size to server limit so all returned rows are shown
      ...(serverSidePagination && limit !== undefined
        ? { pagination: { pageIndex: 0, pageSize: limit } }
        : {}),
    },
    initialState: {
      pagination: {
        pageSize: serverSidePagination ? (limit ?? defaultPageSize) : defaultPageSize,
      },
    },
  });

  // Generate header if title is provided
  const displayHeader =
    header ||
    (headerTitle && (
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {headerTitle}
          </h2>
          {headerDescription && (
            <p className="mt-1 text-sm text-muted-foreground">
              {headerDescription}
            </p>
          )}
        </div>
        {headerAction && <div className="w-full shrink-0 sm:w-auto">{headerAction}</div>}
      </div>
    ));

  return (
    <div className="min-w-0 space-y-4 px-2 sm:px-4 lg:px-6">
      <Card>
        {displayHeader && (
          <div className="border-b px-4 pb-4 sm:px-6">{displayHeader}</div>
        )}
        <CardContent>
          <div className="space-y-4">
            {/* Search */}
            <div className="flex flex-wrap items-center gap-y-2">
              <div className="relative flex-1 min-w-[200px] w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  value={serverSideSearch ? (searchValue ?? "") : (globalFilter ?? "")}
                  onChange={(event) =>
                    serverSideSearch && onSearchChange
                      ? onSearchChange(event.target.value)
                      : setGlobalFilter(event.target.value)
                  }
                  className="pl-9"
                />
              </div>
              <div className={toolbarClassName}>
                {filterSlot}
                {showAddButton &&
                  (addButtonHref || onAddClick) &&
                  (onAddClick ? (
                    <Button onClick={onAddClick} className="w-full lg:col-span-1 col-span-3">
                      <Plus className="h-4 w-4 mr-2" />
                      {addButtonLabel}
                    </Button>
                  ) : (
                    <Link href={addButtonHref!} className="w-full lg:col-span-1 col-span-3">
                      <Button className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        {addButtonLabel}
                      </Button>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Table */}
            <div className="min-w-0 overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        const meta = header.column.columnDef.meta as { sortKey?: string } | undefined;
                        const sortKey = meta?.sortKey;
                        const isServerSortable = !!onSortChange && !!sortKey;
                        const isSortedByThis = sortByProp === sortKey;
                        const handleHeaderClick = isServerSortable
                          ? () => {
                            const nextOrder: "asc" | "desc" =
                              isSortedByThis && sortOrderProp === "desc" ? "asc" : "desc";
                            onSortChange(sortKey, nextOrder);
                          }
                          : header.column.getToggleSortingHandler();
                        const canSort = isServerSortable || header.column.getCanSort();
                        const sortIndicator =
                          isServerSortable && isSortedByThis
                            ? sortOrderProp
                            : !isServerSortable && header.column.getIsSorted()
                              ? header.column.getIsSorted()
                              : null;

                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder ? null : (
                              <div
                                className={
                                  canSort
                                    ? "cursor-pointer select-none flex items-center gap-2"
                                    : ""
                                }
                                onClick={handleHeaderClick}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {canSort && (
                                  <ChevronDown
                                    className={`h-4 w-4 transition-transform ${sortIndicator === "asc"
                                        ? "rotate-180"
                                        : sortIndicator === "desc"
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
                  {isError ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        <div className="flex flex-col items-center justify-center gap-2 text-destructive">
                          <span className="font-medium">Failed to load data</span>
                          <span className="text-sm text-muted-foreground">
                            {error instanceof Error
                              ? error.message
                              : typeof error === "string"
                                ? error
                                : "An error occurred"}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : isLoading ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                          <Loader2 className="h-6 w-6 animate-spin" />
                          <span>Loading...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => {
                          const cellMeta = cell.column.columnDef.meta as { cellClassName?: string } | undefined;
                          return (
                            <TableCell
                              key={cell.id}
                              className={cellMeta?.cellClassName}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          );
                        })}
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
            <div className="flex flex-col gap-4 xl:flex-row items-center xl:justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">
                  {serverSidePagination && total !== undefined
                    ? `Showing ${total === 0 ? 0 : (page ?? 1) * (limit ?? 10) - (limit ?? 10) + 1} to ${Math.min((page ?? 1) * (limit ?? 10), total)} of ${total} ${entityName}(s)`
                    : `Showing ${table.getFilteredRowModel().rows.length === 0
                      ? 0
                      : table.getState().pagination.pageIndex *
                      table.getState().pagination.pageSize +
                      1
                    } to ${table.getFilteredRowModel().rows.length === 0
                      ? 0
                      : Math.min(
                        (table.getState().pagination.pageIndex + 1) *
                        table.getState().pagination.pageSize,
                        table.getFilteredRowModel().rows.length
                      )
                    } of ${table.getFilteredRowModel().rows.length} ${entityName}(s)`}
                </p>
              </div>
              <div className="flex flex-wrap w-full lg:w-fit items-center gap-4 sm:gap-6">
                <div className="flex items-center w-full lg:w-fit justify-center gap-2">
                  <p className="shrink-0 text-sm font-medium">Rows per page</p>
                  <Select
                    value={`${serverSidePagination ? limit ?? defaultPageSize : table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                      const numValue = Number(value);
                      if (serverSidePagination && onLimitChange) {
                        onLimitChange(numValue);
                      } else {
                        table.setPageSize(numValue);
                      }
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
                <div className="flex items-center w-full lg:w-fit justify-center gap-2">
                  <div className="flex items-center justify-center text-sm font-medium">
                    Page{" "}
                    {serverSidePagination
                      ? page ?? 1
                      : table.getFilteredRowModel().rows.length === 0
                        ? 0
                        : table.getState().pagination.pageIndex + 1}{" "}
                    of{" "}
                    {serverSidePagination
                      ? totalPages ?? 1
                      : table.getPageCount()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        if (serverSidePagination && onPageChange) {
                          onPageChange(1);
                        } else {
                          table.setPageIndex(0);
                        }
                      }}
                      disabled={
                        serverSidePagination
                          ? (page ?? 1) <= 1
                          : !table.getCanPreviousPage()
                      }
                    >
                      <span className="sr-only">Go to first page</span>
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        if (serverSidePagination && onPageChange && page) {
                          onPageChange(page - 1);
                        } else {
                          table.previousPage();
                        }
                      }}
                      disabled={
                        serverSidePagination
                          ? (page ?? 1) <= 1
                          : !table.getCanPreviousPage()
                      }
                    >
                      <span className="sr-only">Go to previous page</span>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        if (serverSidePagination && onPageChange && page) {
                          onPageChange(page + 1);
                        } else {
                          table.nextPage();
                        }
                      }}
                      disabled={
                        serverSidePagination
                          ? (page ?? 1) >= (totalPages ?? 1)
                          : !table.getCanNextPage()
                      }
                    >
                      <span className="sr-only">Go to next page</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        if (serverSidePagination && onPageChange && totalPages) {
                          onPageChange(totalPages);
                        } else {
                          table.setPageIndex(table.getPageCount() - 1);
                        }
                      }}
                      disabled={
                        serverSidePagination
                          ? (page ?? 1) >= (totalPages ?? 1)
                          : !table.getCanNextPage()
                      }
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
