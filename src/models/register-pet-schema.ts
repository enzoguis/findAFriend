import { z } from 'zod'

export const registerPetSchema = z.object({
  name: z.string(),
  about: z.string().max(300),
  age: z.enum(['puppy', 'adult', 'elderly']),
  size: z.enum(['small', 'medium', 'large']),
  energy_level: z.enum(['low', 'medium', 'high']),
  dependence_level: z.enum(['low', 'medium', 'high']),
  environment: z.enum(['indoor', 'outdoor']),
  requirements: z.string(),
})
