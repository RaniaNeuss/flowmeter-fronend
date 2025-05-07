"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { RfpFormData } from "@/types";

interface Props {
  data: RfpFormData[];
  loading: boolean;
  onEdit: (id: number) => void;
  onViewDetails: (id: number) => void;
}

export function RfpDataTable({
  data,
  loading,
  onEdit,
  onViewDetails,
}: Props) {
  // — Table feature state —
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // — Helpers —
  const formatDate = (val?: string | null) =>
    val ? new Date(val).toLocaleDateString() : "—";
  const boolIcon = (b?: boolean) => (b ? "✔" : "—");

  // — Column definitions —
  const columns = React.useMemo<ColumnDef<RfpFormData>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
            aria-label="Select all rows"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(!!v)}
            aria-label={`Select row ${row.id}`}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "typeOfRfp",
        header: "Type",
        cell: (info) => info.getValue(),
        filterFn: "includesString",
      },
      {
        accessorKey: "rfpReference",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          >
            RFP Ref <ArrowUpDown className="ml-1 inline-block" />
          </Button>
        ),
        cell: (info) => info.getValue(),
        filterFn: "includesString",
      },
      {
        accessorKey: "generalInfo.licensee",
        header: "Licensee",
        cell: (info) => info.getValue() || "—",
        filterFn: "includesString",
      },
      {
        accessorKey: "startDate",
        header: "Start",
        cell: (info) => formatDate(info.getValue() as string),
      },
      {
        accessorKey: "completionDate",
        header: "Complete",
        cell: (info) => formatDate(info.getValue() as string),
      },
      {
        id: "inlet",
        header: "✔ Inlet",
        cell: ({ row }) => boolIcon(row.original.inletToWwTreatment),
        enableSorting: false,
      },
      {
        id: "outlet",
        header: "✔ Outlet",
        cell: ({ row }) => boolIcon(row.original.outletFromWwTreatment),
        enableSorting: false,
      },
      {
        id: "terminal",
        header: "✔ Terminal",
        cell: ({ row }) => boolIcon(row.original.terminalPumpingOutput),
        enableSorting: false,
      },
      {
        id: "tanker",
        header: "✔ Tanker",
        cell: ({ row }) => boolIcon(row.original.wastewaterTankerDischarge),
        enableSorting: false,
      },
      {
        id: "15min",
        header: "✔ 15min",
        cell: ({ row }) =>
          boolIcon(row.original.flowMeasurement?.fifteenMinFlow),
        enableSorting: false,
      },
      {
        id: "event",
        header: "✔ Event",
        cell: ({ row }) =>
          boolIcon(row.original.flowMeasurement?.eventRecording),
        enableSorting: false,
      },
      {
        accessorKey: "flowMonitoring.installation.meterInstallDate",
        header: "Install",
        cell: (info) => formatDate(info.getValue() as string),
      },
      {
        accessorKey: "flowMonitoring.installation.meterRemovalDate",
        header: "Remove",
        cell: (info) => formatDate(info.getValue() as string),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onViewDetails(row.original.id!)}>
                View details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(row.original.id!)}>
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        enableHiding: false,
        enableSorting: false,
      },
    ],
    [onEdit, onViewDetails]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center space-x-4">
        <Input
          placeholder="Filter Type…"
          value={(table.getColumn("typeOfRfp")?.getFilterValue() as string) || ""}
          onChange={(e) => table.getColumn("typeOfRfp")?.setFilterValue(e.target.value)}
          className="max-w-xs"
        />
        <Input
          placeholder="Filter RFP Ref…"
          value={(table.getColumn("rfpReference")?.getFilterValue() as string) || ""}
          onChange={(e) => table.getColumn("rfpReference")?.setFilterValue(e.target.value)}
          className="max-w-xs"
        />
        {/* <Input
          placeholder="Filter Licensee…"
          value={(table.getColumn("generalInfo.licensee")?.getFilterValue() as string) || ""}
          onChange={(e) =>
            table.getColumn("generalInfo.licensee")?.setFilterValue(e.target.value)
          }
          className="max-w-xs"
        /> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-1 inline-block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onCheckedChange={(v) => col.toggleVisibility(!!v)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id}>
                    {h.isPlaceholder
                      ? null
                      : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Loading…
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} selected
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
