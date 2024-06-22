"use server"

import { ErrorsMessages } from "@/config/messages";
import { ROLES } from "@/enums/roles";
import { prisma } from "@/lib/prisma";
import { DefaultReturn, ErrorReturn } from "@/types/actions/_general";
import {
  CreatePatient as CreateResource,
  UpdatePatient as UpdateResource,
  ListReturn,
} from "@/types/actions/patients";
import { createPatientValidation, updatePatientValidation } from "@/validations/patients.validation";
import { Patient as Model } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import { revalidatePath } from "next/cache";

const model = prisma.patient
const singular = 'paciente'
const plural = 'pacientes'
const routePath = '/pacientes'

export async function create(data: CreateResource): Promise<DefaultReturn<Model> | ErrorReturn> {
  try {
    const session = await getServerSession(authOptions)

    if (session?.user.role === ROLES.VIEWER) {
      return { error: ErrorsMessages.not_authorized }
    }

    const validation = createPatientValidation.safeParse(data)

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
    const response = await model.findMany()
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

    const validation = updatePatientValidation.safeParse(data)

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