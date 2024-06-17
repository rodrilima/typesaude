import { Appointment as Model } from "@prisma/client";
import { CommonModelProperties } from "./_general";

export type CreateAppointment = Omit<Model, CommonModelProperties>
export type UpdateAppointment = Partial<Omit<Model, CommonModelProperties>> & { id: Model['id'] }

export type ListReturn = { data: Model[] }

export type AppointmentWithServiceDuration = Model & { service: { duration: number } }
export type FindAllAppointmentsInDayReturn = { data: AppointmentWithServiceDuration[] }