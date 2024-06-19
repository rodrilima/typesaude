import { ROLES } from "@/enums/roles"
import { z } from "zod"

export const createUserValidation = z.object({
  name: z
    .string({ required_error: "Nome é obrigatório." })
    .min(1, "Nome não pode ser em branco."),
  email: z
    .string({ required_error: "Email é obrigatório." })
    .min(1, "Email não pode ser em branco.")
    .email("Email inválido."),
  password: z
    .string({ required_error: "Senha é obrigatória." })
    .min(6, "Senha precisa ter pelo menos 6 caracteres."),
  role: z.nativeEnum(
    ROLES,
    { required_error: "Cargo é obrigatório.", invalid_type_error: "Este cargo é inválido." }
  )
})

export const updateUserValidation = z.object({
  id: z
    .number({ required_error: "Nenhum ID foi fornecido." })
    .int("ID deve ser um número inteiro.")
    .positive("ID não pode ser um número negativo."),
  name: z
    .string()
    .min(1, "Nome não pode ser em branco.")
    .optional(),
  email: z
    .string()
    .min(1, "Email não pode ser em branco.")
    .email("Email inválido.")
    .optional(),
  password: z
    .string()
    .min(6, "Senha precisa ter pelo menos 6 caracteres.")
    .optional(),
  role: z
    .nativeEnum(ROLES, { invalid_type_error: "Este cargo é inválido." })
    .optional()
})