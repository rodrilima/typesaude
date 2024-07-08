import { ROLES } from "../../src/enums/roles";
import { prisma } from "../../src/lib/prisma";
import bcrypt from "bcrypt"

export async function generateAdmin() {
  const data = await prisma.user.create({
    data: {
      email: "contato@type.dev.br",
      password: bcrypt.hashSync("typedev", 10),
      name: "Rodrigo Lima",
      role: ROLES.ADMIN
    }
  })

  await prisma.document.create({
    data: {
      type: "image/png",
      url: "https://gravatar.com/avatar/7862faf94714838600dd02e86df0af6daadbf57ce104a52c2b455aab0ad3cb2f",
      userId: data.id
    }
  })

  return data;
}