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

export function canRoleEdit(role?: string) {
  if(!role) return false;
  return [ROLES.ADMIN, ROLES.EDITOR].includes(role as ROLES)
}