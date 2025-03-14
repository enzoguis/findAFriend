import { PetDTO } from '@/dtos/pet'
import { PetsRepository } from '@/repositories/pets-repository'

interface FetchPetsByCepUseCaseRequest {
  cep: string
}

interface FetchPetsByCepUseCaseResponse {
  pets: PetDTO[]
}

export class FetchPetsByCepUseCase {
  constructor(private petsRepository: PetsRepository) {}
  async execute({
    cep,
  }: FetchPetsByCepUseCaseRequest): Promise<FetchPetsByCepUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCep(cep)

    return { pets }
  }
}
