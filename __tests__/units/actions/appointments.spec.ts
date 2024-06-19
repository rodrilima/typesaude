import { create, findAllAppointmentsInDay, isTimeAvailable, remove, update } from "@/actions/appointments"
import { ErrorsMessages } from "@/config/messages"
import { APPOINTMENT_STATUS } from "@/enums/appointment-status"
import { ROLES } from "@/enums/roles"
import { Session } from "next-auth"

let authRole = ROLES.VIEWER

vi.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      create: () => { },
      findMany: () => { },
      update: () => { },
      delete: () => { },
    }
  }
}))

vi.mock("next-auth", () => ({
  getServerSession: () => {
    const session: Session = {
      expires: "",
      user: { role: authRole }
    }
    return session
  }
}))

describe("Unit: Agendamentos", () => {
  test("não deve ser possível criar um recurso sendo um VIEWER", async () => {
    const response = await create({
      doctorId: 1,
      patientId: 1,
      serviceId: 1,
      dateTime: new Date(),
      status: APPOINTMENT_STATUS.COMPLETED
    })

    if ("data" in response) throw new Error("Deveria retornar um erro")

    expect(response.error).toBe(ErrorsMessages.not_authorized)
  })

  test("não deve ser possível atualizar um recurso sendo um VIEWER", async () => {
    const response = await update({
      id: 1,
      status: APPOINTMENT_STATUS.COMPLETED
    })

    if ("data" in response) throw new Error("Deveria retornar um erro")

    expect(response.error).toBe(ErrorsMessages.not_authorized)
  })

  test("não deve ser possível remover um recurso sendo um VIEWER", async () => {
    const response = await remove(1)

    expect(response?.error).toBe(ErrorsMessages.not_authorized)
  })

  test("não deve ser possível criar um recurso com dados inválidos", async () => {
    authRole = ROLES.ADMIN

    const response = await create({
      doctorId: 1,
      patientId: 1,
      serviceId: 1,
      dateTime: new Date(),
      status: "outro"
    })

    if ("data" in response) throw new Error("Deveria retornar um erro")

    expect(response.error).toBe("Opção inválida para status.")
  })

  test("não deve ser possível atualizar um recurso com dados inválidos", async () => {
    authRole = ROLES.ADMIN

    const response = await update({
      id: 1,
      status: "outro"
    })

    if ("data" in response) throw new Error("Deveria retornar um erro")

    expect(response.error).toBe("Opção inválida para status.")
  })

  test("não deve ser possível chamar findAllAppointmentsInDayValidation com dados inválidos", async () => {
    const response = await findAllAppointmentsInDay(
      new Date(),
      1,
      // @ts-ignore
      "teste"
    )

    if ("data" in response) throw new Error("Deveria retornar um erro")

    expect(response.error).toBe("Opção inválida para status.")
  })

  test("não deve ser possível chamar isTimeAvailableValidation com dados inválidos", async () => {
    // @ts-ignore
    const response = await isTimeAvailable(
      new Date(),
      1,
    )

    if ("data" in response) throw new Error("Deveria retornar um erro")

    expect(response.error).toBe("Médico é obrigatório.")
  })
})