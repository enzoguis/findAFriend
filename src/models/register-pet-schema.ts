import { z } from 'zod'

export const registerPetSchema = z.object({
  name: z.string(),
  about: z.string().max(300),
  age: z.enum(['Puppy', 'Adult', 'Elderly']),
  size: z.enum(['Small', 'Medium', 'Large']),
  energy_level: z.enum(['Low', 'Medium', 'High']),
  dependence_level: z.enum(['Low', 'Medium', 'High']),
  environment: z.enum(['Indoor', 'Outdoor']),
  requirements: z.string(),
})
