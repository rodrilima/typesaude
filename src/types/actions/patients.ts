import { Patient as Model } from "@prisma/client";
import { CommonModelProperties } from "./_general";

export type CreatePatient = Omit<Model, CommonModelProperties>
export type UpdatePatient = Partial<Omit<Model, CommonModelProperties>> & { id: Model['id'] }

export type ListReturn = { data: Model[] }