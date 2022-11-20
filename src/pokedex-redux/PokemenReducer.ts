import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PokemonData } from '../types/PokemonData'
import { PokemonState } from './types/PokemonState'
import { PokemonStateQueryType } from './types/PokemonStateQueryType'

const initialPokemonResult: PokemonData[] = [
  {
    id: '0',
    name: 'Dummy Name',
    types: [{
      id: '0',
      name: 'Dummy Type'
    }],
    sprites: {
      front_default: 'front_default',
      back_default: 'back_default'
    }
  }
]

const initialState: PokemonState = {
  allPokemons: initialPokemonResult,
  allPokemonsLoaded: false,
  pokemonListLenght: 0,
  queryPokemons: initialPokemonResult,
  searchWord: '',
  filterType: '',
  sortByField: '',
  sortOrder: 'ascending',
  refreshList: false
}

export const pokemonSlice = createSlice({
  name: 'PokemonStore',
  initialState,
  reducers: {
    putPokemonList: (state, action: PayloadAction<PokemonData[]>) => {
      state.allPokemons = action.payload
      state.pokemonListLenght = action.payload.length
      state.allPokemonsLoaded = true
    },
    queryPokemonStateList: (state, action: PayloadAction<PokemonStateQueryType>) => {
      console.log('action.payload ', action.payload)
      if (state.queryPokemons && state.queryPokemons.length === 1) {
        state.queryPokemons = [...state.allPokemons.slice(action.payload.offset, action.payload.offset + action.payload.limit)]
      } else {
        state.queryPokemons = [...state.queryPokemons, ...state.allPokemons.slice(action.payload.offset, action.payload.offset + action.payload.limit)]
      }
    },
    searchPokemonStateList: (state, action: PayloadAction<PokemonStateQueryType>) => {
      console.log('searchPokemonStateList payload ', action.payload)
      let searchWord = ''
      if (action.payload && action.payload.searchWord && action.payload.searchWord.length > 1) {
        searchWord = action.payload.searchWord ? action.payload.searchWord : ''
        state.searchWord = searchWord
        // state.queryPokemons = initialPokemonResult
        state.queryPokemons = [...state.allPokemons.filter(pokemon => pokemon.name.includes(searchWord))]
        console.log(state.queryPokemons)
        state.refreshList = true
        // state.queryPokemons = [...state.queryPokemons, ...state.allPokemons.filter(pokemon => pokemon.name === action.payload.searchWord)]
      } else if (searchWord === '') {
        state.queryPokemons = [...state.allPokemons.slice(action.payload.offset, action.payload.offset + action.payload.limit)]
      }
    }
  }
})

export const { putPokemonList, queryPokemonStateList, searchPokemonStateList } = pokemonSlice.actions

export default pokemonSlice.reducer
