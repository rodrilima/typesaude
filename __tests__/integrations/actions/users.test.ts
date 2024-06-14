import { create, find, remove, update } from "@/actions/users";
import { ROLES } from "@/enums/roles";
import { prisma } from "@/lib/prisma"
import {
  CreateUser as CreateResource,
  UpdateUser as UpdateResource,
} from "@/types/actions/users";
import { User as Model } from "@prisma/client"
import { Session } from "next-auth";

const model = prisma.user

vi.mock("next-auth", () => ({
  getServerSession: () => {
    const session: Session = {
      expires: "",
      user: { role: ROLES.ADMIN }
    }
    return session
  }
}))

describe('Integration: Users', () => {
  let defaultResource: Model

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

  test('deve criptografar senha ao criar um usuário', async () => {
    const dataToCreate: CreateResource = {
      email: "contato@type.dev.br",
      password: "typedev",
      name: "Admin Typedev",
      role: ROLES.ADMIN
    }

    const response = await create(dataToCreate)

    if ("error" in response) throw Error(response.error)

    const createdUser = await model.findUnique({
      where: {
        id: response.data.id
      }
    })

    expect(createdUser?.password).toBeTruthy()
    expect(createdUser?.password).not.toBe(dataToCreate.password)
  })

  test('deve criptografar ao atualizar a senha de um usuário', async () => {
    const dataToUpdate: UpdateResource = {
      id: defaultResource.id,
      password: "typedev",
    }

    const response = await update(dataToUpdate)

    if ("error" in response) throw Error(response.error)

    const updatedUser = await model.findUnique({
      where: {
        id: response.data.id
      }
    })

    expect(updatedUser?.password).toBeTruthy()
    expect(updatedUser?.password).not.toBe(dataToUpdate.password)
    expect(updatedUser?.password).not.toBe(defaultResource.password)
  })

  test('não deve ser possível criar um usuário com email que já existe', async () => {
    const dataToCreate: CreateResource = {
      email: "test@teste.com",
      password: "typedev",
      name: "Admin Typedev",
      role: ROLES.ADMIN
    }

    const response = await create(dataToCreate)

    if ("data" in response) throw Error("Deveria dar erro")

    expect(response.error).toBe("Já existe um usuário com este email")
  })

  test('não deve ser possível atualizar o email para um já cadastrado', async () => {
    const secondUser = await model.create({
      data: {
        email: "test2@teste.com",
        password: "test"
      }
    })

    const dataToUpdate: UpdateResource = {
      id: secondUser.id,
      email: "test@teste.com"
    }

    const response = await update(dataToUpdate)

    if ("data" in response) throw Error("Deveria dar erro")

    expect(response.error).toBe("Já existe um usuário com este email")
  })

  test('não deve retornar a propriedade password ao criar um usuário', async () => {
    const dataToCreate: CreateResource = {
      email: "contato@type.dev.br",
      password: "typedev",
      name: "Admin Typedev",
      role: ROLES.ADMIN
    }

    const response = await create(dataToCreate)

    if ("error" in response) throw Error(response.error)

    expect(response.data).not.toHaveProperty('password')
  })

  test('não deve retornar a propriedade password ao listar usuários', async () => {
    const response = await find()

    if ("error" in response) throw Error(response.error)

    expect(response.data[0]).not.toHaveProperty('password')
  })

  test('não deve retornar a propriedade password ao atualizar a senha de um usuário', async () => {
    const dataToUpdate: UpdateResource = {
      id: defaultResource.id,
      password: "123456"
    }

    const response = await update(dataToUpdate)

    if ("error" in response) throw Error(response.error)

    expect(response.data).not.toHaveProperty('password')
  })
})