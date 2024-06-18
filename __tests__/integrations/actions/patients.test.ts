import { create, find, remove, update } from "@/actions/patients";
import { ROLES } from "@/enums/roles";
import { prisma } from "@/lib/prisma"
import {
  CreatePatient as CreateResource,
  UpdatePatient as UpdateResource,
} from "@/types/actions/patients";
import { Patient as Model } from "@prisma/client"
import { Session } from "next-auth";

const model = prisma.patient

vi.mock("next-auth", () => ({
  getServerSession: () => {
    const session: Session = {
      expires: "",
      user: { role: ROLES.EDITOR }
    }
    return session
  }
}))

describe('Integration: Patients', () => {
  let defaultResource: Model

  beforeEach(async () => {
    defaultResource = await model.create({
      data: {
        birth: new Date(),
        email: "patient@gmail.com",
      }
    })
  })

  test('deve ser possível criar um paciente', async () => {
    const dataToCreate: CreateResource = {
      address: null,
      birth: new Date(),
      cpf: null,
      email: "patient2@gmail.com",
      name: null,
      phone: null
    }

    const response = await create(dataToCreate)

    if ("error" in response) throw Error(response.error)

    expect(response.data.id).toBeTruthy()
  })

  test('deve ser possível listar pacientes', async () => {
    const response = await find()

    if ("error" in response) throw Error(response.error)

    expect(response.data.length).greaterThan(0)
  })

  test('deve ser possível atualizar um paciente', async () => {
    const dataToUpdate: UpdateResource = {
      id: defaultResource.id,
      name: "Teste"
    }

    const response = await update(dataToUpdate)

    if ("error" in response) throw Error(response.error)

    expect(response.data.name).toBe("Teste")
  })

  test('deve ser possível remover um paciente', async () => {
    await remove(defaultResource.id)

    const removedResource = await model.findUnique({
      where: {
        id: defaultResource.id
      }
    })

    expect(removedResource).toBeNull()
  })
})