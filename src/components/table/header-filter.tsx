import { Table } from "@tanstack/react-table"
import { TableRow } from "../ui/table"
import { Filter } from "lucide-react"

interface TableHeaderFilterProps<TData> {
  table: Table<TData>
}

export function TableHeaderFilter<TData>({ table }: TableHeaderFilterProps<TData>) {
  return <TableRow>
    {table.getHeaderGroups()[0].headers.map(header => (
      <th key={header.id}>
        {header.column.getCanFilter() && <div className="flex items-center relative min-w-32">
          <Filter size={14} className="absolute left-3" />
          <input
            className="px-2 py-4 pl-8 border-none h-full w-full rounded-md font-normal focus:outline-none"
            onChange={(e) => header.column.setFilterValue(e.target.value)}
            value={(header.column.getFilterValue() as string) ?? ""}
          />
        </div>}
      </th>
    ))}
  </TableRow>
}