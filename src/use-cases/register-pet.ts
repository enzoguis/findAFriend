import { PetsRepository } from '@/repositories/pets-repository'
import {
  Age,
  DependenceLevel,
  EnergyLevel,
  Environment,
  Pet,
  Size,
} from '@prisma/client'

interface RegisterPetUseCaseRequest {
  name: string
  about?: string
  age: Age
  size: Size
  energy_level: EnergyLevel
  dependence_level: DependenceLevel
  environment: Environment
  requirements: string
  organization_id: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
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
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level,
      dependence_level,
      environment,
      requirements,
      organization: {
        connect: {
          id: organization_id,
        },
      },
    })

    return { pet }
  }
}
