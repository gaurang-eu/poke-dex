import React, { useEffect } from 'react'
import Col from 'react-bootstrap/Col'
// import Card from 'react-bootstrap/esm/Card'
import Row from 'react-bootstrap/Row'
import PokeCard from './component/PokeCard'

import { getFavourites } from './util/ManageFavourites'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './pokedex-redux/store'
import { getFavouriteList } from './pokedex-redux/PokemonReducer'
import { PokemonData } from './types/PokemonData'

function Favourite () {
  const allPokemonsLoaded = useSelector((state: RootState) => state.pokemons.allPokemonsLoaded)
  const favouritePokemons = useSelector((state: RootState) => state.pokemons.favouritePokemons)
  const dispatch = useDispatch()

  useEffect(() => {
    const favouriteIds: string[] = getFavourites()
    dispatch(getFavouriteList(favouriteIds))
  }, [allPokemonsLoaded])

  return (
        <Row>
          {
            favouritePokemons.map((pokemon: PokemonData, i: number) =>
            <Col key={pokemon.id} className='mb-3' xxs={10} xs={10} md={6} lg={4} xl={3} xxl={3}>
              <PokeCard id={pokemon.id} name={pokemon.name} frontDefault={pokemon.sprites.front_default} types={pokemon.types} backDefault={''} forScreen='favourite'/>
            </Col>
            )
          }
        </Row>)
}

export default Favourite
