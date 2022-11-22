import { useCallback, useEffect } from 'react'
import { FAVOURITE_POKEMONS_KEY } from '../util/constants'

export default function useManageFatourite () {
  const addToFavourite = useCallback((favId: string) => {
    let favourites = []
    try {
      const tempFavs = localStorage.getItem(FAVOURITE_POKEMONS_KEY)
      favourites = tempFavs ? JSON.parse(tempFavs) : []
    } catch (error) {
      console.log(error)
    }
    if (!favourites.includes(favId)) {
      // setFavouritePokemon([...favourites, favId])
      try {
        localStorage.setItem(FAVOURITE_POKEMONS_KEY, JSON.stringify([...favourites, favId]))
      } catch (error) {
        console.log(error)
      }
      console.log([...favourites, favId].length)
    }
  }, [])

  const removeFromFavourite = useCallback((favId: string) => {
    let favourites = []
    try {
      const tempFavs = localStorage.getItem(FAVOURITE_POKEMONS_KEY)
      favourites = tempFavs ? JSON.parse(tempFavs) : []
    } catch (error) {
      console.log(error)
    }
    if (favourites.includes(favId)) {
      const tempFavPokemons = [...favourites]
      tempFavPokemons.splice(tempFavPokemons.indexOf(favId, 0), 1)
      // setFavouritePokemon([...tempFavPokemons])
      try {
        localStorage.setItem(FAVOURITE_POKEMONS_KEY, JSON.stringify([...tempFavPokemons]))
      } catch (error) {
        console.log(error)
      }
      console.log('removed len ', tempFavPokemons.length)
    }
  }, [])

  const isPokemonFavourite = useCallback((favId: string): boolean => {
    let favourites = []
    try {
      const tempFavs = localStorage.getItem(FAVOURITE_POKEMONS_KEY)
      favourites = tempFavs ? JSON.parse(tempFavs) : []
    } catch (error) {
      return false
    }

    if (favourites.includes(favId)) {
      return true
    } else {
      return false
    }
  }, [])

  const getFavourites = useCallback(() => {
    let favourites = []
    try {
      const tempFavs = localStorage.getItem(FAVOURITE_POKEMONS_KEY)
      favourites = tempFavs ? JSON.parse(tempFavs) : []
    } catch (error) {
      console.log(error)
    }
    return favourites
  }, [])

  useEffect(() => {
    console.log('custom hook useManageFatourite')
  }, [addToFavourite, removeFromFavourite, isPokemonFavourite, getFavourites])

  return [addToFavourite, removeFromFavourite, isPokemonFavourite, getFavourites]
}
