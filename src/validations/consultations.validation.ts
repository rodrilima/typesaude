import { z } from "zod"

export const createConsultationValidation = z.object({
  initialDateTime: z.date({ required_error: "Data e hora inicial são obrigatórias." }),
  finalDateTime: z.date().optional(),
  description: z.string().optional(),
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
  appointmentId: z.number().optional().nullable(),
});

export const updateConsultationValidation = z.object({
  id: z
    .number({ required_error: "Nenhum ID foi fornecido." })
    .int("ID deve ser um número inteiro.")
    .positive("ID não pode ser um número negativo."),
  initialDateTime: z.date().optional(),
  finalDateTime: z.date().optional().nullable(),
  description: z.string().optional().nullable(),
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
  appointmentId: z.number().optional().nullable(),
});