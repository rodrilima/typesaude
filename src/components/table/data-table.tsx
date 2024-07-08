import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table as UITable } from "@/components/ui/table";
import { flexRender, Table } from "@tanstack/react-table";
import { Filter } from "lucide-react";

interface DataTableProps<TData> {
  table: Table<TData>
}

export function DataTable<TData>({ table }: DataTableProps<TData>) {
  return <UITable>
    <TableHeader>
      <TableRow>
        {table.getHeaderGroups()[0].headers.map(header => (
          <TableHead key={header.id}>{flexRender(
            header.column.columnDef.header,
            header.getContext()
          )}</TableHead>
        ))}
      </TableRow>
      <TableRow>
        {table.getHeaderGroups()[0].headers.map(header => (
          <th key={header.id}>
            {header.column.getCanFilter() && <div className="flex items-center relative min-w-32">
              <Filter size={14} className="absolute left-3" />
              <input className="px-2 py-4 pl-8 border-none h-full w-full rounded-md font-normal focus:outline-none" />
            </div>}
          </th>
        ))}
      </TableRow>
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
}