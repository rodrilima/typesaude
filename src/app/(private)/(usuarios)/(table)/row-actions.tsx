import { TableActionDropdown } from "@/components/table/action-dropdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Edit, Trash } from "lucide-react";

interface RowActionsProps { }

export function RowActions({ }: RowActionsProps) {
  return <TableActionDropdown>
    <DropdownMenuItem>
      <Edit className="mr-2 h-4 w-4" />  Abrir
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Trash className="mr-2 h-4 w-4" /> Excluir
    </DropdownMenuItem>
  </TableActionDropdown>
}