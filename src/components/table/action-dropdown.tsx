import { MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

interface TableActionDropdownProps extends DropdownMenuProps {
  children: React.ReactNode
}

export function TableActionDropdown({ children, ...props }: TableActionDropdownProps) {
  return <DropdownMenu {...props}>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <MoreVertical className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Ações</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {children}
    </DropdownMenuContent>
  </DropdownMenu>
}