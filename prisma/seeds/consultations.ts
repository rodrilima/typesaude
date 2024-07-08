import { prisma } from "../../src/lib/prisma";
import { faker } from "@faker-js/faker"

export async function generateConsultations(
  doctorsIds: number[],
  patientsIds: number[],
  servicesIds: number[],
  quantity = 1
) {
  const data = await prisma.consultation.createManyAndReturn({
    data: Array.from({ length: quantity }, () => ({
      doctorId: faker.helpers.arrayElement(doctorsIds),
      patientId: faker.helpers.arrayElement(patientsIds),
      serviceId: faker.helpers.arrayElement(servicesIds),
      initialDateTime: faker.date.past()
    }))
  })

  return data;
}