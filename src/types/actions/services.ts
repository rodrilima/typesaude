import { Service as Model } from "@prisma/client";
import { CommonModelProperties } from "./_general";

export type CreateService = Omit<Model, CommonModelProperties>
export type UpdateService = Partial<Omit<Model, CommonModelProperties>> & { id: Model['id'] }

export type ListReturn = { data: Model[] }