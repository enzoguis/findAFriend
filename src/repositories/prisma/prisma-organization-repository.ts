import { Prisma, Organization } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { OrganizationRepository } from '@/repositories/organization-repository'

export class PrismaOrganizationRepository implements OrganizationRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({ data })

    return organization
  }
}
