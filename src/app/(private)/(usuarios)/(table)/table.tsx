"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TableSearchInput } from "@/components/table/search-input";
import { TableViewOptions } from "@/components/table/view-options";
import { TablePagination } from "@/components/table/pagination";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { DataTable } from "@/components/table/data-table";
import { columns } from "./columns";
import { ClearFilters } from "@/components/table/clear-filters";
import { Model } from "../config";

interface TableProps {
  data: Model[]
}

export function Table({ data }: TableProps) {
  const table = useReactTable({
    data,
    columns,
    autoResetAll: false,
    initialState: {
      globalFilter: ""
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  })

  return <div>
    <div className="flex items-center justify-between my-5 ">
      <div className="flex gap-2">
        <TableSearchInput table={table} />
        <TableViewOptions table={table} />
        <ClearFilters table={table} />
      </div>
      <TablePagination table={table} />
    </div>
    <ScrollArea className="rounded-md border h-[calc(80vh-120px)]">
      <DataTable table={table} />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>
}