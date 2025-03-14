import { Prisma, Organization } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { OrganizationRepository } from '@/repositories/organization-repository'
import { OrganizationDTO } from '@/dtos/organization'

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
  async create(data: OrganizationDTO) {
    const organization = await prisma.organization.create({ data })

    return organization
  }
}
