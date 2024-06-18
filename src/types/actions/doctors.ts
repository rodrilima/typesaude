import { Doctor as Model } from "@prisma/client";
import { CommonModelProperties } from "./_general";

export type CreateDoctor = Omit<Model, CommonModelProperties>
export type UpdateDoctor = Partial<Omit<Model, CommonModelProperties>> & { id: Model['id'] }

export type ListReturn = { data: Model[] }