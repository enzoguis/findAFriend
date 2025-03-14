import { OrganizationDTO } from '@/dtos/organization'
import { OrganizationRepository } from '@/repositories/organization-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticeUseCaseRequest {
  email: string
  password: string
}

interface AuthenticeUseCaseResponse {
  organization: OrganizationDTO
}

export class AuthenticateUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    email,
    password,
  }: AuthenticeUseCaseRequest): Promise<AuthenticeUseCaseResponse> {
    const organization = await this.organizationRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(
      password,
      organization.password_hash
    )

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      organization,
    }
  }
}
