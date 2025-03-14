import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from '@/use-cases/register-pet'
import { beforeEach, describe, expect, it } from 'vitest'

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
      age: 'puppy',
      size: 'small',
      energy_level: 'high',
      dependence_level: 'high',
      environment: 'indoor',
      requirements: 'nothing',
      organization_id: organization.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toBe('dog name 2')
  })
})
