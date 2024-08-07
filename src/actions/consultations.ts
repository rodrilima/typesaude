"use server"

import { ErrorsMessages } from "@/config/messages";
import { APPOINTMENT_STATUS } from "@/enums/appointment-status";
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
import { authOptions } from "@/config/authOptions";
import { revalidatePath } from "next/cache";

const model = prisma.consultation
const singular = 'consulta'
const plural = 'consultas'
const routePath = '/consultas'

export async function create(data: CreateResource): Promise<DefaultReturn<Model> | ErrorReturn> {
  try {
    const session = await getServerSession(authOptions)

    if (session?.user.role === ROLES.VIEWER) {
      return { error: ErrorsMessages.not_authorized }
    }

    const validation = createConsultationValidation.safeParse(data)

    if (validation.error) {
      return { error: validation.error.issues[0].message }
    }

    const response = await model.create({ data })
    revalidatePath(routePath)

    try {
      if (data.appointmentId) {
        await prisma.appointment.update({
          where: { id: data.appointmentId },
          data: { status: APPOINTMENT_STATUS.COMPLETED }
        })
      }
    } catch (error) {
      console.error(error)
    }

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

    const validation = updateConsultationValidation.safeParse(data)

    if (validation.error) {
      return { error: validation.error.issues[0].message }
    }

    const { id, ...dataToUpdate } = data

    const response = await model.update({ where: { id }, data: dataToUpdate })
    revalidatePath(routePath)

    try {
      if (data.appointmentId) {
        await prisma.appointment.update({
          where: { id: data.appointmentId },
          data: { status: APPOINTMENT_STATUS.COMPLETED }
        })
      }
    } catch (error) {
      console.error(error)
    }

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