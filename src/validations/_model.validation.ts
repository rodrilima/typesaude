import { z } from "zod"

export const createValidation = z.object({
  name: z
    .string({ required_error: "Nome é obrigatório." })
    .min(1, "Nome não pode ser em branco."),
  email: z
    .string({ required_error: "Email é obrigatório." })
    .min(1, "Email não pode ser em branco.")
    .email("Email inválido."),
})

export const updateValidation = z.object({
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
})