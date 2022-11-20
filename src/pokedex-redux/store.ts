import { configureStore } from '@reduxjs/toolkit'
import PokemonReducer from './PokemonReducer'

export const store = configureStore({
  reducer: {
    pokemons: PokemonReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
