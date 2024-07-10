"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { User } from "@prisma/client";
import { TableSearchInput } from "@/components/table/search-input";
import { TableViewOptions } from "@/components/table/view-options";
import { TablePagination } from "@/components/table/pagination";
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { DataTable } from "@/components/table/data-table";
import { columns } from "./columns";

interface TableProps {
  data: Omit<User, 'password'>[]
}

export function Table({ data }: TableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  return <div>
    <div className="flex items-center justify-between my-5 ">
      <div className="flex gap-2">
        <TableSearchInput />
        <TableViewOptions table={table} />
      </div>
      <TablePagination table={table} />
    </div>
    <ScrollArea className="rounded-md border h-[calc(80vh-120px)]">
      <DataTable table={table} />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>
}