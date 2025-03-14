import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { FetchPetsByIdUseCase } from '@/use-cases/fetch-pets-by-id'
import { beforeEach, describe, expect, it } from 'vitest'

let petsRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: FetchPetsByIdUseCase

describe('Fetch Pet By ID Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    petsRepository = new InMemoryPetsRepository(organizationRepository)
    sut = new FetchPetsByIdUseCase(petsRepository)
  })

  it('should be able to fetch a pet by ID', async () => {
    const organization = await organizationRepository.create({
      adress: 'Rua Teste',
      cep: '12345-678',
      email: 'teste@example.com',
      password_hash: 'teste123',
      phone_number: '(11) 99999-9999',
      responsible_name: 'Teste Doe',
    })

    const createdPet = await petsRepository.create({
      name: 'dog name',
      about: 'about this dog',
      age: 'puppy',
      size: 'small',
      energy_level: 'high',
      dependence_level: 'medium',
      environment: 'indoor',
      requirements: 'some care',
      organization_id: organization.id,
    })

    const { pet } = await sut.execute({ id: createdPet.id })
    expect(pet).toEqual(expect.objectContaining({ name: 'dog name' }))
  })

  it('should throw an error if pet does not exist', async () => {
    await expect(() =>
      sut.execute({ id: 'non-existing-id' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
