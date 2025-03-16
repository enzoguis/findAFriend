import { z } from 'zod'

export const createOrganizationSchema = z.object({
  responsible_name: z.string(),
  email: z.string().email(),
  cep: z.string(),
  adress: z.string(),
  phone_number: z
    .string()
    .min(6)
    .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/, {
      message: 'Invalid phone number format',
    }),
  password: z.string().min(6),
})
