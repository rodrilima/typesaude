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
  {
    id: 'birth',
    header: 'Data de Nascimento',
    accessorFn: ({ birth }) => birth ? format(birth, 'dd/MM/yyyy') : "",
    sortingFn: (rowA, rowB) => (rowA.original.birth?.getTime() ?? 0) - (rowB.original.birth?.getTime() ?? 0)
  },
  { accessorKey: 'phone', header: 'Telefone', cell: ({ getValue }) => applyMask(getValue(), phoneMask) },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'address', header: 'Endereço' },
  {
    id: 'createdAt',
    header: 'Criado em',
    accessorFn: ({ createdAt }) => format(createdAt, 'dd/MM/yyyy HH:mm'),
    sortingFn: (rowA, rowB) => rowA.original.createdAt.getTime() - rowB.original.createdAt.getTime()
  }
]