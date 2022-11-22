import React from 'react'
import { Badge } from 'react-bootstrap'

import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/esm/Form'
import { PokemonCardType } from '../types/PokemonCardType'
import { addToFavourite, removeFromFavourite, isPokemonFavourite } from '../util/ManageFavourites'

const PokeCard = ({ id, name, frontDefault, types, forScreen }: PokemonCardType) => {
  const handleFavouriteToggle = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    console.log('Favourite toggle')
    if (e.target.checked) {
      addToFavourite(id)
      console.log('Favourite Checked')
    } else {
      console.log('Favourite Uncecked')
      removeFromFavourite(id)
    }
  }

  return (
    <Card>
    <Card.Img variant="top" src={frontDefault} />
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      { (forScreen !== 'favourite')
        ? (<Card.ImgOverlay>
        <Form.Check onChange={e => handleFavouriteToggle(e, id)} inline label="My Favourite"
        defaultChecked={ (isPokemonFavourite(id), false)} defaultValue={ (isPokemonFavourite(id), false) ? 'checked' : ''}
        /></Card.ImgOverlay>)
        : null
      }
      {
          types.map(type => <Badge key={type.id} className='me-2'>{type.name}</Badge>)
      }
    </Card.Body>
  </Card>
  )
}

export default PokeCard
