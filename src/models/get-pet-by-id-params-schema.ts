import { z } from 'zod'

export const getPetByIdParamsSchema = z.object({
  id: z.string().uuid(),
})
