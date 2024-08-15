import { Service as Model } from "@prisma/client";
import { CommonModelProperties } from "./_general";

export type CreateModel = Omit<Model, CommonModelProperties>
export type UpdateModel = Partial<Omit<Model, CommonModelProperties>> & { id: Model['id'] }

export type ListReturn = { data: Model[] }