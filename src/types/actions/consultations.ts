import { Consultation as Model } from "@prisma/client";
import { CommonModelProperties } from "./_general";

export type CreateConsultation = Omit<Model, CommonModelProperties>
export type UpdateConsultation = Partial<Omit<Model, CommonModelProperties>> & { id: Model['id'] }

export type ListReturn = { data: Model[] }