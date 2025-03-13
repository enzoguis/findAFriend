import { PetDTO } from '@/dtos/pet'
import { RegisterPetDTO } from '@/dtos/register-pet'
import { PetsRepository } from '@/repositories/pets-repository'

interface RegisterPetUseCaseResponse {
  pet: PetDTO
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}
  async execute({
    about,
    age,
    dependence_level,
    energy_level,
    environment,
    name,
    requirements,
    size,
    organization_id,
  }: RegisterPetDTO): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level,
      dependence_level,
      environment,
      requirements,
      organization_id: organization_id,
    })

    return { pet }
  }
}
