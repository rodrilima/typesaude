import { prisma } from "../../src/lib/prisma";
import { faker } from "@faker-js/faker"

export async function generateUsers(quantity = 1) {
  const data = await prisma.user.createMany({
    data: Array.from({ length: quantity }, () => ({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
    }))
  })

  return data;
}