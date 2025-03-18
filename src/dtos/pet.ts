export interface PetDTO {
  id: string
  name: string
  about?: string | null
  age: 'puppy' | 'adult' | 'elderly'
  size: 'small' | 'medium' | 'large'
  energy_level: 'low' | 'medium' | 'high'
  dependence_level: 'low' | 'medium' | 'high'
  environment: 'indoor' | 'outdoor'
  requirements: string
  organization_id: string
}
