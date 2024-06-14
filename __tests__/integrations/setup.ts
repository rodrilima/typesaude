import { prisma } from "@/lib/prisma";

console.info(`Env: ${process.env.NODE_ENV}`)

async function truncatedAllTables() {
  const tables = await prisma.$queryRaw<{ tablename: string }[]>`
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename != '_prisma_migrations'
  `
  const tuncatePromises = tables.map(
    table => prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table.tablename}" CASCADE;`)
  )
  await Promise.all(tuncatePromises)
  console.info("All tables truncated")
}

beforeEach(async () => {
  await truncatedAllTables()
})

afterAll(async () => {
  await prisma.$disconnect()
})