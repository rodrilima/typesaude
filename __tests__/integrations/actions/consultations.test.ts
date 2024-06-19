import { create, find, remove, update } from "@/actions/consultations";
import { APPOINTMENT_STATUS } from "@/enums/appointment-status";
import { ROLES } from "@/enums/roles";
import { prisma } from "@/lib/prisma"
import {
  CreateConsultation as CreateResource,
  UpdateConsultation as UpdateResource,
} from "@/types/actions/consultations";
import { Consultation as Model } from "@prisma/client"
import { Session } from "next-auth";

const model = prisma.consultation

vi.mock("next-auth", () => ({
  getServerSession: () => {
    const session: Session = {
      expires: "",
      user: { role: ROLES.EDITOR }
    }
    return session
  }
}))

describe('Integration: Consultations', () => {
  let defaultResource: Model

  beforeEach(async () => {
    const doctor = await prisma.doctor.create({ data: {} })
    const patient = await prisma.patient.create({ data: {} })
    const service = await prisma.service.create({
      data: {
        duration: 15
      }
    })

    defaultResource = await model.create({
      data: {
        doctorId: doctor.id,
        patientId: patient.id,
        serviceId: service.id,
        description: "",
        finalDateTime: new Date(),
        initialDateTime: new Date()
      }
    })
  })

  test('deve ser possível criar um consulta', async () => {
    const dataToCreate: CreateResource = {
      doctorId: defaultResource.doctorId,
      patientId: defaultResource.patientId,
      serviceId: defaultResource.serviceId,
      appointmentId: null,
      description: "",
      finalDateTime: new Date(),
      initialDateTime: new Date()
    }

    const response = await create(dataToCreate)

    if ("error" in response) throw Error(response.error)

    expect(response.data.id).toBeTruthy()
  })

  test('deve ser possível listar consultas', async () => {
    const response = await find()

    if ("error" in response) throw Error(response.error)

    expect(response.data.length).greaterThan(0)
  })

  test('deve ser possível atualizar um consulta', async () => {
    const dataToUpdate: UpdateResource = {
      id: defaultResource.id,
      description: "Teste"
    }

    const response = await update(dataToUpdate)

    if ("error" in response) throw Error(response.error)

    expect(response.data.description).toBe("Teste")
  })

  test('deve ser possível remover um consulta', async () => {
    await remove(defaultResource.id)

    const removedResource = await model.findUnique({
      where: {
        id: defaultResource.id
      }
    })

    expect(removedResource).toBeNull()
  })

  test('deve alterar o status do agendamento para COMPLETED ao criar uma consulta', async () => {
    const appointment = await prisma.appointment.create({
      data: {
        dateTime: new Date("2025-06-02T14:00"),
        doctorId: defaultResource.doctorId,
        patientId: defaultResource.patientId,
        serviceId: defaultResource.serviceId,
        status: APPOINTMENT_STATUS.SCHEDULED
      }
    })

    const dataToCreate: CreateResource = {
      doctorId: defaultResource.doctorId,
      patientId: defaultResource.patientId,
      serviceId: defaultResource.serviceId,
      appointmentId: appointment.id,
      description: "",
      finalDateTime: null,
      initialDateTime: new Date("2025-06-02T14:00"),
    }

    await create(dataToCreate)

    const updatedAppointment = await prisma.appointment.findUnique({
      where: {
        id: appointment.id
      }
    })

    expect(updatedAppointment?.status).toBe(APPOINTMENT_STATUS.COMPLETED)
  })

  test('deve alterar o status do agendamento para COMPLETED ao atualizar o ID de agendamento de uma consulta', async () => {
    const appointment = await prisma.appointment.create({
      data: {
        dateTime: new Date("2025-06-02T14:00"),
        doctorId: defaultResource.doctorId,
        patientId: defaultResource.patientId,
        serviceId: defaultResource.serviceId,
        status: APPOINTMENT_STATUS.SCHEDULED
      }
    })

    const newConsultation = await prisma.consultation.create({
      data: {
        doctorId: defaultResource.doctorId,
        patientId: defaultResource.patientId,
        serviceId: defaultResource.serviceId,
        description: "",
        finalDateTime: null,
        initialDateTime: new Date("2025-06-02T14:00"),
      }
    })

    const dataToUpdate: UpdateResource = {
      id: newConsultation.id,
      appointmentId: appointment.id
    }

    await update(dataToUpdate)

    const updatedAppointment = await prisma.appointment.findUnique({
      where: {
        id: appointment.id
      }
    })

    expect(updatedAppointment?.status).toBe(APPOINTMENT_STATUS.COMPLETED)
  })
})