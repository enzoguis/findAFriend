import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'
import { RegisterPetUseCase } from './register-pet'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'

let petsRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: RegisterPetUseCase

describe('Register Pets Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    petsRepository = new InMemoryPetsRepository(organizationRepository)
    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should be able to register a new pet', async () => {
    const organization = await organizationRepository.create({
      adress: 'Rua Teste',
      cep: '12345-678',
      email: 'teste@example.com',
      password_hash: 'teste123',
      phone_number: '(11) 99999-9999',
      responsible_name: 'Teste Doe',
    })

    const { pet } = await sut.execute({
      name: 'dog name 2',
      about: 'about kk',
      age: 'Puppy',
      size: 'Small',
      energy_level: 'High',
      dependence_level: 'High',
      environment: 'Indoor',
      requirements: 'nothing',
      organization_id: organization.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toBe('dog name 2')
  })
})
