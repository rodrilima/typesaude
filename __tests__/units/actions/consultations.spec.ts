import { create, remove, update } from "@/actions/consultations"
import { ErrorsMessages } from "@/config/messages"
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

describe("Unit: Consultas", () => {
  test("não deve ser possível criar um recurso sendo um VIEWER", async () => {
    const response = await create({
      doctorId: 1,
      patientId: 1,
      serviceId: 1,
      appointmentId: 1,
      description: "",
      finalDateTime: new Date(),
      initialDateTime: new Date()
    })

    if ("data" in response) throw new Error("Deveria retornar um erro")

    expect(response.error).toBe(ErrorsMessages.not_authorized)
  })

  test("não deve ser possível atualizar um recurso sendo um VIEWER", async () => {
    const response = await update({
      id: 1,
      description: "Teste",
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

    // @ts-ignore
    const response = await create({
      patientId: 1,
      serviceId: 1,
      appointmentId: 1,
      description: "",
      finalDateTime: new Date(),
      initialDateTime: new Date()
    })

    if ("data" in response) throw new Error("Deveria retornar um erro")

    expect(response.error).toBe("Médico é obrigatório.")
  })

  test("não deve ser possível atualizar um recurso com dados inválidos", async () => {
    authRole = ROLES.ADMIN

    const response = await update({
      id: 1,
      // @ts-ignore
      doctorId: -1
    })

    if ("data" in response) throw new Error("Deveria retornar um erro")

    expect(response.error).toBe("ID do médico não pode ser um número negativo.")
  })
})