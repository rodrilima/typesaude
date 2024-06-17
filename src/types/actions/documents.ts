import { Document as Model } from "@prisma/client";

export type CreateDocument = FormData
export type UpdateDocument = FormData

export type ListReturn = { data: Model[] }