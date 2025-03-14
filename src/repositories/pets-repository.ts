import { PetDTO } from '@/dtos/pet'
import { PetCharacteristicsDTO } from '@/dtos/pet-characteristics'
import { RegisterPetDTO } from '@/dtos/register-pet'
export interface PetsRepository {
  create(data: RegisterPetDTO): Promise<PetDTO>
  findBycharacteristics(params: PetCharacteristicsDTO): Promise<PetDTO[]>
  findById(id: string): Promise<PetDTO | null>
}
