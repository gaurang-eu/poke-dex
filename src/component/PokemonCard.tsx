import React from 'react';
import { Badge } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

interface Type {
    id: string,
    name: string
}
interface PokemonCardType {
    id: string,
    name: string,
    front_default: string,
    back_default: string,
    types: Array<Type>;
}
const PokemonCard = React.forwardRef(({id, name, front_default, back_default, types}: PokemonCardType, ref) => {

  let cardContent = <Col key={id} className='mb-1 p-3' xxs={12} xs={12} md={6} lg={4} xl={3} xxl={3}>
  <Card>
    <Card.Img variant="top" className="img-thumbnail" src={front_default} />
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      {
          types.map( type => <Badge className='me-2'>{type.name}</Badge>)
      }
    </Card.Body>
  </Card>
  </Col>;

  if(ref) {
    cardContent = <Col ref={ref} key={id} className='mb-1 p-3' xxs={12} xs={12} md={6} lg={4} xl={3} xxl={3}>
    <Card>
      <Card.Img variant="top" className="img-thumbnail" src={front_default} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        {
            types.map( type => <Badge className='me-2'>{type.name}</Badge>)
        }
      </Card.Body>
    </Card>
    </Col>
  }

  return cardContent;
});

export default PokemonCard;