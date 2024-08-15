import { zEmptyString } from "@/helpers/zod";
import { z } from "zod"

export const createDoctorValidation = z.object({
  name: z
    .string({ required_error: "Nome é obrigatório." })
    .min(1, "Nome não pode ser em branco."),
  cpf: zEmptyString(z
    .string()
    .min(11, "CPF deve ter no mínimo 11 caracteres.")
    .optional()),
  crm: z.string().optional(),
  phone: zEmptyString(z
    .string()
    .min(10, "Telefone deve ter no mínimo 10 caracteres.")
    .optional()),
  email: zEmptyString(z.string().email("Email inválido.").optional()),
});

export const updateDoctorValidation = z.object({
  id: z
    .number({ required_error: "Nenhum ID foi fornecido." })
    .int("ID deve ser um número inteiro.")
    .positive("ID não pode ser um número negativo."),
  name: z.string().optional(),
  cpf: zEmptyString(z
    .string()
    .min(11, "CPF deve ter no mínimo 11 caracteres.")
    .optional()
    .nullable()),
  crm: z.string().optional().nullable(),
  phone: zEmptyString(z
    .string()
    .min(10, "Telefone deve ter no mínimo 10 caracteres.")
    .optional()
    .nullable()),
  email: zEmptyString(z.string().email("Email inválido.").optional().nullable()),
});