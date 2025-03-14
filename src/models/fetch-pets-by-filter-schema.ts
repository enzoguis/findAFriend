import { z } from 'zod'

export const fetchByCepParamsSchema = z.object({
  cep: z.string(),
})
