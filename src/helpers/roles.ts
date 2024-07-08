import { ROLES } from "@/enums/roles";

export function getRoleName(role?: string) {
  switch (role) {
    case ROLES.ADMIN:
      return "Administrador"
    case ROLES.EDITOR:
      return "Editor"
    case ROLES.VIEWER:
      return "Visitante"
    default:
      return "Desconhecido"
  }
}