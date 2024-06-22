import { create, find, remove, update } from "@/actions/documents";
import { ROLES } from "@/enums/roles";
import { prisma } from "@/lib/prisma"
import { Document as Model } from "@prisma/client"
import { randomUUID } from "crypto";
import { readFileSync } from "fs";
import { Session } from "next-auth";
import path from "path";

const model = prisma.document

vi.mock("next-auth", () => ({
  getServerSession: () => {
    const session: Session = {
      expires: "",
      user: { role: ROLES.EDITOR }
    }
    return session
  }
}))

vi.mock("@vercel/blob", () => ({
  put: () => ({
    url: randomUUID()
  }),
  del: () => { }
}))

describe('Integration: Users', () => {
  let defaultResource: Model

  beforeEach(async () => {
    defaultResource = await model.create({
      data: {
        type: 'text/plain',
        url: "https://wsykp5qhkcx3c1sb.public.blob.vercel-storage.com/files/teste-vfKHpKDQN3QICTMSN1Yh9T5PAFBcNN.txt"
      }
    })
  })

  test('deve ser possível criar um documento', async () => {
    const formData = new FormData()
    const pathFile = path.resolve(__dirname, '..', '..', 'testdata', 'to-upload.txt')
    const blobFile = new Blob([readFileSync(pathFile)], { type: "text/plain" })
    formData.append('file', blobFile, "teste.txt")

    const response = await create(formData)

    if ("error" in response) throw Error(response.error)

    expect(response.data.id).toBeTruthy()
  })

  test('deve ser possível listar documentos', async () => {
    const response = await find()

    if ("error" in response) throw Error(response.error)

    expect(response.data.length).greaterThan(0)
  })

  test('deve ser possível atualizar um documento', async () => {
    const formData = new FormData()
    const pathFile = path.resolve(__dirname, '..', '..', 'testdata', 'to-upload.txt')
    const blobFile = new Blob([readFileSync(pathFile)], { type: "text/plain" })
    formData.append('file', blobFile, "teste.txt")
    formData.set('id', defaultResource.id.toString())

    const response = await update(formData)

    if ("error" in response) throw Error(response.error)

    expect(response.data.url).not.toBe(defaultResource.url)
  })

  test('deve ser possível remover um documento', async () => {
    await remove(defaultResource.id)

    const removedResource = await model.findUnique({
      where: {
        id: defaultResource.id
      }
    })

    expect(removedResource).toBeNull()
  })
})