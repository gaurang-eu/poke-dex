import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PokemonData } from '../types/PokemonData'
import { PokemonState } from './types/PokemonState'
import { PokemonStateListQuery } from './types/PokemonStateListQuery'

const initialPokemonResult: Array<PokemonData> = [
    {
        "id": "0",
        "name": "Dummy Name",
        "types": [ {
            "id": "0",
            "name": "Dummy Type"
        }],
        "sprites": {
            "front_default": "front_default",
            "back_default": "back_default"
        }
    }
]

const initialState: PokemonState = {
    allPokemons: initialPokemonResult,
    allPokemonsLoaded: false,
    pokemonListLenght: 0,
    queryPokemons: initialPokemonResult
}

export const pokemonSlice = createSlice({
    name: 'PokemonStore',
    initialState,
    reducers: {
        putPokemonList: (state, action: PayloadAction<Array<PokemonData>>) => {
            state.allPokemons = action.payload
            state.pokemonListLenght = action.payload.length;
            state.allPokemonsLoaded = true;
        },
        queryPokemonStateList: (state, action: PayloadAction<PokemonStateListQuery>) => {
            console.log('action.payload ',action.payload )
            if(state.queryPokemons && state.queryPokemons.length === 1) {
                state.queryPokemons = [...state.allPokemons.slice(action.payload.offset, action.payload.offset + action.payload.limit)]
            } else {
                state.queryPokemons = [...state.queryPokemons, ...state.allPokemons.slice(action.payload.offset, action.payload.offset + action.payload.limit)]
            }
        }
    },
})

export const { putPokemonList, queryPokemonStateList } = pokemonSlice.actions

export default pokemonSlice.reducer