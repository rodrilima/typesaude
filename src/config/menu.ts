import { Users, ClipboardPlus, CalendarCheck, Stethoscope, BookUser, BriefcaseMedical } from "lucide-react";

interface MenuItemProps {
  title: string;
  icon: React.ComponentType<any>;
  href: string;
}

export const menuDefault: MenuItemProps[] = [
  { title: "Consultas", icon: ClipboardPlus, href: "/consultas" },
  { title: "Agendamentos", icon: CalendarCheck, href: "/agendamentos" },
  { title: "Pacientes", icon: BookUser, href: "/pacientes" },
  { title: "Médicos", icon: Stethoscope, href: "/medicos" },
  { title: "Serviços", icon: BriefcaseMedical, href: "/servicos" },
]

export const menuAdmin: MenuItemProps[] = [
  ...menuDefault,
  { title: "Usuários", icon: Users, href: "/" }
]