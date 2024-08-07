import { z } from "zod"

export const createDocumentValidation = z.object({
  file: z.instanceof(File, { message: "Arquivo inválido" }),
  path: z.string().optional(),
  userId: z.number().optional().nullable(),
  consultationId: z.number().optional().nullable(),
});

export const updateDocumentValidation = z.object({
  id: z
    .number({ required_error: "Nenhum ID foi fornecido." })
    .int("ID deve ser um número inteiro.")
    .positive("ID não pode ser um número negativo."),
  file: z.instanceof(File, { message: "Arquivo inválido" }).optional(),
  path: z.string().optional().nullable(),
  userId: z.number().optional().nullable(),
  consultationId: z.number().optional().nullable(),
});