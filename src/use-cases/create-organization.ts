import { OrganizationDTO } from '@/dtos/organization'
import { OrganizationRepository } from '@/repositories/organization-repository'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsWithSameEmailError } from './errors/organization-already-exists-with-same-email-error'
import { OrganizationAlreadyExistsWithSamePhoneError } from './errors/organization-already-exists-with-same-phone-error'

interface CreateOrganizationUseCaseRequest {
  responsible_name: string
  email: string
  phone_number: string
  adress: string
  cep: string
  password: string
}

interface CreateOrganizationUseCaseResponse {
  organization: OrganizationDTO
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

    const organizationWithSameEmail =
      await this.organizationRepository.findByEmail(email)

    const organizationWithSamePhoneNumber =
      await this.organizationRepository.findByPhoneNumber(phone_number)

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsWithSameEmailError()
    }

    if (organizationWithSamePhoneNumber) {
      throw new OrganizationAlreadyExistsWithSamePhoneError()
    }
    const organization = await this.organizationRepository.create({
      adress,
      cep,
      email,
      password_hash,
      phone_number,
      responsible_name,
    })

    return { organization }
  }
}
