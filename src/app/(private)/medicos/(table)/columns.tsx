import { ColumnDef } from "@tanstack/react-table";
import { RowActions } from "./row-actions";
import { format } from "date-fns";
import { Model } from "../config";
import { applyMask, cpfMask, phoneMask } from "@/helpers/mask";

export const columns: ColumnDef<Model>[] = [
  { id: 'actions', cell: ({ row }) => <RowActions row={row} /> },
  { accessorKey: 'id', header: 'ID', filterFn: 'includesString' },
  { accessorKey: 'name', header: 'Nome' },
  { accessorKey: 'cpf', header: 'CPF', cell: ({ getValue }) => applyMask(getValue(), cpfMask) },
  { accessorKey: 'crm', header: 'CRM' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'phone', header: 'Telefone', cell: ({ getValue }) => applyMask(getValue(), phoneMask) },
  {
    id: 'createdAt',
    header: 'Criado em',
    accessorFn: ({ createdAt }) => format(createdAt, 'dd/MM/yyyy HH:mm'),
    sortingFn: (rowA, rowB) => rowA.original.createdAt.getTime() - rowB.original.createdAt.getTime()
  }
]