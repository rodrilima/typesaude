import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface AvatarDropdownProps { }

export function AvatarDropdown({ }: AvatarDropdownProps) {
  return <DropdownMenu>
    <DropdownMenuTrigger className="focus:outline-none">
      <Avatar>
        <AvatarFallback>RL</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>Sair</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}