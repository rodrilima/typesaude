import { create, remove, update } from "@/actions/services"
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

describe("Unit: Serviços", () => {
  test("não deve ser possível criar um recurso sendo um VIEWER", async () => {
    const response = await create({
      description: "",
      duration: 15,
      name: "",
      price: 150
    })

    if ("data" in response) throw new Error("Deveria retornar um erro")

    expect(response.error).toBe(ErrorsMessages.not_authorized)
  })

  test("não deve ser possível atualizar um recurso sendo um VIEWER", async () => {
    const response = await update({
      id: 1,
      name: "Teste",
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
      description: "",
      duration: 15.15,
      name: "teste",
      price: 150
    })

    if ("data" in response) throw new Error("Deveria retornar um erro")

    expect(response.error).toBe("Duração deve ser um número inteiro.")
  })

  test("não deve ser possível atualizar um recurso com dados inválidos", async () => {
    authRole = ROLES.ADMIN

    const response = await update({
      id: 1,
      duration: 15.15,
    })

    if ("data" in response) throw new Error("Deveria retornar um erro")

    expect(response.error).toBe("Duração deve ser um número inteiro.")
  })
})