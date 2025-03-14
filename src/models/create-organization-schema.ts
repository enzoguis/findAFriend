import { z } from 'zod'

export const createOrganizationSchema = z.object({
  responsible_name: z.string(),
  email: z.string().email(),
  cep: z.string(),
  adress: z.string(),
  phone_number: z
    .string()
    .min(6, { message: 'The phone number must be at least 6 digits' }),
  password: z.string().min(6),
})
