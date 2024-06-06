"use client"

import { menu } from "@/config/menu";
import { LogOut, Users } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps { }

export function Sidebar({ }: SidebarProps) {
  const path = usePathname()

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