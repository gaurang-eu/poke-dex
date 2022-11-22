import { FAVOURITE_POKEMONS_KEY } from '../util/constants'

export const addToFavourite = (favId: string) => {
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
}

export const removeFromFavourite = (favId: string) => {
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
}

export const isPokemonFavourite = (favId: string): boolean => {
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
}

export const getFavourites = () => {
  let favourites = []
  try {
    const tempFavs = localStorage.getItem(FAVOURITE_POKEMONS_KEY)
    favourites = tempFavs ? JSON.parse(tempFavs) : []
  } catch (error) {
    console.log(error)
  }
  return favourites
}
