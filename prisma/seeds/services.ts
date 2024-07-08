import { prisma } from "../../src/lib/prisma";
import { faker } from "@faker-js/faker"

export async function generateServices(quantity = 1) {
  const data = await prisma.service.createManyAndReturn({
    data: Array.from({ length: quantity }, () => ({
      name: faker.word.words(),
      duration: faker.number.int({ min: 15, max: 60 })
    }))
  })

  return data;
}