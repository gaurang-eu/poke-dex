import { PokemonData } from '../../types/PokemonData'

export interface PokemonState {
  allPokemons: PokemonData[]
  allPokemonsLoaded: boolean
  pokemonListLenght: number
  queryPokemons: PokemonData[]
  favouritePokemons: PokemonData[]
  searchWord: string
  filterType: string
  sortByField: string
  sortOrder: string
}
