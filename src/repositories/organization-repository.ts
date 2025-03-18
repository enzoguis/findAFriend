import { CreateOrganizationDTO } from '@/dtos/create-organization'
import { OrganizationDTO } from '@/dtos/organization'

export interface OrganizationRepository {
  create(data: CreateOrganizationDTO): Promise<OrganizationDTO>
  findByEmail(email: string): Promise<OrganizationDTO | null>
  findByPhoneNumber(phoneNumber: string): Promise<OrganizationDTO | null>
  findById(id: string): Promise<OrganizationDTO | null>
}
