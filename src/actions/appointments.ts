"use server"

import { ErrorsMessages } from "@/config/messages";
import { APPOINTMENT_STATUS } from "@/enums/appointment-status";
import { ROLES } from "@/enums/roles";
import { prisma } from "@/lib/prisma";
import { DefaultReturn, ErrorReturn } from "@/types/actions/_general";
import {
  CreateAppointment as CreateResource,
  UpdateAppointment as UpdateResource,
  ListReturn,
  FindAllAppointmentsInDayReturn,
} from "@/types/actions/appointments";
import { createAppointmentValidation, findAllAppointmentsInDayValidation, isTimeAvailableValidation, updateAppointmentValidation } from "@/validations/appointments.validation";
import { Appointment as Model } from "@prisma/client";
import { isWithinInterval, addMinutes } from "date-fns"
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import { revalidatePath } from "next/cache";

const model = prisma.appointment
const singular = 'agendamento'
const plural = 'agendamentos'
const routePath = '/agendamentos'

export async function create(data: CreateResource): Promise<DefaultReturn<Model> | ErrorReturn> {
  try {
    const session = await getServerSession(authOptions)

    if (session?.user.role === ROLES.VIEWER) {
      return { error: ErrorsMessages.not_authorized }
    }

    const validation = createAppointmentValidation.safeParse(data)

    if (validation.error) {
      return { error: validation.error.issues[0].message }
    }

    const service = await prisma.service.findUnique({
      where: {
        id: data.serviceId
      },
      select: {
        duration: true
      }
    })

    if (!service) {
      return { error: "Serviço não foi encontrado" }
    }

    const isTimeAvailableResponse = await isTimeAvailable(
      data.dateTime,
      service.duration,
      data.doctorId,
    )

    if ("error" in isTimeAvailableResponse) return { error: "Erro ao verficiar disponibilidade do horário. Entre em contato com nosso time." }
    if (!isTimeAvailableResponse.data) return { error: "O horário não esta disponível. Tente outro." }

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

    const validation = updateAppointmentValidation.safeParse(data)

    if (validation.error) {
      return { error: validation.error.issues[0].message }
    }

    const { id, ...dataToUpdate } = data

    if (dataToUpdate.dateTime) {
      const appointment = await model.findUnique({
        where: {
          id
        },
        select: {
          doctorId: true,
          serviceId: true
        }
      })

      if (!appointment) {
        return { error: "Agendamento não foi encontrado" }
      }


      const service = await prisma.service.findUnique({
        where: {
          id: dataToUpdate.serviceId ?? appointment.serviceId
        },
        select: {
          duration: true
        }
      })

      if (!service) {
        return { error: "Serviço não foi encontrado" }
      }

      const isTimeAvailableResponse = await isTimeAvailable(
        dataToUpdate.dateTime,
        service.duration,
        appointment.doctorId,
      )

      if ("error" in isTimeAvailableResponse) return { error: "Erro ao verficiar disponibilidade do horário. Entre em contato com nosso time." }
      if (!isTimeAvailableResponse.data) return { error: "O horário não esta disponível. Tente outro." }
    }

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

export async function findAllAppointmentsInDay(
  datetime: Date,
  doctorId?: number,
  status?: APPOINTMENT_STATUS
): Promise<FindAllAppointmentsInDayReturn | ErrorReturn> {
  try {
    const validation = findAllAppointmentsInDayValidation.safeParse({
      datetime,
      doctorId,
      status
    })

    if (validation.error) {
      return { error: validation.error.issues[0].message }
    }

    const startDateReference = new Date(datetime)
    startDateReference.setUTCHours(3, 0, 0)

    const endDateReference = new Date(datetime)
    endDateReference.setUTCHours(26, 59, 59)

    const response = await model.findMany({
      where: {
        doctorId,
        status: status,
        dateTime: {
          gte: startDateReference,
          lte: endDateReference
        }
      },
      include: {
        service: {
          select: {
            duration: true
          }
        }
      }
    })

    return { data: response }
  } catch (error) {
    return { error: `Erro no sistema ao listar ${plural}. Entre em contato com nosso time.` }
  }
}

export async function isTimeAvailable(
  datetime: Date,
  duration: number,
  doctorId: number,
  appointmentId?: number,
): Promise<{ data: boolean } | ErrorReturn> {
  try {
    const validation = isTimeAvailableValidation.safeParse({
      datetime,
      duration,
      doctorId,
      appointmentId
    })

    if (validation.error) {
      return { error: validation.error.issues[0].message }
    }

    const allAppointmentsInDayResponse = await findAllAppointmentsInDay(
      datetime,
      doctorId,
      APPOINTMENT_STATUS.SCHEDULED
    )

    if ("error" in allAppointmentsInDayResponse) return { error: "Erro ao verificar agendamento no dia fornecido" }

    const allAppointmentsWithouOwnId = allAppointmentsInDayResponse.data.filter(ap => ap.id !== appointmentId)

    const hasConflict = allAppointmentsWithouOwnId.some(appointment => {
      return isWithinInterval(addMinutes(appointment.dateTime, appointment.service.duration - 1), { start: datetime, end: addMinutes(datetime, duration) })
        || isWithinInterval(appointment.dateTime, { start: datetime, end: addMinutes(datetime, duration - 1) })
    })

    return { data: !hasConflict }

  } catch (error) {
    return { error: "Erro ao verificar agendamento no dia fornecido. Entre em contato com nosso time." }
  }
}