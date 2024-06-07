import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "../ui/button";

interface TablePaginationProps { }

export function TablePagination({ }: TablePaginationProps) {
  return <div className="flex items-center gap-6 px-2">
    <div className="text-sm">
      Página 1 de 1
    </div>
    <div className="flex gap-2">
      <Button variant="outline" className="h-8 w-8 p-0 hidden md:flex">
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button variant="outline" className="h-8 w-8 p-0">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button variant="outline" className="h-8 w-8 p-0">
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button variant="outline" className="h-8 w-8 p-0 hidden md:flex">
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  </div>
}