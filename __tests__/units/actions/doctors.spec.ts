import { create, remove, update } from "@/actions/doctors"
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

describe("Unit: Médicos", () => {
  test("não deve ser possível criar um recurso sendo um VIEWER", async () => {
    const response = await create({
      cpf: "",
      crm: "",
      email: "contato@contato.com.br",
      name: "contato",
      phone: ""
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
      cpf: "",
      crm: "",
      email: "contato@contato.com.br",
      name: "",
      phone: ""
    })

    if ("data" in response) throw new Error("Deveria retornar um erro")

    expect(response.error).toBe("Nome não pode ser em branco.")
  })

  test("não deve ser possível atualizar um recurso com dados inválidos", async () => {
    authRole = ROLES.ADMIN

    const response = await update({
      id: 1,
      email: "teste",
    })

    if ("data" in response) throw new Error("Deveria retornar um erro")

    expect(response.error).toBe("Email inválido.")
  })
})