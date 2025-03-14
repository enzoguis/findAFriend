import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsByFilterUseCase } from '@/use-cases/fetch-pets-by-filter'
import { beforeEach, describe, expect, it } from 'vitest'

let petsRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: FetchPetsByFilterUseCase

describe('Fetch Pets By Filter Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    petsRepository = new InMemoryPetsRepository(organizationRepository)
    sut = new FetchPetsByFilterUseCase(petsRepository)
  })

  it('should be able to fetch pets by filter', async () => {
    const cep = '12345-678'

    const organization = await organizationRepository.create({
      adress: 'Rua Teste',
      cep,
      email: 'teste@example.com',
      password_hash: 'teste123',
      phone_number: '(11) 99999-9999',
      responsible_name: 'Teste Doe',
    })

    const otherOrganization = await organizationRepository.create({
      adress: 'Rua Teste 2',
      cep: '85660-000',
      email: 'teste2@example.com',
      password_hash: 'teste123',
      phone_number: '(11) 98888-8888',
      responsible_name: 'Outro Teste',
    })

    await petsRepository.create({
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

    await petsRepository.create({
      name: 'dog name',
      about: 'about kk',
      age: 'adult',
      size: 'medium',
      energy_level: 'medium',
      dependence_level: 'low',
      environment: 'outdoor',
      requirements: 'nothing',
      organization_id: otherOrganization.id,
    })

    const { pets } = await sut.execute({
      cep,
      age: 'puppy',
      size: 'small',
      energy_level: 'high',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'dog name 2',
        age: 'puppy',
        size: 'small',
        energy_level: 'high',
      }),
    ])
  })

  it('should return an empty array if no pets match the filters', async () => {
    const cep = '12345-678'

    const organization = await organizationRepository.create({
      adress: 'Rua Teste',
      cep,
      email: 'teste@example.com',
      password_hash: 'teste123',
      phone_number: '(11) 99999-9999',
      responsible_name: 'Teste Doe',
    })

    await petsRepository.create({
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

    const { pets } = await sut.execute({
      cep,
      age: 'adult',
      size: 'large',
    })

    expect(pets).toHaveLength(0)
  })
})
