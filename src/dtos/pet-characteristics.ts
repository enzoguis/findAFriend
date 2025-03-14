export interface PetCharacteristicsDTO {
  cep: string
  age?: 'puppy' | 'adult' | 'elderly'
  size?: 'small' | 'medium' | 'large'
  energy_level?: 'low' | 'medium' | 'high'
  dependence_level?: 'low' | 'medium' | 'high'
  environment?: 'indoor' | 'outdoor'
}
