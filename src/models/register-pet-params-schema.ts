import { z } from 'zod'

export const registerPetParamsSchema = z.object({
  organizationId: z.string(),
})
