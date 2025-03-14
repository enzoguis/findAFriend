import { Prisma, Pet, Size } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { OrganizationRepository } from '../organization-repository'
import { InMemoryOrganizationRepository } from './in-memory-organization-repository'
import { RegisterPetDTO } from '@/dtos/register-pet'
import { PetDTO } from '@/dtos/pet'
import { PetCharacteristicsDTO } from '@/dtos/pet-characteristics'

interface data {}

export class InMemoryPetsRepository implements PetsRepository {
  constructor(private organizationRepository: InMemoryOrganizationRepository) {}
  public items: PetDTO[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) return null

    return pet
  }

  async findBycharacteristics(params: PetCharacteristicsDTO) {
    const organization = this.organizationRepository.items.find(
      (item) => item.cep === params.cep
    )

    if (!organization) {
      return []
    }

    const pets = this.items.filter((pet) => {
      if (pet.organization_id !== organization.id) {
        return false
      }
      if (params.age && pet.age !== params.age) {
        return false
      }
      if (params.size && pet.size !== params.size) {
        return false
      }
      if (params.energy_level && pet.energy_level !== params.energy_level) {
        return false
      }
      if (
        params.dependence_level &&
        pet.dependence_level !== params.dependence_level
      ) {
        return false
      }
      if (params.environment && pet.environment !== params.environment) {
        return false
      }
      return true
    })

    return pets
  }

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
