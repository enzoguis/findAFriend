import { z } from 'zod'

export const fetchPetByIdParamsSchema = z.object({
  id: z.string().uuid(),
})
