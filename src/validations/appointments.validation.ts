import { APPOINTMENT_STATUS } from "@/enums/appointment-status";
import { z } from "zod"

export const createAppointmentValidation = z.object({
  dateTime: z.date({ required_error: "Data e hora são obrigatórias." }),
  status: z
    .nativeEnum(APPOINTMENT_STATUS, { message: "Opção inválida para status." })
    .optional(),
  doctorId: z
    .number({ required_error: "Médico é obrigatório." })
    .int("ID do médico deve ser um número inteiro.")
    .positive("ID do médico não pode ser um número negativo."),
  patientId: z
    .number({ required_error: "Paciente é obrigatório." })
    .int("ID do paciente deve ser um número inteiro.")
    .positive("ID do paciente não pode ser um número negativo."),
  serviceId: z
    .number({ required_error: "Serviço é obrigatório." })
    .int("ID do serviço deve ser um número inteiro.")
    .positive("ID do serviço não pode ser um número negativo."),
});

export const updateAppointmentValidation = z.object({
  id: z
    .number({ required_error: "Nenhum ID foi fornecido." })
    .int("ID deve ser um número inteiro.")
    .positive("ID não pode ser um número negativo."),
  dateTime: z.date().optional(),
  status: z
    .nativeEnum(APPOINTMENT_STATUS, { message: "Opção inválida para status." })
    .optional(),
  doctorId: z
    .number()
    .int("ID do médico deve ser um número inteiro.")
    .positive("ID do médico não pode ser um número negativo.")
    .optional(),
  patientId: z
    .number()
    .int("ID do paciente deve ser um número inteiro.")
    .positive("ID do paciente não pode ser um número negativo.")
    .optional(),
  serviceId: z
    .number()
    .int("ID do serviço deve ser um número inteiro.")
    .positive("ID do serviço não pode ser um número negativo.")
    .optional(),
});

export const findAllAppointmentsInDayValidation = z.object({
  datetime: z.date({ required_error: "Data e hora são obrigatórias." }),
  doctorId: z
    .number()
    .int("ID do médico deve ser um número inteiro.")
    .positive("ID do médico não pode ser um número negativo.")
    .optional(),
  status: z
    .nativeEnum(APPOINTMENT_STATUS, { message: "Opção inválida para status." })
    .optional(),
})

export const isTimeAvailableValidation = z.object({
  datetime: z.date({ required_error: "Data e hora são obrigatórias." }),
  duration: z.number({ required_error: "Duração é obrigatória." }),
  doctorId: z
    .number({ required_error: "Médico é obrigatório." })
    .int("ID do médico deve ser um número inteiro.")
    .positive("ID do médico não pode ser um número negativo."),
  appointmentId: z
    .number()
    .int("ID do agendamento deve ser um número inteiro.")
    .positive("ID do agendamento não pode ser um número negativo.")
    .optional(),
})