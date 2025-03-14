import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByFilterUseCase } from '../fetch-pets-by-filter'

export function makeFetchPetsByFilterUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchPetsByFilterUseCase(petsRepository)

  return useCase
}
