import { MAX_ATTACHMENT_SIZE_MB, MAX_AVATAR_SIZE_MB } from "@/config/contants";
import { DOCUMENT_PATHS } from "@/enums/document-paths";
import { z } from "zod"

export const createDocumentValidation = z.object({
  file: z.instanceof(File, { message: "Arquivo inválido" }),
  path: z.nativeEnum(DOCUMENT_PATHS, { message: "Caminho de upload não identificado" }),
  userId: z.number().optional().nullable(),
  consultationId: z.number().optional().nullable(),
})
.superRefine(validateDocumentType)
.superRefine(verifyDocumentSize);

export const updateDocumentValidation = z.object({
  id: z
    .number({ required_error: "Nenhum ID foi fornecido." })
    .int("ID deve ser um número inteiro.")
    .positive("ID não pode ser um número negativo."),
  file: z.instanceof(File, { message: "Arquivo inválido" }).optional(),
  path: z.nativeEnum(DOCUMENT_PATHS, { message: "Caminho de upload não identificado" }),
  userId: z.number().optional().nullable(),
  consultationId: z.number().optional().nullable(),
})
.superRefine(validateDocumentType)
.superRefine(verifyDocumentSize);

interface IRefineDocument {
  file?: File;
  path?: DOCUMENT_PATHS;
}

function validateDocumentType({ file, path }: IRefineDocument, ctx: z.RefinementCtx) {
  if(file && path === DOCUMENT_PATHS.AVATAR && !file.type.startsWith('image/')) {
    ctx.addIssue({ code: 'custom', message: 'O arquivo enviado precisa ser uma imagem.' })
  }
}

function verifyDocumentSize({ file, path }: IRefineDocument, ctx: z.RefinementCtx) {
  if(file && path === DOCUMENT_PATHS.AVATAR && file.size > MAX_AVATAR_SIZE_MB * 1024 * 1024) {
    ctx.addIssue({ code: 'custom', message: `A imagem de avatar pode ter no máximo ${MAX_AVATAR_SIZE_MB} MB` })
  }

  if(file && path === DOCUMENT_PATHS.ATTACHMENT && file.size > MAX_ATTACHMENT_SIZE_MB * 1024 * 1024) {
    ctx.addIssue({ code: 'custom', message: `O anexo pode ter no máximo ${MAX_ATTACHMENT_SIZE_MB} MB` })
  }
}