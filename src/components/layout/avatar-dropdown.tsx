"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface AvatarDropdownProps {
  session: Session
}

export function AvatarDropdown({ session }: AvatarDropdownProps) {
  const avatarFallback = session.user?.name?.substring(0, 2).toUpperCase() || "U"

  return <DropdownMenu>
    <DropdownMenuTrigger className="focus:outline-none">
      <Avatar>
        <AvatarImage src={session.user?.image || undefined} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={() => signOut()}>Sair</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}