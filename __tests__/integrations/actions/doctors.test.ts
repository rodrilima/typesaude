import { create, find, remove, update } from "@/actions/doctors";
import { ROLES } from "@/enums/roles";
import { prisma } from "@/lib/prisma"
import {
  CreateDoctor as CreateResource,
  UpdateDoctor as UpdateResource,
} from "@/types/actions/doctors";
import { Doctor as Model } from "@prisma/client"
import { Session } from "next-auth";

const model = prisma.doctor

vi.mock("next-auth", () => ({
  getServerSession: () => {
    const session: Session = {
      expires: "",
      user: { role: ROLES.EDITOR }
    }
    return session
  }
}))

describe('Integration: Doctors', () => {
  let defaultResource: Model

  beforeEach(async () => {
    defaultResource = await model.create({
      data: {
        email: "contato@contato.com.br",
        name: "contato",
      }
    })
  })

  test('deve ser possível criar um médico', async () => {
    const dataToCreate: CreateResource = {
      cpf: null,
      crm: null,
      email: "contato2@contato.com.br",
      name: "contato2",
      phone: null
    }

    const response = await create(dataToCreate)

    if ("error" in response) throw Error(response.error)

    expect(response.data.id).toBeTruthy()
  })

  test('deve ser possível listar médicos', async () => {
    const response = await find()

    if ("error" in response) throw Error(response.error)

    expect(response.data.length).greaterThan(0)
  })

  test('deve ser possível atualizar um médico', async () => {
    const dataToUpdate: UpdateResource = {
      id: defaultResource.id,
      name: "Teste"
    }

    const response = await update(dataToUpdate)

    if ("error" in response) throw Error(response.error)

    expect(response.data.name).toBe("Teste")
  })

  test('deve ser possível remover um médico', async () => {
    await remove(defaultResource.id)

    const removedResource = await model.findUnique({
      where: {
        id: defaultResource.id
      }
    })

    expect(removedResource).toBeNull()
  })
})