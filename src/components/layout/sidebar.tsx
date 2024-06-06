"use client"

import { menuDefault, menuAdmin } from "@/config/menu";
import { ROLES } from "@/enums/roles";
import { LogOut, Users } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  session: Session
}

export function Sidebar({ session }: SidebarProps) {
  const path = usePathname()

  const menu = session.user.role === ROLES.ADMIN ? menuAdmin : menuDefault

  return <div className="h-full w-64 border-r p-5">
    {menu.map(item => (
      <Link key={item.title} href={item.href}>
        <div className={`flex items-center text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md ${path === item.href ? "bg-accent font-medium" : ""}`}>
          <Users size={18} className="mr-2" /> Usuários
        </div>
      </Link>
    ))}
    <div
      onClick={() => signOut()}
      className="flex items-center text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md"
    >
      <LogOut size={18} className="mr-2" /> Sair
    </div>
  </div>
}