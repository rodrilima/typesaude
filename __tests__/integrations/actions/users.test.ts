import { create, find, remove, update } from "@/actions/users";
import { ROLES } from "@/enums/roles";
import { prisma } from "@/lib/prisma"
import {
  CreateUser as CreateResource,
  UpdateUser as UpdateResource,
} from "@/types/actions/users";
import { User } from "@prisma/client"

const model = prisma.user

describe('Integration: Users', () => {
  let defaultResource: User

  beforeEach(async () => {
    defaultResource = await model.create({
      data: {
        email: "test@teste.com",
        password: "test"
      }
    })
  })

  test('deve ser possível criar um usuário', async () => {
    const dataToCreate: CreateResource = {
      email: "contato@type.dev.br",
      password: "typedev",
      name: "Admin Typedev",
      role: ROLES.ADMIN
    }

    const response = await create(dataToCreate)

    if ("error" in response) throw Error(response.error)

    expect(response.data.id).toBeTruthy()
  })

  test('deve ser possível listar usuários', async () => {
    const response = await find()

    if ("error" in response) throw Error(response.error)

    expect(response.data.length).greaterThan(0)
  })

  test('deve ser possível atualizar um usuário', async () => {
    const dataToUpdate: UpdateResource = {
      id: defaultResource.id,
      name: "Teste"
    }

    const response = await update(dataToUpdate)

    if ("error" in response) throw Error(response.error)

    expect(response.data.name).toBe("Teste")
  })

  test('deve ser possível remover um usuário', async () => {
    await remove(defaultResource.id)

    const removedResource = await model.findUnique({
      where: {
        id: defaultResource.id
      }
    })

    expect(removedResource).toBeNull()
  })
})