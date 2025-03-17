import { PetDTO } from '@/dtos/pet'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetsByIdUseCaseRequest {
  id: string
}

interface GetPetsByIdUseCaseResponse {
  pet: PetDTO
}

export class GetPetsByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}
  async execute({
    id,
  }: GetPetsByIdUseCaseRequest): Promise<GetPetsByIdUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) throw new ResourceNotFoundError()

    return { pet }
  }
}
