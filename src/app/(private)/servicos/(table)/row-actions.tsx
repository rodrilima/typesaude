"use client"

import { TableActionDropdown } from "@/components/table/action-dropdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Edit, Trash } from "lucide-react";
import { SheetForm } from "../(form)/sheet-form";
import { Row } from "@tanstack/react-table";
import { Model, actions } from "../config";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { RemoveDialog } from "@/components/dialog/remove-dialog";
import { useState } from "react";

interface RowActionsProps {
  row: Row<Model>
}

export function RowActions({ row }: RowActionsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return <TableActionDropdown open={dropdownOpen} onOpenChange={setDropdownOpen}>
    <Sheet>
      <SheetTrigger asChild>
        <DropdownMenuItem onSelect={e => e.preventDefault()}>
          <Edit className="mr-2 h-4 w-4" />  Abrir
        </DropdownMenuItem>
      </SheetTrigger>
      <SheetForm dataToUpdate={row.original} />
    </Sheet>

    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={e => e.preventDefault()}>
          <Trash className="mr-2 h-4 w-4" /> Excluir
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <RemoveDialog removeFn={() => {
        actions.remove(row.original.id)
        setDropdownOpen(false)
      }} />
    </AlertDialog>
  </TableActionDropdown>
}