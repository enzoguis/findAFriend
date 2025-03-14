import { PetDTO } from '@/dtos/pet'
import { PetCharacteristicsDTO } from '@/dtos/pet-characteristics'
import { PetsRepository } from '@/repositories/pets-repository'

interface FetchPetsByFilterUseCaseResponse {
  pets: PetDTO[]
}

export class FetchPetsByFilterUseCase {
  constructor(private petsRepository: PetsRepository) {}
  async execute({
    cep,
    age,
    dependence_level,
    energy_level,
    environment,
    size,
  }: PetCharacteristicsDTO): Promise<FetchPetsByFilterUseCaseResponse> {
    const pets = await this.petsRepository.findBycharacteristics({
      cep,
      age,
      dependence_level,
      energy_level,
      environment,
      size,
    })

    return { pets }
  }
}
