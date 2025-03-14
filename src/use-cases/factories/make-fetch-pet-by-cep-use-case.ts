import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByCepUseCase } from '../fetch-pets-by-cep'

export function makeFetchPetByCepUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchPetsByCepUseCase(petsRepository)

  return useCase
}
