import { Prisma, Organization } from '@prisma/client'
import { OrganizationRepository } from '../organization-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationRepository implements OrganizationRepository {
  public items: Organization[] = []
  async create(data: Prisma.OrganizationCreateInput) {
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
