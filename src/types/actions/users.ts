import { User } from "@prisma/client";
import { CommonModelProperties } from "./_general";

export type CreateUser = Omit<User, CommonModelProperties>
export type UpdateUser = Partial<Omit<User, CommonModelProperties>> & { id: User['id'] }

export type UserItemReturn =  Omit<User, 'password'> & { avatar: { id: number, url: string } | null };
export type ListReturn = { data: UserItemReturn[] }