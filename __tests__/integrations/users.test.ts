import { prisma } from "@/lib/prisma"

test('Testa criação de usuário', async () => {
  const response = await prisma.user.create({
    data: {
      email: "contato@type.dev.br",
      password: "123456"
    }
  })

  expect(response).toHaveProperty("id")
})

test('Testa criação de usuário 2', async () => {
  const response = await prisma.user.create({
    data: {
      email: "contato@type.dev.br",
      password: "123456"
    }
  })

  expect(response).toHaveProperty("id")
})