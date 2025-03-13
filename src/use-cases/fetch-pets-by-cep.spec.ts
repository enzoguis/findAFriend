import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsByCepUseCase } from './fetch-pets-by-cep'

let petsRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: FetchPetsByCepUseCase

describe('Fetch Pets Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    petsRepository = new InMemoryPetsRepository(organizationRepository)
    sut = new FetchPetsByCepUseCase(petsRepository)
  })

  it('should be able to fetch pets by cep', async () => {
    const cep = '12345-678'

    const organization = await organizationRepository.create({
      adress: 'Rua Teste',
      cep,
      email: 'teste@example.com',
      password_hash: 'teste123',
      phone_number: '(11) 99999-9999',
      responsible_name: 'Teste Doe',
    })

    const organizationWithOtherCep = await organizationRepository.create({
      adress: 'Rua Teste',
      cep: '85660-000',
      email: 'teste@example.com',
      password_hash: 'teste123',
      phone_number: '(11) 99999-9999',
      responsible_name: 'Teste Doe',
    })

    await petsRepository.create({
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

    await petsRepository.create({
      name: 'dog name',
      about: 'about kk',
      age: 'Puppy',
      size: 'Small',
      energy_level: 'High',
      dependence_level: 'High',
      environment: 'Indoor',
      requirements: 'nothing',
      organization_id: organizationWithOtherCep.id,
    })

    const { pets } = await sut.execute({ cep })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'dog name 2' })])
  })
})
