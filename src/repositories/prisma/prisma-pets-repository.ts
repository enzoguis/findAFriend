import { RegisterPetDTO } from '@/dtos/register-pet'
import { prisma } from '@/lib/prisma'
import { PetsRepository } from '../pets-repository'
import { PetCharacteristicsDTO } from '@/dtos/pet-characteristics'

export class PrismaPetsRepository implements PetsRepository {
  async findBycharacteristics(params: PetCharacteristicsDTO) {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        energy_level: params.energy_level,
        dependence_level: params.dependence_level,
        environment: params.environment,
        organization: {
          cep: {
            equals: params.cep,
          },
        },
      },
    })

    return pets
  }
  async create(data: RegisterPetDTO) {
    const pet = await prisma.pet.create({ data })

    return pet
  }
}
