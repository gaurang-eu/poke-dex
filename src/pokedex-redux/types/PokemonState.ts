import { PokemonData } from '../../types/PokemonData'

export interface PokemonState {
    allPokemons: Array<PokemonData>,
    allPokemonsLoaded: boolean,
    pokemonListLenght: number,
    queryPokemons: Array<PokemonData>
}