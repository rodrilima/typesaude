import { Columns } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import { Table } from "@tanstack/react-table";

interface TableViewOptionsProps<TData> {
  table: Table<TData>
}

export function TableViewOptions<TData>({ table }: TableViewOptionsProps<TData>) {
  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button size="sm" variant="outline" className="h-10">
        <Columns className="h-4 w-4 mr-2" /> Colunas
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <ScrollArea className="h-60">
        <DropdownMenuLabel>Colunas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={table.getIsAllColumnsVisible()}
          onCheckedChange={(value) => {
            table.toggleAllColumnsVisible(value)
            table.getColumn('actions')?.toggleVisibility(true)
          }}
          onSelect={(e) => e.preventDefault()}
        >
          Todas
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide() && column.accessorFn)
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={(value) => {
                column.toggleVisibility(value)
              }}
              onSelect={(e) => e.preventDefault()}
            >
              <>{column.columnDef.header}</>
            </DropdownMenuCheckboxItem>
          ))}
      </ScrollArea>
    </DropdownMenuContent>
  </DropdownMenu>
}