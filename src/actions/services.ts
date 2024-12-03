"use server"

import { ErrorsMessages } from "@/config/messages";
import { ROLES } from "@/enums/roles";
import { prisma } from "@/lib/prisma";
import { DefaultReturn, ErrorReturn } from "@/types/actions/_general";
import {
  CreateService as CreateResource,
  UpdateService as UpdateResource,
  ListReturn,
} from "@/types/actions/services";
import { createServiceValidation, updateServiceValidation } from "@/validations/services.validation";
import { Service as Model } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import { revalidatePath } from "next/cache";
import { TSelectOption } from "@/types/form";

const model = prisma.service
const singular = 'serviço'
const plural = 'serviços'
const routePath = '/servicos'

export async function create(data: CreateResource): Promise<DefaultReturn<Model> | ErrorReturn> {
  try {
    const session = await getServerSession(authOptions)

    if (session?.user.role === ROLES.VIEWER) {
      return { error: ErrorsMessages.not_authorized }
    }

    const validation = createServiceValidation.safeParse(data)

    if (validation.error) {
      return { error: validation.error.issues[0].message }
    }

    const response = await model.create({ data })
    revalidatePath(routePath)
    return { data: response }
  } catch (error) {
    console.error(error)
    return { error: `Erro no sistema ao criar um ${singular}. Entre em contato com nosso time.` }
  }
}

export async function find(): Promise<ListReturn | ErrorReturn> {
  try {
    const response = await model.findMany({
      orderBy: { 
        id: 'desc' 
      }
    })
    return { data: response }
  } catch (error) {
    console.error(error)
    return { error: `Erro no sistema ao listar ${plural}. Entre em contato com nosso time.` }
  }
}

export async function update(data: UpdateResource): Promise<DefaultReturn<Model> | ErrorReturn> {
  try {
    const session = await getServerSession(authOptions)

    if (session?.user.role === ROLES.VIEWER) {
      return { error: ErrorsMessages.not_authorized }
    }

    const validation = updateServiceValidation.safeParse(data)

    if (validation.error) {
      return { error: validation.error.issues[0].message }
    }

    const { id, ...dataToUpdate } = data

    const response = await model.update({ where: { id }, data: dataToUpdate })
    revalidatePath(routePath)
    return { data: response }
  } catch (error) {
    console.error(error)
    return { error: `Erro no sistema ao atualizar um ${singular}. Entre em contato com nosso time.` }
  }
}

export async function remove(id: Model['id']): Promise<void | ErrorReturn> {
  try {
    const session = await getServerSession(authOptions)

    if (session?.user.role === ROLES.VIEWER) {
      return { error: ErrorsMessages.not_authorized }
    }

    await model.delete({ where: { id } })
    revalidatePath(routePath)
  } catch (error) {
    console.error(error)
    return { error: `Erro no sistema ao remover um ${singular}. Entre em contato com nosso time.` }
  }
}

export async function getServicesSelectOptions(): Promise<DefaultReturn<TSelectOption[]> | ErrorReturn> {
  try {
    const services = await prisma.service.findMany({
      select: {
        id: true,
        name: true
      },
      orderBy: {
        name: 'asc'
      }
    })

    const options: TSelectOption[] = services.map(service => ({
      label: service.name ?? "",
      value: service.id.toString()
    }))

    return { data: options }
  } catch(error) {
    console.error(error)
    return { error: `Erro no sistema ao listar ${plural} para o select. Entre em contato com nosso time.` }
  }
}