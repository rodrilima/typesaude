"use client"

import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table as UITable } from "@/components/ui/table";
import { flexRender, Table } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { TableHeaderFilter } from "./header-filter";
import { SessionProvider } from "next-auth/react";

interface DataTableProps<TData> {
  table: Table<TData>
}

export function DataTable<TData>({ table }: DataTableProps<TData>) {
  return <SessionProvider>
    <UITable>
      <TableHeader>
        <TableRow>
          {table.getHeaderGroups()[0].headers.map(header => (
            <TableHead
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-1">
                {{
                  asc: <ArrowUp size={12} />,
                  desc: <ArrowDown size={12} />
                }[header.column.getIsSorted() as string]}

                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </div>
            </TableHead>
          ))}
        </TableRow>
        <TableHeaderFilter table={table} />
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map(row => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map(cell => (
              <TableCell key={cell.id}>{flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
              )}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </UITable>
  </SessionProvider>
}