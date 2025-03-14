import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByIdUseCase } from '../fetch-pets-by-id'

export function makeFetchPetsByIdUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchPetsByIdUseCase(petsRepository)

  return useCase
}
