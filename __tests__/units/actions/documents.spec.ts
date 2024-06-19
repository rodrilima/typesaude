import { create, remove, update } from "@/actions/documents"
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

describe("Unit: Documentos", () => {
  test("não deve ser possível criar um recurso sendo um VIEWER", async () => {
    const formData = new FormData()
    const response = await create(formData)

    if ("data" in response) throw new Error("Deveria retornar um erro")

    expect(response.error).toBe(ErrorsMessages.not_authorized)
  })

  test("não deve ser possível atualizar um recurso sendo um VIEWER", async () => {
    const formData = new FormData()
    const response = await update(formData)

    if ("data" in response) throw new Error("Deveria retornar um erro")

    expect(response.error).toBe(ErrorsMessages.not_authorized)
  })

  test("não deve ser possível remover um recurso sendo um VIEWER", async () => {
    const response = await remove(1)

    expect(response?.error).toBe(ErrorsMessages.not_authorized)
  })

  test("não deve ser possível criar um recurso com dados inválidos", async () => {
    authRole = ROLES.ADMIN

    const formData = new FormData()

    const response = await create(formData)

    if ("data" in response) throw new Error("Deveria retornar um erro")

    expect(response.error).toBe("Arquivo inválido")
  })

  test("não deve ser possível atualizar um recurso com dados inválidos", async () => {
    authRole = ROLES.ADMIN

    const formData = new FormData()

    const response = await update(formData)

    if ("data" in response) throw new Error("Deveria retornar um erro")

    expect(response.error).toBe("Nenhum ID foi fornecido.")
  })
})