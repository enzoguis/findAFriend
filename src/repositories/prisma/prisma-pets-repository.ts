import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'
import { RegisterPetDTO } from '@/dtos/register-pet'

export class PrismaPetsRepository implements PetsRepository {
  async findManyByCep(cep: string) {
    const pets = await prisma.pet.findMany({
      where: {
        organization: {
          cep: {
            equals: cep,
          },
        },
      },
    })

    return pets
  }
  async create(data: RegisterPetDTO) {
    const prismaData: Prisma.PetCreateInput = {
      name: data.name,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      dependence_level: data.dependence_level,
      environment: data.environment,
      requirements: data.requirements,
      organization: {
        connect: { id: data.organization_id },
      },
    }

    const pet = await prisma.pet.create({ data: prismaData })

    return pet
  }
}
