import { ColumnDef } from "@tanstack/react-table";
import { RowActions } from "./row-actions";
import { getRoleName } from "@/helpers/roles";
import { format } from "date-fns";
import { Model } from "../config";

export const columns: ColumnDef<Model>[] = [
  { id: 'actions', cell: ({ row }) => <RowActions row={row} /> },
  { accessorKey: 'id', header: 'ID', filterFn: 'includesString' },
  { accessorKey: 'name', header: 'Nome' },
  { accessorKey: 'description', header: 'Descrição' },
  {
    id: 'price',
    header: 'Preço',
    accessorFn: ({ price }) => price ? `${Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'brl'
    }).format(price as number)}` : "Não informado"
  },
  {
    accessorKey: 'duration',
    header: 'Duração (min)',
    cell: ({ getValue }) => `${getValue()} min`,
    filterFn: 'includesString'
  },
  {
    id: 'createdAt',
    header: 'Criado em',
    accessorFn: ({ createdAt }) => format(createdAt, 'dd/MM/yyyy HH:mm'),
    sortingFn: (rowA, rowB) => rowA.original.createdAt.getTime() - rowB.original.createdAt.getTime()
  }
]