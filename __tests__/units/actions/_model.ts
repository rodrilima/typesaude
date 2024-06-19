import { create, remove, update } from "@/actions/users"
import { ErrorsMessages } from "@/config/messages"
import { ROLES } from "@/enums/roles"
import { Session } from "next-auth"

let authRole = ROLES.VIEWER;

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

describe("Unit: Users", () => {
  test("não deve ser possível criar um recurso sendo um VIEWER", async () => {
    const response = await create({
      email: "teste@teste.com",
      password: "teste",
      name: "Teste",
      role: ROLES.VIEWER
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
      email: "teste",
      name: "Teste",
      password: "123456",
      role: ROLES.EDITOR
    })

    if ("data" in response) throw new Error("Deveria retornar um erro")

    expect(response.error).toBe("Email inválido.")
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