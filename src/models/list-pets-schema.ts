import { z } from 'zod'

export const listPetsParamsSchema = z.object({
  cep: z.string(),
  size: z.enum(['small', 'medium', 'large']).optional(),
  energy_level: z.enum(['low', 'medium', 'high']).optional(),
  dependence_level: z.enum(['low', 'medium', 'high']).optional(),
  environment: z.enum(['indoor', 'outdoor']).optional(),
  age: z.enum(['puppy', 'adult', 'elderly']).optional(),
})
