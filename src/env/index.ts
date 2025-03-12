import z from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3000),
})

const _env = envSchema.safeParse(process.env.NODE_ENV)

if (_env.success === false) {
  throw new Error('Invalid environments.')
}

export const env = _env.data
