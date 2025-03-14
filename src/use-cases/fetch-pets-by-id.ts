import { PetDTO } from '@/dtos/pet'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchPetsByIdUseCaseRequest {
  id: string
}

interface FetchPetsByIdUseCaseResponse {
  pet: PetDTO
}

export class FetchPetsByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}
  async execute({
    id,
  }: FetchPetsByIdUseCaseRequest): Promise<FetchPetsByIdUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) throw new ResourceNotFoundError()

    return { pet }
  }
}
