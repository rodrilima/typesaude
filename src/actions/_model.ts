import { prisma } from "@/lib/prisma";
import { DefaultReturn, ErrorReturn } from "@/types/actions/_general";
import {
  CreateUser as CreateResource,
  UpdateUser as UpdateResource,
  ListReturn,
} from "@/types/actions/users";
import { User as Model } from "@prisma/client";

const model = prisma.user
const singular = 'usuário'
const plural = 'usuários'

export async function create(data: CreateResource): Promise<DefaultReturn<Model> | ErrorReturn> {
  try {
    const response = await model.create({ data })
    return { data: response }
  } catch (error) {
    console.error(error)
    return { error: `Erro no sistema ao criar um ${singular}. Entre em contato com nosso time.` }
  }
}

export async function find(): Promise<ListReturn | ErrorReturn> {
  try {
    const response = await model.findMany()
    return { data: response }
  } catch (error) {
    console.error(error)
    return { error: `Erro no sistema ao listar ${plural}. Entre em contato com nosso time.` }
  }
}

export async function update(data: UpdateResource): Promise<DefaultReturn<Model> | ErrorReturn> {
  try {
    const { id, ...dataToUpdate } = data

    const response = await model.update({ where: { id }, data: dataToUpdate })
    return { data: response }
  } catch (error) {
    console.error(error)
    return { error: `Erro no sistema ao atualizar um ${singular}. Entre em contato com nosso time.` }
  }
}

export async function remove(id: Model['id']): Promise<void | ErrorReturn> {
  try {
    await model.delete({ where: { id } })
  } catch (error) {
    console.error(error)
    return { error: `Erro no sistema ao remover um ${singular}. Entre em contato com nosso time.` }
  }
}