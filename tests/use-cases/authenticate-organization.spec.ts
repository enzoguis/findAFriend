import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from '@/use-cases/authenticate-organization'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

let organizationRepository: InMemoryOrganizationRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new AuthenticateUseCase(organizationRepository)
  })

  it('should authenticate with valid credentials', async () => {
    const password_hash = await hash('valid-password', 6)

    const createdOrganization = await organizationRepository.create({
      adress: 'Rua Teste',
      cep: '12345-678',
      email: 'test@example.com',
      password_hash,
      phone_number: '(11) 99999-9999',
      responsible_name: 'Test User',
    })

    const { organization } = await sut.execute({
      email: 'test@example.com',
      password: 'valid-password',
    })

    expect(organization).toEqual(
      expect.objectContaining({ id: createdOrganization.id })
    )
  })

  it('should throw an error if email does not exist', async () => {
    const password_hash = await hash('some-password', 6)

    await organizationRepository.create({
      adress: 'Rua Existente',
      cep: '12345-678',
      email: 'existent@example.com',
      password_hash,
      phone_number: '(11) 99999-9999',
      responsible_name: 'Existing User',
    })

    await expect(() =>
      sut.execute({ email: 'nonexistent@example.com', password: 'password' })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should throw an error if password is incorrect', async () => {
    const password_hash = await hash('correct-password', 6)

    await organizationRepository.create({
      adress: 'Rua Teste',
      cep: '12345-678',
      email: 'test@example.com',
      password_hash,
      phone_number: '(11) 99999-9999',
      responsible_name: 'Test User',
    })

    await expect(() =>
      sut.execute({ email: 'test@example.com', password: 'wrong-password' })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
