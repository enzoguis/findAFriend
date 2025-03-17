import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetsByIdUseCase } from '../get-pets-by-id'

export function makeGetPetsByIdUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new GetPetsByIdUseCase(petsRepository)

  return useCase
}
