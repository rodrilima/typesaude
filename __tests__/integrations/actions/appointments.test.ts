import { create, find, remove, update } from "@/actions/appointments";
import { APPOINTMENT_STATUS } from "@/enums/appointment-status";
import { ROLES } from "@/enums/roles";
import { prisma } from "@/lib/prisma"
import {
  CreateAppointment as CreateResource,
  UpdateAppointment as UpdateResource,
} from "@/types/actions/appointments";
import { Appointment as Model } from "@prisma/client"
import { Session } from "next-auth";

const model = prisma.appointment

vi.mock("next-auth", () => ({
  getServerSession: () => {
    const session: Session = {
      expires: "",
      user: { role: ROLES.EDITOR }
    }
    return session
  }
}))

describe('Integration: Agendamento', () => {
  let defaultResource: Model

  beforeEach(async () => {
    const doctor = await prisma.doctor.create({ data: {} })
    const service = await prisma.service.create({
      data: {
        duration: 15,
        name: "consulta"
      }
    })
    const patient = await prisma.patient.create({ data: {} })

    defaultResource = await model.create({
      data: {
        dateTime: new Date('2025-06-02T15:00'),
        doctorId: doctor.id,
        patientId: patient.id,
        serviceId: service.id,
        status: APPOINTMENT_STATUS.SCHEDULED
      }
    })
  })

  test('deve ser possível criar um agendamento', async () => {
    const dataToCreate: CreateResource = {
      dateTime: new Date('2025-06-03T15:00'),
      doctorId: defaultResource.doctorId,
      patientId: defaultResource.patientId,
      serviceId: defaultResource.serviceId,
      status: APPOINTMENT_STATUS.SCHEDULED
    }

    const response = await create(dataToCreate)

    if ("error" in response) throw Error(response.error)

    expect(response.data.id).toBeTruthy()
  })

  test('deve ser possível listar agendamentos', async () => {
    const response = await find()

    if ("error" in response) throw Error(response.error)

    expect(response.data.length).greaterThan(0)
  })

  test('deve ser possível atualizar um agendamento', async () => {
    const dataToUpdate: UpdateResource = {
      id: defaultResource.id,
      status: APPOINTMENT_STATUS.COMPLETED
    }

    const response = await update(dataToUpdate)

    if ("error" in response) throw Error(response.error)

    expect(response.data.status).toBe(APPOINTMENT_STATUS.COMPLETED)
  })

  test('deve ser possível remover um agendamento', async () => {
    await remove(defaultResource.id)

    const removedResource = await model.findUnique({
      where: {
        id: defaultResource.id
      }
    })

    expect(removedResource).toBeNull()
  })
})