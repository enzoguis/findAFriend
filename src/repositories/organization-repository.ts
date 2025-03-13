import { OrganizationDTO } from '@/dtos/organization'

export interface OrganizationRepository {
  create(data: OrganizationDTO): Promise<OrganizationDTO>
  findByEmail(email: string): Promise<OrganizationDTO | null>
  findByPhoneNumber(phoneNumber: string): Promise<OrganizationDTO | null>
}
