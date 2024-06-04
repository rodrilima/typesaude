import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table as UITable } from "@/components/ui/table";
import { User } from "@prisma/client";
import { Filter } from "lucide-react";
import { RowActions } from "./row-actions";
import { TableSearchInput } from "@/components/table/search-input";
import { TableViewOptions } from "@/components/table/view-options";
import { TablePagination } from "@/components/table/pagination";

interface TableProps {
  data: User[]
}

const headers = ["", "ID", "Nome", "Email"]

export function Table({ data }: TableProps) {
  return <div>
    <div className="flex items-center justify-between my-5 ">
      <div className="flex gap-2">
        <TableSearchInput />
        <TableViewOptions />
      </div>
      <TablePagination />
    </div>
    <ScrollArea className="rounded-md border h-[calc(80vh-120px)]">
      <UITable>
        <TableHeader>
          <TableRow>
            {headers.map(header => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
          <TableRow>
            {headers.map(header => (
              <th key={header}>
                {header && <div className="flex items-center relative min-w-32">
                  <Filter size={14} className="absolute left-3" />
                  <input className="px-2 py-4 pl-8 border-none h-full w-full rounded-md font-normal focus:outline-none" />
                </div>}
              </th>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(item => (
            <TableRow key={item.id}>
              <TableCell><RowActions /></TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </UITable>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>
}