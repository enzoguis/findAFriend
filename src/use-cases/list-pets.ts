import { PetDTO } from '@/dtos/pet'
import { PetCharacteristicsDTO } from '@/dtos/pet-characteristics'
import { PetsRepository } from '@/repositories/pets-repository'

interface ListPetsUseCaseResponse {
  pets: PetDTO[]
}

export class ListPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}
  async execute({
    cep,
    age,
    dependence_level,
    energy_level,
    environment,
    size,
  }: PetCharacteristicsDTO): Promise<ListPetsUseCaseResponse> {
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
