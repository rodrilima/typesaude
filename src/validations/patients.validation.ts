import { z } from "zod"

export const createPatientValidation = z.object({
  name: z
    .string({ required_error: "Nome é obrigatório." })
    .min(1, "Nome não pode ser em branco."),
  cpf: z
    .string()
    .min(11, "CPF deve ter no mínimo 11 caracteres.")
    .optional(),
  birth: z.date().optional(),
  phone: z
    .string()
    .min(10, "Telefone deve ter no mínimo 10 caracteres.")
    .optional(),
  email: z.string().email("Email inválido").optional(),
  address: z.string().optional(),
});

export const updatePatientValidation = z.object({
  id: z
    .number({ required_error: "Nenhum ID foi fornecido." })
    .int("ID deve ser um número inteiro.")
    .positive("ID não pode ser um número negativo."),
  name: z.string().optional(),
  cpf: z
    .string()
    .min(11, "CPF deve ter no mínimo 11 caracteres.")
    .optional()
    .nullable(),
  birth: z.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email("Email inválido").optional().nullable(),
  address: z.string().optional().nullable(),
});