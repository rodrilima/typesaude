import { Table } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { X } from "lucide-react"

interface ClearFiltersProps<TData> {
  table: Table<TData>
}

export function ClearFilters<TData>({ table }: ClearFiltersProps<TData>) {
  return (table.getState().columnFilters.length || table.getState().globalFilter)
    && <Button
      className="hidden lg:flex ml-auto"
      variant="outline"
      onClick={() => {
        table.resetColumnFilters()
        table.setGlobalFilter("")
      }}
    >
      <X className="h-4 w-4 mr-2" /> <p className="text-sm">Limpar Filtros</p>
    </Button>
}