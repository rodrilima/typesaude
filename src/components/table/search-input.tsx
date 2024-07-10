import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Table } from "@tanstack/react-table";

interface TableSearchInputProps<TData> {
  table: Table<TData>
}

export function TableSearchInput<TData>({ table }: TableSearchInputProps<TData>) {
  return <div className="items-center relative hidden md:flex">
    <Search size={18} className="absolute left-3" />
    <Input
      className="pl-9"
      placeholder="Buscar na tabela..."
      onChange={(e) => table.setGlobalFilter(e.target.value)}
      value={table.getState().globalFilter}
    />
  </div>
}