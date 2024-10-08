"use client"

import { menuDefault, menuAdmin } from "@/config/menu";
import { ROLES } from "@/enums/roles";
import { LogOut, Users } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  session: Session;
  closeSideMenu?: () => void
}

export function Sidebar({ session, closeSideMenu = () => { } }: SidebarProps) {
  const path = usePathname()

  const menu = session.user.role === ROLES.ADMIN ? menuAdmin : menuDefault

  return <div className="h-full w-full md:w-64 md:border-r pr-5 pt-5 md:p-5">
    {menu.map(item => (
      <Link key={item.title} href={item.href} onClick={closeSideMenu}>
        <div className={`flex items-center text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground px-3 py-4 my-2 rounded-md ${path === item.href ? "bg-accent font-medium" : ""}`}>
          <item.icon size={18} className="mr-2" /> {item.title}
        </div>
      </Link>
    ))}
    <div
      onClick={() => signOut()}
      className="flex items-center text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground px-3 py-4 my-2 rounded-md"
    >
      <LogOut size={18} className="mr-2" /> Sair
    </div>
  </div>
}