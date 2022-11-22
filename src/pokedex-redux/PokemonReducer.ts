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
  favouritePokemons: initialPokemonResult,
  searchWord: '',
  filterType: '',
  sortByField: '',
  sortOrder: 'ascending',
  offset: 0
}

const getQueryCombinationNum = (searchWord: string, filterType: string, sortOrder: string): number => {
  if (searchWord === '' && filterType === '' && sortOrder === '') {
    return 1
  } else if (searchWord !== '' && filterType === '' && sortOrder === '') {
    return 2
  } if (searchWord !== '' && filterType !== '' && sortOrder === '') {
    return 3
  } else if (searchWord === '' && filterType !== '' && sortOrder === '') {
    return 4
  } else {
    return 0
  }
}

export const pokemonSlice = createSlice({
  name: 'PokemonStore',
  initialState,
  reducers: {
    setSearchWord: (state, action: PayloadAction<string>) => {
      state.searchWord = action.payload
    },
    setFilterType: (state, action: PayloadAction<string>) => {
      state.filterType = action.payload
    },
    setOffset: (state, action: PayloadAction<string>) => {
      state.offset = Number(action.payload)
    },
    putPokemonList: (state, action: PayloadAction<PokemonData[]>) => {
      state.allPokemons = action.payload
      state.pokemonListLenght = action.payload.length
      state.allPokemonsLoaded = true
    },
    getFavouriteList: (state, action: PayloadAction<string[]>) => {
      console.log('getFavouriteList payload ', action.payload)
      if (action.payload) {
        if (action.payload.length > 0) {
          const favouriteIds: string[] = action.payload
          state.favouritePokemons = [...state.allPokemons.filter(pokemon => favouriteIds.includes(pokemon.id))]
        }
      }
    },
    searchPokemonStateList: (state, action: PayloadAction<PokemonStateQueryType>) => {
      console.log('searchPokemonStateList payload ', action.payload)
      let searchWord = ''
      let filterType = ''
      let sortByField = ''

      if (action.payload) {
        if (action.payload.searchWord) {
          searchWord = action.payload.searchWord
        }
        if (action.payload.filterType && action.payload.filterType !== '0') {
          filterType = action.payload.filterType
        }
        if (action.payload.sortByField) {
          sortByField = action.payload.sortByField
        }
      }
      const queryCombinationNum: number = getQueryCombinationNum(searchWord, filterType, sortByField)

      switch (queryCombinationNum) {
        case 1:
          if (state.queryPokemons && state.queryPokemons.length === 1) {
            state.queryPokemons = [...state.allPokemons.slice(action.payload.offset, action.payload.offset + action.payload.limit)]
          } else if (state.queryPokemons && state.queryPokemons.length > 1 && action.payload.offset === 0) {
            state.queryPokemons = [...state.allPokemons.slice(action.payload.offset, action.payload.offset + action.payload.limit)]
          } else {
            state.queryPokemons = [...state.queryPokemons, ...state.allPokemons.slice(action.payload.offset, action.payload.offset + action.payload.limit)]
          }
          break
        case 2:
          if (action.payload.offset === 0) {
            state.queryPokemons = [...state.allPokemons.filter(pokemon => pokemon.name.includes(searchWord)).slice(action.payload.offset, action.payload.offset + action.payload.limit)]
          } else {
            state.queryPokemons = [...state.queryPokemons, ...state.allPokemons.filter(pokemon => pokemon.name.includes(searchWord)).slice(action.payload.offset, action.payload.offset + action.payload.limit)]
          }
          console.log('case 2')
          break
        case 3:
          if (action.payload.offset === 0) {
            state.queryPokemons = [...state.allPokemons.filter(pokemon => {
              if (pokemon.name.includes(searchWord)) {
                const index = pokemon.types.findIndex(obj => obj.id == filterType)
                if (index !== -1) {
                  return true
                }
                return false
              } else {
                return false
              }
            }).slice(action.payload.offset, action.payload.offset + action.payload.limit)]
          } else {
            if (action.payload.offset === 0) {
              state.queryPokemons = [...state.queryPokemons, ...state.allPokemons.filter(pokemon => {
                if (pokemon.name.includes(searchWord)) {
                  const index = pokemon.types.findIndex(obj => obj.id == filterType)
                  if (index !== -1) {
                    return true
                  }
                  return false
                } else {
                  return false
                }
              }).slice(action.payload.offset, action.payload.offset + action.payload.limit)]
            } else {
              state.queryPokemons = [...state.queryPokemons, ...state.queryPokemons, ...state.allPokemons.filter(pokemon => {
                if (pokemon.name.includes(searchWord)) {
                  const index = pokemon.types.findIndex(obj => obj.id == filterType)
                  if (index !== -1) {
                    return true
                  }
                  return false
                } else {
                  return false
                }
              }).slice(action.payload.offset, action.payload.offset + action.payload.limit)]
            }
          }

          console.log('case 3')
          break
        case 4:
          if (action.payload.offset === 0) {
            state.queryPokemons = [...state.allPokemons.filter(pokemon => {
              const index = pokemon.types.findIndex(obj => obj.id == filterType)
              if (index !== -1) {
                return true
              }
              return false
            }).slice(action.payload.offset, action.payload.offset + action.payload.limit)]
          } else {
            state.queryPokemons = [...state.queryPokemons, ...state.allPokemons.filter(pokemon => {
              const index = pokemon.types.findIndex(obj => obj.id == filterType)
              if (index !== -1) {
                return true
              }
              return false
            }).slice(action.payload.offset, action.payload.offset + action.payload.limit)]
          }
          console.log(' case 4')
          break
        default:
          state.queryPokemons = [...state.allPokemons.slice(action.payload.offset, action.payload.offset + action.payload.limit)]
          break
      }
    }
  }
})

export const { putPokemonList, searchPokemonStateList, getFavouriteList } = pokemonSlice.actions

export default pokemonSlice.reducer
