"use server"

import { ErrorsMessages } from "@/config/messages";
import { ROLES } from "@/enums/roles";
import { prisma } from "@/lib/prisma";
import { DefaultReturn, ErrorReturn } from "@/types/actions/_general";
import {
  CreateUser as CreateResource,
  UpdateUser as UpdateResource,
  ListReturn,
} from "@/types/actions/users";
import { User as Model } from "@prisma/client";
import { getServerSession } from "next-auth";
import bcrypt from "bcrypt"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createUserValidation, updateUserValidation } from "@/validations/users.validation";
import { authOptions } from "@/config/authOptions";
import { revalidatePath } from "next/cache";

const model = prisma.user
const singular = 'usuário'
const plural = 'usuários'
const routePath = '/'

export async function create(data: CreateResource): Promise<DefaultReturn<Omit<Model, 'password'>> | ErrorReturn> {
  try {
    const session = await getServerSession(authOptions)

    if (session?.user.role !== ROLES.ADMIN) {
      return { error: ErrorsMessages.not_authorized }
    }

    const validation = createUserValidation.safeParse(data)

    if (validation.error) {
      return { error: validation.error.issues[0].message }
    }

    const response = await model.create({
      data: { ...data, password: bcrypt.hashSync(data.password, 10) }
    })

    const { password, ...safeResponse } = response

    revalidatePath(routePath)

    return { data: safeResponse }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
      const uniqueValue = (error.meta?.target as string[] | null)?.[0]
      if (uniqueValue === "email")
        return { error: `Já existe um usuário com este email` }
    }

    console.error(error)
    return { error: `Erro no sistema ao criar um ${singular}. Entre em contato com nosso time.` }
  }
}

export async function find(): Promise<ListReturn | ErrorReturn> {
  try {
    const session = await getServerSession(authOptions)

    if (session?.user.role !== ROLES.ADMIN) {
      return { error: ErrorsMessages.not_authorized }
    }

    const response = await model.findMany({
      orderBy: { 
        id: 'desc' 
      }
    })

    const safeResponse = response.map(user => {
      const { password, ...safeUser } = user
      return safeUser
    })

    return { data: safeResponse }
  } catch (error) {
    console.error(error)
    return { error: `Erro no sistema ao listar ${plural}. Entre em contato com nosso time.` }
  }
}

export async function update(data: UpdateResource): Promise<DefaultReturn<Omit<Model, 'password'>> | ErrorReturn> {
  try {
    const session = await getServerSession(authOptions)

    if (session?.user.role !== ROLES.ADMIN) {
      return { error: ErrorsMessages.not_authorized }
    }

    const validation = updateUserValidation.safeParse(data)

    if (validation.error) {
      return { error: validation.error.issues[0].message }
    }

    const { id, ...dataToUpdate } = data

    if (dataToUpdate.password) {
      dataToUpdate.password = bcrypt.hashSync(dataToUpdate.password, 10)
    }

    const response = await model.update({
      where: { id },
      data: dataToUpdate
    })

    revalidatePath(routePath)

    const { password, ...safeResponse } = response

    return { data: safeResponse }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
      const uniqueValue = (error.meta?.target as string[] | null)?.[0]
      if (uniqueValue === "email")
        return { error: `Já existe um usuário com este email` }
    }

    console.error(error)
    return { error: `Erro no sistema ao atualizar um ${singular}. Entre em contato com nosso time.` }
  }
}

export async function remove(id: Model['id']): Promise<void | ErrorReturn> {
  try {
    const session = await getServerSession(authOptions)

    if (session?.user.role !== ROLES.ADMIN) {
      return { error: ErrorsMessages.not_authorized }
    }

    await model.delete({ where: { id } })
    revalidatePath(routePath)
  } catch (error) {
    console.error(error)
    return { error: `Erro no sistema ao remover um ${singular}. Entre em contato com nosso time.` }
  }
}