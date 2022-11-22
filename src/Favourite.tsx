import React, { useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import PokeCard from './component/PokeCard'

import { getFavourites } from './util/ManageFavourites'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './pokedex-redux/store'
import { getFavouriteList } from './pokedex-redux/PokemonReducer'
import { PokemonData } from './types/PokemonData'

import AlertMessage from './component/AlertMessage'
import { NO_FAVOURITE_MSG, NO_INTERNET_MSG } from './util/constants'

function Favourite () {
  const allPokemonsLoaded = useSelector((state: RootState) => state.pokemons.allPokemonsLoaded)
  const favouritePokemons = useSelector((state: RootState) => state.pokemons.favouritePokemons)
  const dispatch = useDispatch()

  useEffect(() => {
    const favouriteIds: string[] = getFavourites()
    dispatch(getFavouriteList(favouriteIds))
  }, [allPokemonsLoaded])

  let PlaceholderLayout = null
  if (favouritePokemons && favouritePokemons.length) {
    if (favouritePokemons.length === 1 && favouritePokemons[0].id === '0') {
      PlaceholderLayout = <AlertMessage message={NO_FAVOURITE_MSG} />
    } else {
      PlaceholderLayout = favouritePokemons.map((pokemon: PokemonData, i: number) =>
      <Col key={pokemon.id} className='mb-3' xxs={10} xs={10} md={6} lg={4} xl={3} xxl={3}>
        <PokeCard id={pokemon.id} name={pokemon.name} frontDefault={pokemon.sprites.front_default} types={pokemon.types} backDefault={''} forScreen='favourite'/>
      </Col>
      )
    }
  } else {
    PlaceholderLayout = <AlertMessage message={NO_INTERNET_MSG} />
  }

  return (
        <Row className='d-flex justify-content-center'>
          {
            PlaceholderLayout
          }
        </Row>)
}

export default Favourite
