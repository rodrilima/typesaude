import { z } from "zod"

export const createServiceValidation = z.object({
  name: z
    .string({ required_error: "Nome é obrigatório." })
    .min(1, "Nome não pode ser em branco."),
  description: z.string().optional(),
  price: z
    .coerce
    .number({ required_error: "Preço é obrigatório." })
    .positive("Preço deve ser positivo."),
  duration: z
    .coerce
    .number({ required_error: "Duração é obrigatória." })
    .int("Duração deve ser um número inteiro.")
    .positive("Duração deve ser positiva."),
});

export const updateServiceValidation = z.object({
  id: z
    .number({ required_error: "Nenhum ID foi fornecido." })
    .int("ID deve ser um número inteiro.")
    .positive("ID não pode ser um número negativo."),
  name: z.string().optional(),
  description: z.string().optional().nullable(),
  price: z.coerce.number().positive("Preço deve ser positivo.").optional(),
  duration: z
    .coerce
    .number()
    .int("Duração deve ser um número inteiro.")
    .positive("Duração deve ser positiva.")
    .optional(),
});