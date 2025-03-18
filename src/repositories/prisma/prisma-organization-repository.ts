import { CreateOrganizationDTO } from '@/dtos/create-organization'
import { prisma } from '@/lib/prisma'
import { OrganizationRepository } from '@/repositories/organization-repository'

export class PrismaOrganizationRepository implements OrganizationRepository {
  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: { id },
    })

    return organization
  }
  async findByPhoneNumber(phoneNumber: string) {
    const organizations = await prisma.organization.findUnique({
      where: { phone_number: phoneNumber },
    })

    return organizations
  }
  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: { email },
    })

    return organization
  }
  async create(data: CreateOrganizationDTO) {
    const organization = await prisma.organization.create({ data })

    return organization
  }
}
