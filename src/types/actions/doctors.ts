import { Doctor as Model } from "@prisma/client";
import { CommonModelProperties } from "./_general";
import { TFormRelation } from "../form";

export type CreateDoctor = Omit<Model, CommonModelProperties> & { services: TFormRelation[] }
export type UpdateDoctor = Partial<Omit<Model, CommonModelProperties>> & { id: Model['id'], services: TFormRelation[] }

export type ListReturn = { data: Model[] }