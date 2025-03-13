import { Organization } from '@prisma/client'
import { OrganizationRepository } from '@/repositories/organization-repository'
import { hash } from 'bcryptjs'

interface CreateOrganizationUseCaseRequest {
  responsible_name: string
  email: string
  phone_number: string
  adress: string
  cep: string
  password: string
}

interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    adress,
    cep,
    email,
    password,
    phone_number,
    responsible_name,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const organization = await this.organizationRepository.create({
      adress,
      cep,
      email,
      password_hash,
      phone_number,
      responsible_name,
    })

    return {
      organization,
    }
  }
}
