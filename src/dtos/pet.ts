export interface PetDTO {
  id?: string
  name: string
  about?: string | null
  age: 'Puppy' | 'Adult' | 'Elderly'
  size: 'Small' | 'Medium' | 'Large'
  energy_level: 'Low' | 'Medium' | 'High'
  dependence_level: 'Low' | 'Medium' | 'High'
  environment: 'Indoor' | 'Outdoor'
  requirements: string
  organization_id: string
}
