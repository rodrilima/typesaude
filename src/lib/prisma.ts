import { PrismaClient } from "@prisma/client"
import { registerService } from "./register-service"

export const prisma = registerService("prisma", () => new PrismaClient())