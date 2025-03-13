import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrganizationUseCase } from './create-organization'
import { compare } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

let organizationRepository: InMemoryOrganizationRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new CreateOrganizationUseCase(organizationRepository)
  })

  it('should be able to create a new organization', async () => {
    const { organization } = await sut.execute({
      adress: 'Rua Teste',
      cep: '12345-678',
      email: 'teste@example.com',
      password: 'teste123',
      phone_number: '(11) 99999-9999',
      responsible_name: 'Teste Doe',
    })

    expect(organization.id).toEqual(expect.any(String))
    expect(organization.adress).toBe('Rua Teste')
  })

  it('should hash user password upon registrations', async () => {
    const { organization } = await sut.execute({
      adress: 'Rua Teste',
      cep: '12345-678',
      email: 'teste@example.com',
      password: 'teste123',
      phone_number: '(11) 99999-9999',
      responsible_name: 'Teste Doe',
    })

    const isPasswordCorrectlyHashed = await compare(
      'teste123',
      organization.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to create a new organization with same email twice', async () => {
    const email = 'teste@example.com'

    await sut.execute({
      adress: 'Rua Teste',
      cep: '12345-678',
      email,
      password: 'teste123',
      phone_number: '(11) 99999-9999',
      responsible_name: 'Teste Doe',
    })

    await expect(() =>
      sut.execute({
        adress: 'Rua Teste',
        cep: '12345-678',
        email,
        password: 'teste123',
        phone_number: '(11) 99999-9999',
        responsible_name: 'Teste Doe',
      })
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})

//
