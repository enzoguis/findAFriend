import { Prisma, Organization } from '@prisma/client'
import { OrganizationRepository } from '../organization-repository'
import { randomUUID } from 'node:crypto'
import { OrganizationDTO } from '@/dtos/organization'
import { CreateOrganizationDTO } from '@/dtos/create-organization'

export class InMemoryOrganizationRepository implements OrganizationRepository {
  async findById(id: string) {
    const organization = this.items.find((item) => item.id === id)
    if (!organization) return null

    return organization
  }
  async findByPhoneNumber(phoneNumber: string) {
    const organization = this.items.find(
      (item) => item.phone_number === phoneNumber
    )

    if (!organization) return null

    return organization
  }
  public items: Organization[] = []
  async create(data: CreateOrganizationDTO) {
    const organization = {
      id: randomUUID(),
      responsible_name: data.responsible_name,
      email: data.email,
      phone_number: data.phone_number,
      adress: data.adress,
      cep: data.cep,
      password_hash: data.password_hash,
    }

    this.items.push(organization)

    return organization
  }
  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) return null

    return organization
  }
}
