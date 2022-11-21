/* eslint-disable react/display-name */
import React from 'react'
import { Badge } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import useManageFatourite from '../custom-hooks/useManageFavourite'

interface Type {
  id: string
  name: string
}
interface PokemonCardType {
  id: string
  name: string
  frontDefault: string
  backDefault: string
  types: Type[]
}
const PokemonCard = React.forwardRef(({ id, name, frontDefault, types }: PokemonCardType, ref) => {
  const [addToFavourite, removeFromFavourite, isPokemonFavourite] = useManageFatourite()

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

  let cardContent = <Col key={id} className='mb-3' xxs={10} xs={10} md={6} lg={4} xl={3} xxl={3}>
  <Card>
    <Card.Img variant="top" src={frontDefault} />
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.ImgOverlay>
        <Form.Check onChange={e => handleFavouriteToggle(e, id)} inline label="My Favourite"
        defaultChecked={ (isPokemonFavourite(id), false)} defaultValue={ (isPokemonFavourite(id), false) ? 'checked' : ''}
        /></Card.ImgOverlay>
      {
          types.map(type => <Badge key={type.id} className='me-2'>{type.name}</Badge>)
      }
    </Card.Body>
  </Card>
  </Col>

  if (ref) {
    cardContent = <Col ref={ref} key={id} className='mb-3' xxs={12} xs={12} md={6} lg={4} xl={3} xxl={3}>
    <Card>
      <Card.Img variant="top" className="img-thumbnail" src={frontDefault} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        {
            types.map(type => <Badge key={type.id} className='me-2'>{type.name}</Badge>)
        }
      </Card.Body>
    </Card>
    </Col>
  }

  return cardContent
})

export default PokemonCard
