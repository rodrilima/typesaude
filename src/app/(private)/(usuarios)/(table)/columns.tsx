import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { RowActions } from "./row-actions";
import { getRoleName } from "@/helpers/roles";
import { format } from "date-fns";

export const columns: ColumnDef<Omit<User, 'password'>>[] = [
  { id: 'actions', cell: () => <RowActions /> },
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Nome' },
  { accessorKey: 'email', header: 'Email' },
  { header: 'Cargo', accessorFn: ({ role }) => getRoleName(role) },
  {
    header: 'Criado em',
    accessorFn: ({ createdAt }) => format(createdAt, 'dd/MM/yyyy HH:mm'),
    sortingFn: (rowA, rowB) => rowA.original.createdAt.getTime() - rowB.original.createdAt.getTime()
  }
]