import { User as Model } from "@prisma/client";
import { CommonModelProperties } from "./_general";

export type CreateUser = Omit<Model, CommonModelProperties>
export type UpdateUser = Partial<Omit<Model, CommonModelProperties>> & { id: Model['id'] }

export type ListReturn = { data: Omit<Model, 'password'>[] }