import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest/environments'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDataBaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('No DATABASE_URL environment variable found')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'web',
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDataBaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        )

        await prisma.$disconnect()
      },
    }
  },
}
