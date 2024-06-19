import { ErrorsMessages } from "@/config/messages";
import { ROLES } from "@/enums/roles";
import { prisma } from "@/lib/prisma";
import { DefaultReturn, ErrorReturn } from "@/types/actions/_general";
import {
  CreateConsultation as CreateResource,
  UpdateConsultation as UpdateResource,
  ListReturn,
} from "@/types/actions/consultations";
import { createConsultationValidation, updateConsultationValidation } from "@/validations/consultations.validation";
import { Consultation as Model } from "@prisma/client";
import { getServerSession } from "next-auth";

const model = prisma.consultation
const singular = 'consulta'
const plural = 'consultas'

export async function create(data: CreateResource): Promise<DefaultReturn<Model> | ErrorReturn> {
  try {
    const session = await getServerSession()

    if (session?.user.role === ROLES.VIEWER) {
      return { error: ErrorsMessages.not_authorized }
    }

    const validation = createConsultationValidation.safeParse(data)

    if (validation.error) {
      return { error: validation.error.issues[0].message }
    }

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
    const session = await getServerSession()

    if (session?.user.role === ROLES.VIEWER) {
      return { error: ErrorsMessages.not_authorized }
    }

    const validation = updateConsultationValidation.safeParse(data)

    if (validation.error) {
      return { error: validation.error.issues[0].message }
    }

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
    const session = await getServerSession()

    if (session?.user.role === ROLES.VIEWER) {
      return { error: ErrorsMessages.not_authorized }
    }

    await model.delete({ where: { id } })
  } catch (error) {
    console.error(error)
    return { error: `Erro no sistema ao remover um ${singular}. Entre em contato com nosso time.` }
  }
}