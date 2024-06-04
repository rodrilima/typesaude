import { Users } from "lucide-react";

interface MenuItemProps {
  title: string;
  icon: React.ComponentType<any>;
  href: string;
}

export const menu: MenuItemProps[] = [
  { title: "Usuários", icon: Users, href: "/" }
]