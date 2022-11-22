import { PokemonType } from './PokemonType'

export interface PokemonCardType {
  id: string
  name: string
  frontDefault: string
  backDefault: string
  types: PokemonType[]
  forScreen?: string
}
