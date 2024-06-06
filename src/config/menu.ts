import { Users } from "lucide-react";

interface MenuItemProps {
  title: string;
  icon: React.ComponentType<any>;
  href: string;
}

export const menuDefault: MenuItemProps[] = []

export const menuAdmin: MenuItemProps[] = [
  ...menuDefault,
  { title: "Usuários", icon: Users, href: "/" }
]