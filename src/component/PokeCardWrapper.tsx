/* eslint-disable react/display-name */
import React from 'react'
import Col from 'react-bootstrap/Col'

// import useManageFatourite from '../custom-hooks/useManageFavourite'
import { PokemonCardType } from '../types/PokemonCardType'
import PokeCard from './PokeCard'

const PokemonCardWrapper = React.forwardRef(({ id, name, frontDefault, types }: PokemonCardType, ref) => {
  // const [addToFavourite, removeFromFavourite, isPokemonFavourite] = useManageFatourite()

  let cardContent = <Col key={id} className='mb-3' xxs={10} xs={10} md={6} lg={4} xl={3} xxl={3}>
    <PokeCard id={id} name={name} frontDefault={frontDefault} types={types} backDefault={''} forScreen='pokedex'/>
  </Col>

  if (ref) {
    cardContent = <Col ref={ref} key={id} className='mb-3' xxs={12} xs={12} md={6} lg={4} xl={3} xxl={3}>
      <PokeCard id={id} name={name} frontDefault={frontDefault} types={types} backDefault={''} forScreen='pokedex'/>
    </Col>
  }

  return cardContent
})

export default PokemonCardWrapper
