import { prisma } from "../../src/lib/prisma";
import { faker } from "@faker-js/faker"

export async function generatePatients(quantity = 1) {
  const data = await prisma.patient.createManyAndReturn({
    data: Array.from({ length: quantity }, () => ({
      name: faker.person.fullName(),
    }))
  })

  return data;
}