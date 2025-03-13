import { Prisma, Pet, Size } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { OrganizationRepository } from '../organization-repository'
import { InMemoryOrganizationRepository } from './in-memory-organization-repository'
import { RegisterPetDTO } from '@/dtos/register-pet'
import { PetDTO } from '@/dtos/pet'

interface data {}

export class InMemoryPetsRepository implements PetsRepository {
  constructor(private organizationRepository: InMemoryOrganizationRepository) {}

  public items: PetDTO[] = []

  async create(data: RegisterPetDTO) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about ?? '',
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      dependence_level: data.dependence_level,
      environment: data.environment,
      requirements: data.requirements,
      organization_id: data.organization_id,
    }

    this.items.push(pet)

    return pet
  }
  async findManyByCep(cep: string) {
    const organization = this.organizationRepository.items.find(
      (item) => item.cep === cep
    )

    if (!organization) {
      return []
    }

    const pets = this.items.filter(
      (pet) => pet.organization_id === organization.id
    )

    return pets
  }
}
