import { PetDTO } from '@/dtos/pet'
import { RegisterPetDTO } from '@/dtos/register-pet'
import { Pet, Prisma } from '@prisma/client'
export interface PetsRepository {
  create(data: RegisterPetDTO): Promise<PetDTO>
  findManyByCep(cep: string): Promise<PetDTO[]>
}
