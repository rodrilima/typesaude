import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface TableSearchInputProps { }

export function TableSearchInput({ }: TableSearchInputProps) {
  return <div className="flex items-center relative">
    <Search size={18} className="absolute left-3" />
    <Input className="pl-9" placeholder="Buscar na tabela..." />
  </div>
}