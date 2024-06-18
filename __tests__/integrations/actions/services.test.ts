import { create, find, remove, update } from "@/actions/services";
import { ROLES } from "@/enums/roles";
import { prisma } from "@/lib/prisma"
import {
  CreateService as CreateResource,
  UpdateService as UpdateResource,
} from "@/types/actions/services";
import { Service as Model } from "@prisma/client"
import { Session } from "next-auth";

const model = prisma.service

vi.mock("next-auth", () => ({
  getServerSession: () => {
    const session: Session = {
      expires: "",
      user: { role: ROLES.EDITOR }
    }
    return session
  }
}))

describe('Integration: Services', () => {
  let defaultResource: Model

  beforeEach(async () => {
    defaultResource = await model.create({
      data: {
        description: "consulta comum",
        duration: 15,
        name: "Consulta",
        price: 150
      }
    })
  })

  test('deve ser possível criar um serviço', async () => {
    const dataToCreate: CreateResource = {
      description: "consulta premium",
      duration: 30,
      name: "Consulta Premium",
      price: 300
    }

    const response = await create(dataToCreate)

    if ("error" in response) throw Error(response.error)

    expect(response.data.id).toBeTruthy()
  })

  test('deve ser possível listar serviços', async () => {
    const response = await find()

    if ("error" in response) throw Error(response.error)

    expect(response.data.length).greaterThan(0)
  })

  test('deve ser possível atualizar um serviço', async () => {
    const dataToUpdate: UpdateResource = {
      id: defaultResource.id,
      name: "Teste"
    }

    const response = await update(dataToUpdate)

    if ("error" in response) throw Error(response.error)

    expect(response.data.name).toBe("Teste")
  })

  test('deve ser possível remover um serviço', async () => {
    await remove(defaultResource.id)

    const removedResource = await model.findUnique({
      where: {
        id: defaultResource.id
      }
    })

    expect(removedResource).toBeNull()
  })
})